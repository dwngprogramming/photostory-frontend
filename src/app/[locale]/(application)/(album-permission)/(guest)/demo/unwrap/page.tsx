import {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import DemoUnwrapAlbum from "@/components/Application/AlbumPermission/Guest/UnwrapAlbum/demo-unwrap-album";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata.demoUnwrap");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function DemoUnwrapAlbumPage() {
  return <DemoUnwrapAlbum/>;
}
