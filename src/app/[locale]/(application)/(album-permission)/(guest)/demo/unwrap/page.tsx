import {Metadata} from "next";
import DemoUnwrapAlbum from "@/components/Application/AlbumPermission/Guest/UnwrapAlbum/demo-unwrap-album";

export const metadata: Metadata = {
  title: "(Demo) Unwrap Your Photostory | Photostory",
  description: "(Demo) Unwrap your photostory by enter unique code sent to you",
};

export default function DemoUnwrapAlbumPage() {
  return <DemoUnwrapAlbum/>;
}
