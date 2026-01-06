import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {albumApi} from "@/apis/album/album.api";

export const useGetAlbumById = (id: string, token: string) => {
  return useQuery({
    queryKey: ['album-by-id', id, token],
    queryFn: async () => {
      const response = await albumApi.getSharingAlbum(id, token);
      return response.data;
    },
    enabled: !!id && !!token,
    staleTime: Infinity,
  });
}

export const useGetUnwrapAlbum = (code: string, config?: Partial<UseQueryOptions<any, Error>>) => {
  return useQuery({
    queryKey: ['unwrap-album', code],
    queryFn: async () => {
      const response = await albumApi.getSharingProperties(code);
      return response.data;
    },
    staleTime: Infinity,
    gcTime: 15 * 60 * 1000,
    enabled: !!code && (config?.enabled !== false),
    ...config
  });
}