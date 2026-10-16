import {Metadata} from "next";
import AlbumPreview from "@/components/Application/User/MyAlbums/album-preview";

export const metadata: Metadata = {
  title: "Preview | Photostory",
  description: "Preview your album the way your recipient will see it",
  robots: {index: false},
};

export default function AlbumPreviewPage() {
  return <AlbumPreview/>;
}
