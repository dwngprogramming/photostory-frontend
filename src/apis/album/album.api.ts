import publicApiClient from "@/libs/axios/publicApiClient";
import {VerifyPinRequest, AlbumResponse, ApiResponse, SharingResponse} from "@/types";

export const albumApi = {
  viewPublicAlbum: (key: string) =>
    publicApiClient.get<ApiResponse<AlbumResponse>>(`/albums/view/public`, {
      params: {key},
    }),
  
  viewPermissionAlbum: (id: string, token: string) =>
    publicApiClient.get<ApiResponse<AlbumResponse>>(`/albums/view/${id}`, {
      headers: {
        'X-Album-Authorization': `Bearer ${token}`,
      },
    }),
  
  getSharingPropertiesByCodeIfPublic: (code: string) =>
    publicApiClient.get<ApiResponse<SharingResponse>>(`/albums/sharing/code/${code}`),
  
  verifyPinWithCode: (request: VerifyPinRequest) =>
    publicApiClient.post<ApiResponse<SharingResponse>>(`/albums/sharing/pin`, request),
}