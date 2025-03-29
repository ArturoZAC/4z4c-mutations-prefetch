import { useQueryClient } from "@tanstack/react-query";
import { productAction } from "..";

export const usePrefetchProduct = () => {

  const queryClient = useQueryClient();

  const prefetchProducht = ( id: number ) => {

    queryClient.prefetchQuery({
      queryKey: ['product', id],
      queryFn: () => productAction.getProductById(id)
    })
  }

  return prefetchProducht;  
};
