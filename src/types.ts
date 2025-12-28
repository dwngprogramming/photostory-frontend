import React from 'react';

export interface NavLink {
  label: string;
  href: string;
}

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Step {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface UseScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
  thumbnail?: string;
}

export interface PageData {
  id: string;
  left: {
    media: MediaItem[];
    music?: { name: string; duration: string };
    location?: { name: string };
  };
  right: {
    weather: string;
    storyText: string;
  };
}

export interface Album {
  id: string;
  title: string;
  coverImage: string;
  photoCount: number;
  date: string;
  privacy: 'public' | 'private';
  pages: PageData[];
}

export interface Stats {
  myAlbums: number;
  totalPhotos: number;
  publicAlbums: number;
  privateAlbums: number;
  storageUsed: number; // in GB
  storageTotal: number; // in GB
}

export enum UnwrapPhase {
  IDLE = 'IDLE',
  LOADING = 'LOADING', // 0-1s
  CURTAIN_CLOSE = 'CURTAIN_CLOSE', // 1-2s
  INTRO_TEXT = 'INTRO_TEXT', // New phase: Text display
  ICONS_FLOAT = 'ICONS_FLOAT', // 2-2.5s
  RIBBON_EXPAND = 'RIBBON_EXPAND', // 2.5-3.5s
  VERTICAL_SPLIT = 'VERTICAL_SPLIT', // 3.5-4s
  CURTAIN_OPEN = 'CURTAIN_OPEN', // 4-5s
  REVEALED = 'REVEALED' // 5s+
}

export interface AnimationProps {
  phase: UnwrapPhase;
}

export interface Photo {
  id: string;
  url: string;
  caption: string;
  date: string;
  orientation: 'landscape' | 'portrait' | 'square';
}

export interface UserPrincipal {
  id: string;
  username: string;
  email: string;
  token: string;
}

export interface UserResponse {
  id: string;
  username: string;
  email: string;
}

export interface AlbumResponse {
  id: string;
  ownerId: string;
  ownerName: string;
  recipients: string[];

  // Cover & Introduction
  title: string;
  description: string;

  // Left french flip
  frenchFlipNote: string;
  avatarUrl?: string;

  stories: StoryResponse[];
}

export interface StoryResponse {
  id: string;
  title: string;
  eventDate: string;
  displayOrderInDay?: number;
  weather?: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'clear-night';
  content: string;
  musicUrl?: string;
  photos: PhotoResponse[];
  location: LocationResponse[];
}

export interface PhotoResponse {
  id: string;
  mediaUrl: string;
  mediaType: 'photo' | 'video';
  orientation: 'landscape' | 'portrait' | 'square';
  caption?: string;
  displayOrder: number;
}

export interface LocationResponse {
  id: string;
  name: string;
  mapUrl?: string;
  displayOrder: number;
}