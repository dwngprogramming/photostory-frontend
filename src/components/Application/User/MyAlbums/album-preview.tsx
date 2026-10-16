"use client";

import {useEffect} from "react";
import {useParams} from "next/navigation";
import {useTranslations} from "next-intl";
import {toast} from "sonner";
import Showtime from "@/components/Application/Showtime/showtime";
import PreparingAlbum from "@/components/Application/Showtime/PreparingAlbum";
import {useMyAlbums} from "@/hooks/api/useMyAlbums";
import {createPreviewAlbum} from "@/mock_data/previewAlbum";
import {UnwrapPhase} from "@/types";
import {useRouter} from "@/libs/i18n/navigation";

// Chủ album xem thử đúng như người nhận sẽ thấy (hiện bằng nội dung mẫu)
export default function AlbumPreview() {
  const {id} = useParams<{ id: string }>();
  const router = useRouter();
  const t = useTranslations('App.Showtime.preview');
  const {data: albums, isPending, isError} = useMyAlbums();

  const album = albums?.find((item) => item.id === id);
  const notFound = !isPending && (isError || !album);

  useEffect(() => {
    if (!notFound) return;
    toast.error(t('notFound'));
    router.replace('/my-albums');
  }, [notFound, router, t]);

  if (!album) {
    return (
      <div className="w-screen h-screen">
        <PreparingAlbum phase={UnwrapPhase.PREPARING_ALBUM}/>
      </div>
    );
  }

  return (
    <Showtime
      previewAlbum={createPreviewAlbum(album)}
      onExitPreview={() => router.push('/my-albums')}
    />
  );
}
