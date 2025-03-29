import { useQuery } from "@tanstack/react-query";
import { productAction } from "..";

interface Options {
 id: number;
}

export const useProduct = ({ id }: Options) => {
  const { isLoading, isError, error, data: product, isFetching } = useQuery({
    queryKey: ["products", id ],
    queryFn: () => productAction.getProductById(id),
    staleTime: 1000 * 60 * 60
  }
  );
  return {
    error,
    isError,
    isFetching,
    isLoading,
    product
  };
};
