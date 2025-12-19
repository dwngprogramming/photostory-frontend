import MyAlbums from "@/components/Application/User/MyAlbums/my-albums";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Albums | Photostory",
  description: "Manage your digital memories",
};

export default function MyAlbumsPage() {
  return <MyAlbums />;
}