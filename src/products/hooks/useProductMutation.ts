import { useMutation } from "@tanstack/react-query";
import { productAction } from "..";

export const useProductMutation = () => {
  const mutation = useMutation({
    mutationFn: productAction.createProduct,
    onSuccess: () => {
      console.log('Producto Creado');
    },
    onSettled: () => {
      console.log('on Settle');
    }
  })

  return mutation;
};
