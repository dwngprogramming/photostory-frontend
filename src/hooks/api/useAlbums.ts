import {useQuery} from "@tanstack/react-query";
import {albumApi} from "@/apis/album/album.api";

export const useGetAlbumById = (id: string) => {
  return useQuery({
    queryKey: ['album-by-id', id],
    queryFn: async () => {
      const response = await albumApi.getAlbumById(id);
      return response.data;
    },
    enabled: !!id
  });
}

export const useGetShowtimeData = (code: string) => {
  return useQuery({
    queryKey: ['showtime-data', code],
    queryFn: async () => {
      const response = await albumApi.getShowtimeData(code);
      return response.data;
    },
    enabled: !!code
  });
}