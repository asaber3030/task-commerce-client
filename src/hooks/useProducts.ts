import { getProducts, getProductsInIds } from "@/server/products";
import { useQuery } from "@tanstack/react-query";

export function useProducts(search?: string) {
  const query = useQuery({
    queryKey: ["products", search],
    queryFn: ({ queryKey }) => getProducts(queryKey[1])
  });

  return {
    products: query.data,
    isProductsLoading: query.isLoading,
    isProductsError: query.isError,
    isProductsRefetching: query.isRefetching,
    isProductsFetching: query.isFetching,
    refetchProducts: query.refetch
  };
}

export function useProductsInIds(ids: number[]) {
  const query = useQuery({
    queryKey: ["products", "ids", "search"],
    queryFn: () => getProductsInIds(ids)
  });

  return {
    products: query.data,
    isProductsLoading: query.isLoading,
    isProductsError: query.isError,
    isProductsRefetching: query.isRefetching,
    isProductsFetching: query.isFetching,
    refetchProducts: query.refetch
  };
}
