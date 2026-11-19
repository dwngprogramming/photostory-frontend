import {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import Showtime from "@/components/Application/Showtime/showtime";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata.showtime");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function ShowtimePage() {
  return <Showtime/>;
}