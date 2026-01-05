// components/ScrollableMarkdown.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { ChevronDown, ArrowUpToLine } from 'lucide-react';
import { useScrollIndicator } from '@/hooks/useScrollIndicator';

interface ScrollableMarkdownProps {
  content: string;
  height: number; // Nhận vào số (pixel)
  className?: string;
}

const ScrollableMarkdown: React.FC<ScrollableMarkdownProps> = ({ content, height, className = '' }) => {
  const {
    containerRef,
    hasOverflow,
    isAtBottom,
    handleScroll,
    scrollDown,
    scrollToTop
  } = useScrollIndicator(content);
  
  return (
    <div className="relative group">
      {/* Container nội dung chính */}
      <div
        ref={containerRef} // Luôn phải gắn ref để đo đạc
        onScroll={handleScroll}
        style={{ height: `${height}px` }}
        className={`
          prose prose-sm font-story overflow-y-auto no-scrollbar
          text-slate-700 text-left leading-loose tracking-wide mx-auto
          ${hasOverflow ? 'pb-12' : ''}
          ${className}
        `}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
          {content}
        </ReactMarkdown>
      </div>
      
      {/* Nút điều hướng (Chỉ render khi thực sự có tràn nội dung) */}
      {hasOverflow && (
        <div
          className={`
            absolute bottom-0 left-1/2 -translate-x-1/2 z-10
            transition-all duration-300 ease-in-out
            ${hasOverflow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <button
            onClick={isAtBottom ? scrollToTop : scrollDown}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg border border-white/10
              text-xs font-medium transition-colors duration-300
              ${isAtBottom
              ? 'bg-amber-500 hover:bg-amber-600 text-white'
              : 'bg-stone-800/80 hover:bg-stone-700 text-white'
            }
            `}
          >
            {isAtBottom ? (
              <>
                <span>Về đầu</span>
                <ArrowUpToLine className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <span>Cuộn xuống</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      )}
      
      {/* Gradient mờ (Chỉ hiện khi có overflow VÀ CHƯA ở đáy) */}
      {hasOverflow && (
        <div
          className={`
            absolute bottom-0 left-0 right-0 h-16 pointer-events-none transition-opacity duration-500
            ${!isAtBottom ? 'opacity-100' : 'opacity-0'}
          `}
        />
      )}
    </div>
  );
};

export default ScrollableMarkdown;