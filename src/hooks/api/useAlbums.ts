import {useMutation, UseMutationOptions, useQuery, UseQueryOptions} from "@tanstack/react-query";
import {albumApi} from "@/apis/album/album.api";
import {VerifyPinRequest} from "@/types";
import {useAppSelector} from "@/libs/redux/hook";

export const useGetPublicAlbum = (key?: string) => {
  return useQuery({
    queryKey: ['public-album', key],
    queryFn: async () => {
      if (!key) throw new Error('Key is required');
      const response = await albumApi.viewPublicAlbum(key);
      return response.data;
    },
    enabled: !!key,
    staleTime: Infinity,
  });
}

export const useGetPermissionAlbum = (id: string) => {
  const {token} = useAppSelector(state => state.permissionResource);
  return useQuery({
    queryKey: ['permission-album', id],
    queryFn: async () => {
      if (!token) throw new Error('Token is required');
      const response = await albumApi.viewPermissionAlbum(id, token);
      return response.data;
    },
    enabled: !!id && !!token,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}

export const useGetUnwrapAlbum = (code: string, config?: Partial<UseQueryOptions<any, Error>>) => {
  return useQuery({
    queryKey: ['unwrap-album-if-public', code],
    queryFn: async () => {
      const response = await albumApi.getSharingPropertiesByCodeIfPublic(code);
      return response.data;
    },
    staleTime: 0,
    gcTime: 0,
    enabled: !!code && (config?.enabled !== false),
    ...config
  });
}

export const useUnwrapAlbumWithPin = (
  config?: UseMutationOptions<any, Error, VerifyPinRequest>
) => {
  return useMutation({
    mutationKey: ['unwrap-album-with-pin'],
    mutationFn: async (request: VerifyPinRequest) => {
      const response = await albumApi.verifyPinWithCode(request);
      return response.data;
    },
    ...config,
  });
};