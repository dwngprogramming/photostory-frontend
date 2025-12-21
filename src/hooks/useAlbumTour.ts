import {useCallback, useEffect, useRef} from "react";
import {driver, Driver} from "driver.js";
import {TOUR_STEPS} from "@/libs/driverjs/tourConfigs";

interface AlbumTourReturn {
  startTour: () => void;
  closeTour: () => void;
}

const TOUR_STORAGE_KEY = 'tour_completed';

export const useAlbumTour = (): AlbumTourReturn => {
  const driverObj = useRef<Driver | null>(null);
  
  useEffect(() => {
    driverObj.current = driver({
      showProgress: true,
      steps: TOUR_STEPS,
      animate: true,
      allowClose: true,
      allowKeyboardControl: true,
      onDestroyStarted: () => {
        // When the tour is finished or skipped via "Done" or "Close"
        // In a real app, you might want to call an API here
        if (!driverObj.current?.hasNextStep() || confirm("Are you sure you want to skip the tour?")) {
          driverObj.current?.destroy();
          localStorage.setItem(TOUR_STORAGE_KEY, 'true');
        }
      },
    });
  }, []);
  
  const startTour = useCallback(() => {
    const hasSeenTour = localStorage.getItem(TOUR_STORAGE_KEY);
    if (!hasSeenTour) {
    driverObj.current?.drive();
    }
  }, []);
  
  const closeTour = useCallback(() => {
    driverObj.current?.destroy();
    localStorage.setItem(TOUR_STORAGE_KEY, 'true');
  }, []);
  
  return { startTour, closeTour };
}