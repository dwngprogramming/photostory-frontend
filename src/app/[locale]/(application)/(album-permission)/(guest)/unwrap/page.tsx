import {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import {redirect} from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata.unwrap");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function UnwrapAlbumPage() {
  redirect("/demo/unwrap");
}