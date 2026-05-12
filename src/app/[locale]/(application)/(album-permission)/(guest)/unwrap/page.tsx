import { Metadata } from "next";
import UnwrapAlbum from "@/components/Application/AlbumPermission/Guest/UnwrapAlbum/unwrap-album";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "(Demo) Unwrap Your Photostory | Photostory",
  description: "(Demo) Unwrap your photostory by enter unique code sent to you",
};

export default function UnwrapAlbumPage() {
  redirect("/demo/unwrap");
}