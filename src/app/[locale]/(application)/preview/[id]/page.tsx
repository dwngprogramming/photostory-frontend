import {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import AlbumPreview from "@/components/Application/User/MyAlbums/album-preview";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata.preview");
  return {
    title: t("title"),
    description: t("description"),
    robots: {index: false},
  };
}

export default function AlbumPreviewPage() {
  return <AlbumPreview/>;
}
