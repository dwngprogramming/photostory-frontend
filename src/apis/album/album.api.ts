import publicApiClient from "@/libs/axios/publicApiClient";
import {AlbumResponse, ApiResponse, SharingResponse} from "@/types";

export const albumApi = {
  getSharingAlbum: (id: string, token: string) => publicApiClient.get<ApiResponse<AlbumResponse>>(`/albums/sharing/${id}`, {
    params: {
      token
    }
  }),
  getSharingProperties: (code: string) => publicApiClient.get<ApiResponse<SharingResponse>>(`/albums/unwrap/${code}`),
}