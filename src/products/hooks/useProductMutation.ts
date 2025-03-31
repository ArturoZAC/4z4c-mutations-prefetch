import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, productAction } from "..";

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productAction.createProduct,
    onSuccess: (product) => {
      // queryClient.invalidateQueries({
      //   queryKey: ['products', {'filterKey': data.category}],
      // })

      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: product.category}],
        ( old ) => {
          if( !old ) return [product];

          return [...old, product]
        }
      )

    },
  });

  return mutation;
};
