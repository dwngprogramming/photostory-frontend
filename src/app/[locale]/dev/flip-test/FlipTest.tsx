'use client';

import {useState} from "react";
import {useSearchParams} from "next/navigation";
import DigitalAlbum from "@/components/Application/Showtime/DigitalAlbum";
import {UnwrapPhase} from "@/types";
import {createMockAlbum} from "./mockAlbum";

// Query params:
//   ?tour=1        bật lại tour hướng dẫn
//   ?afterword=0   album không có trang lời kết
const FlipTest = () => {
  const searchParams = useSearchParams();
  const withTour = searchParams.get('tour') === '1';
  const withAfterword = searchParams.get('afterword') !== '0';

  // Chạy trong lúc render (trước effect của DigitalAlbum) để quyết định có bật tour hay không
  useState(() => {
    if (typeof window === 'undefined') return;
    if (withTour) localStorage.removeItem('tour_completed');
    else localStorage.setItem('tour_completed', 'true');
  });

  const [album] = useState(() => createMockAlbum({withAfterword}));

  return <DigitalAlbum album={album} phase={UnwrapPhase.REVEALED}/>;
};

export default FlipTest;
