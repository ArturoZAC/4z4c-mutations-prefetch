import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, productAction } from "..";

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productAction.createProduct,

    onMutate: (product) => {
      console.log('Mutando - Optimistic update');

      const optimisticProduct = { id: Math.random(), ...product };
      // console.log({ optimisticProduct });

      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: product.category }],
        (oldData) => {
          if (!oldData) return [optimisticProduct];

          return [...oldData, optimisticProduct]; 
        }
      )

      return {
        optimisticProduct
      }
    },
    onSuccess: (product, variables, context) => {

      console.log({product, variables, context});

      queryClient.removeQueries({
        queryKey: ['products', context.optimisticProduct.id],
      });

      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: product.category }],
        (old) => {
          if (!old) return [product];

          return old.map( cacheProduct => {
            return cacheProduct.id === context.optimisticProduct.id ? product : cacheProduct;
          })
        }
      );
    },

    onError: ( error, variables, context ) => {
      console.log({ error, variables, context });
      
      queryClient.removeQueries({
        queryKey: ['products', context?.optimisticProduct.id],
      });

      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: variables.category }],
        (old) => {
          if (!old) return [];

          return old.filter( cacheProduct => {
            return cacheProduct.id !== context?.optimisticProduct.id;
          })
        }
      )

    }

  });

  return mutation;
};
