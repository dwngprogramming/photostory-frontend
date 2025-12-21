import {Metadata} from "next";
import Showtime from "@/components/Application/Showtime/showtime";

export const metadata: Metadata = {
  title: "Showtime | Photostory",
  description: "Manage your digital memories",
};

export default function ShowtimePage() {
  return <Showtime/>;
}