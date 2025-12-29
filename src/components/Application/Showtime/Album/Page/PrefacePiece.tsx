import React from "react";
import ScrollableMarkdown from "@/components/Application/Showtime/Album/Plugin/ScrollableMarkdown";

const PrefacePiece = ({preface}: { preface: string }) => {
  return (
    <div>
      <p className="text-2xl text-center text-stone-900 font-serif font-bold mb-6">Đôi lời xin chào ~</p>
      <ScrollableMarkdown content={preface} maxHeight={440} />
    </div>
  )
}

export default PrefacePiece;