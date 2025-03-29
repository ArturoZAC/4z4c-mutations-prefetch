import { useQuery } from "@tanstack/react-query";
import { productAction } from "..";

interface Options {
  filterkey?: string;
}

export const useProducts = ({ filterkey }: Options) => {
  const { isLoading, isError, error, data: products = [], isFetching } = useQuery({
    queryKey: ["products", { filterkey }],
    queryFn: () => productAction.getProducts({ filterkey }),
    staleTime: 1000 * 60 * 60
  }
  );
  return {
    error,
    isError,
    isFetching,
    isLoading,
    products
  };
};
