import {Metadata} from "next";
import UnwrapAlbum from "@/components/Application/Guest/UnwrapAlbum/unwrap-album";

export const metadata: Metadata = {
  title: "Unwrap Your Photostory | Photostory",
  description: "Unwrap your photostory by enter unique code sent to you",
};

export default function UnwrapAlbumPage() {
  return <UnwrapAlbum/>;
}