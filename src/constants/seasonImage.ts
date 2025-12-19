"use client";

import { useState, useEffect } from "react";

const SEASON_CONFIG = { spring: 10, summer: 10, autumn: 10, winter: 10 };
type SeasonKey = keyof typeof SEASON_CONFIG;

export const useSeasonGallery = (season: string, limit: number) => {
  const [images, setImages] = useState<string[]>([]);
  
  useEffect(() => {
    const s = (SEASON_CONFIG[season as SeasonKey] ? season : 'summer') as SeasonKey;
    const max = SEASON_CONFIG[s];
    
    const selectedIndices = new Set<number>();
    
    while (selectedIndices.size < limit) {
      const randomNum = Math.floor(Math.random() * max) + 1;
      selectedIndices.add(randomNum);
    }
    
    const paths = Array.from(selectedIndices).map(id =>
      `/images/seasons/${s}/${s}-${id}.jpg`
    );
    
    setImages(paths);
  }, [season]);
  
  return images;
};