import { useState, useRef, useEffect, useCallback } from 'react';

export const useScrollIndicator = (content: string) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  
  const checkScrollState = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    
    // 1. Kiểm tra tràn
    // Dùng Math.round để tránh lỗi sai số thập phân trên một số màn hình
    const overflowStatus = el.scrollHeight > Math.round(el.clientHeight);
    setHasOverflow(overflowStatus);
    
    // 2. Kiểm tra đáy
    const atBottomStatus = Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight - 10;
    setIsAtBottom(atBottomStatus);
  }, []);
  
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    // Kiểm tra ngay lập tức
    checkScrollState();
    
    // Sử dụng ResizeObserver để lắng nghe thay đổi kích thước
    // (Đây là chìa khóa để fix lỗi nút không hiện lúc đầu)
    const observer = new ResizeObserver(() => {
      checkScrollState();
    });
    
    observer.observe(el);
    
    // Vẫn giữ setTimeout như một phương án dự phòng cho việc render font/ảnh
    const timer = setTimeout(checkScrollState, 200);
    
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [content, checkScrollState]);
  
  const scrollDown = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ top: 150, behavior: 'smooth' });
    }
  };
  
  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  return {
    containerRef,
    hasOverflow,
    isAtBottom,
    handleScroll: checkScrollState,
    scrollDown,
    scrollToTop,
  };
};