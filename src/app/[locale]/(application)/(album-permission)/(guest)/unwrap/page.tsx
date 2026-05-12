import { Metadata } from "next";
import UnwrapAlbum from "@/components/Application/AlbumPermission/Guest/UnwrapAlbum/unwrap-album";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Unwrap Your Photostory | Photostory",
  description: "Unwrap your photostory by enter unique code sent to you",
};

export default function UnwrapAlbumPage() {
  redirect("/demo/unwrap");
}