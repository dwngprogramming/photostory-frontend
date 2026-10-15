import {useQuery} from "@tanstack/react-query";
import {Album} from "@/types";
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

export const useMyAlbums = () => {
  return useQuery({
    queryKey: ['my-albums'],
    queryFn: fetchMyAlbumsMock,
  });
};
