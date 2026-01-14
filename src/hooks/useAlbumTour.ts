import {useCallback, useEffect, useRef, useState} from "react";
import {driver, Driver} from "driver.js";
import {TOUR_STEPS} from "@/libs/driverjs/tourConfigs";

interface AlbumTourReturn {
  startTour: () => void;
  closeTour: () => void;
  isTourOpen: boolean;
}

const TOUR_STORAGE_KEY = 'tour_completed';

export const useAlbumTour = (): AlbumTourReturn => {
  const [isTourOpen, setIsTourOpen] = useState(false);
  const driverObj = useRef<Driver | null>(null);
  
  useEffect(() => {
    driverObj.current = driver({
      showProgress: true,
      steps: TOUR_STEPS,
      animate: true,
      allowClose: false,
      allowKeyboardControl: true,
      onDestroyed: () => {
        setIsTourOpen(false);
      },
      onDestroyStarted: () => {
        // When the tour is finished or skipped via "Done" or "Close"
        // In a real app, you might want to call an API here
        if (!driverObj.current?.hasNextStep() || confirm("Are you sure you want to skip the tour?")) {
          driverObj.current?.destroy();
          localStorage.setItem(TOUR_STORAGE_KEY, 'true');
          // Lưu ý: Không cần setIsTourOpen(false) ở đây,
          // vì hàm destroy() ở trên sẽ kích hoạt callback onDestroyed.
        }
      },
    });
  }, []);
  
  const startTour = useCallback(() => {
    const hasSeenTour = localStorage.getItem(TOUR_STORAGE_KEY);
    if (!hasSeenTour) {
      setIsTourOpen(true);
      setTimeout(() => {
        driverObj.current?.drive();
      }, 0);
    }
  }, []);
  
  const closeTour = useCallback(() => {
    driverObj.current?.destroy();
    localStorage.setItem(TOUR_STORAGE_KEY, 'true');
  }, []);
  
  return {startTour, closeTour, isTourOpen};
}