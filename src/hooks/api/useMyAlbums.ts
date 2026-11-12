import {useQuery, useQueryClient} from "@tanstack/react-query";
import {Album, AlbumPrivacy} from "@/types";
import {INITIAL_ALBUMS} from "@/mock_data/constants";

// Backend chưa có API danh sách album của người dùng: tạm trả dữ liệu mẫu.
// Khi dev có thể xem từng trạng thái bằng query `?mock=empty|error|loading`.
const fetchMyAlbumsMock = async (): Promise<Album[]> => {
  const scenario = process.env.NODE_ENV !== 'production' && typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('mock')
    : null;

  if (scenario === 'loading') return new Promise(() => {});
  await new Promise((resolve) => setTimeout(resolve, 600));
  if (scenario === 'error') throw new Error('Mock error');
  if (scenario === 'empty') return [];
  return INITIAL_ALBUMS;
};

const MY_ALBUMS_KEY = ['my-albums'];

export const useMyAlbums = () => {
  return useQuery({
    queryKey: MY_ALBUMS_KEY,
    queryFn: fetchMyAlbumsMock,
  });
};

// Backend chưa có API sửa/xoá album: tạm sửa thẳng dữ liệu trong cache.
export const useMyAlbumActions = () => {
  const queryClient = useQueryClient();
  const update = (fn: (albums: Album[]) => Album[]) =>
    queryClient.setQueryData<Album[]>(MY_ALBUMS_KEY, (albums) => albums && fn(albums));

  return {
    changePrivacy: (id: string, privacy: AlbumPrivacy) => update((albums) => albums.map((album) => album.id === id
      ? {...album, privacy}
      : album)),
    deleteAlbum: (id: string) => update((albums) => albums.filter((album) => album.id !== id)),
  };
};
