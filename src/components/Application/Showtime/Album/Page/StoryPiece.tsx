import {Sun} from "lucide-react";
import React from "react";
import ScrollableMarkdown from "@/components/Application/Showtime/Album/Plugin/ScrollableMarkdown";

const StoryPiece: React.FC<{ content: string }> = ({content}) => {
  return (
    <div
      onClick={(e) => {
        // Ngăn sự kiện nổi lên HTMLPageFlip
        e.stopPropagation();
        e.preventDefault();
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onTouchStart={(e) => {
        e.stopPropagation();
      }}>
      <div
        className="flex items-baseline justify-between mb-4 select-text"
      >
        <h3 className="text-2xl text-stone-900 font-serif font-semibold">
          Cảm ơn em
        </h3>
        <div className="flex items-end space-x-6">
          <div className="flex items-center space-x-1 text-stone-700">
            <Sun size={16}/>
            <p className="text-[13px]">Nắng đẹp</p>
          </div>
          <p className="text-stone-700 text-[13px]">14/12/2025</p>
        </div>
      </div>
      <ScrollableMarkdown content={content} maxHeight={440}/>
    </div>
  )
}

export default StoryPiece;