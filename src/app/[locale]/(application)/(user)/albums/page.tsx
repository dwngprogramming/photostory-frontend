import {Metadata} from "next";
import Album from "@/components/Application/User/Album/album";

export const metadata: Metadata = {
  title: "Albums | Photostory",
  description: "Manage your digital memories",
};

export default function AlbumPage() {
  return <Album/>;
}