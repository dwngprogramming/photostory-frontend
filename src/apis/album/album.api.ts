import publicApiClient from "@/libs/axios/publicApiClient";
import {AlbumResponse, ApiResponse} from "@/types";

export const albumApi = {
  getAlbumById: (id: string) => publicApiClient.get<ApiResponse<AlbumResponse>>(`/albums/${id}`),
  getShowtimeData: (code: string) => publicApiClient.get<ApiResponse<AlbumResponse>>(`/albums/showtime/${code}`),
}