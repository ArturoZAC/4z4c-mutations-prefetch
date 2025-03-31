import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productAction } from "..";

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productAction.createProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['products', {'filterKey': data.category}],
      })
    },
  });

  return mutation;
};
