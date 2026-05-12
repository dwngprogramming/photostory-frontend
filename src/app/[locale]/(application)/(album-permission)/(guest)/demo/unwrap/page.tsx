import {Metadata} from "next";
import DemoUnwrapAlbum from "@/components/Application/AlbumPermission/Guest/UnwrapAlbum/demo-unwrap-album";

export const metadata: Metadata = {
  title: "Unwrap Your Photostory | Photostory",
  description: "Unwrap your photostory by enter unique code sent to you",
};

export default function DemoUnwrapAlbumPage() {
  return <DemoUnwrapAlbum/>;
}
