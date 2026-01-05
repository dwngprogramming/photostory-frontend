import React from 'react';
import {LocationTheme} from "@/components/Application/Showtime/Album/Plugin/GlassLocationBadge";

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
  LOADING = 'LOADING',
  CURTAIN_CLOSE = 'CURTAIN_CLOSE',
  PREPARING_ALBUM = 'PREPARING_ALBUM',
  SILENCE = 'SILENCE',
  INTRO_TEXT = 'INTRO_TEXT',
  ICONS_FLOAT = 'ICONS_FLOAT',
  RIBBON_EXPAND = 'RIBBON_EXPAND',
  VERTICAL_SPLIT = 'VERTICAL_SPLIT',
  CURTAIN_OPEN = 'CURTAIN_OPEN',
  REVEALED = 'REVEALED'
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

export interface ShowtimeDataResponse {
  albumId: string;
  token: string;
  exp: number;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data?: T;
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
  fullName: string;
  dob?: string;
  gender: 'male | female | other';
  avatar?: string;
}

export interface AlbumResponse {
  id: string;
  ownerId: string;
  ownerName: string;
  savedDate: string;
  recipients: string[];
  themeSongUrl?: string;

  // Cover & Introduction
  title: string;
  description: string;

  // Left french flip
  frenchFlipNote: string;
  frenchFlipPlace?: string;
  avatarUrl?: string;
  avatarGender?: 'male' | 'female' | 'other';
  
  // Preface
  preface?: string;
  highlightPhotoUrl?: string;
  
  // Table of Contents
  tableOfContents: TOCResponse[];

  // Stories
  stories: StoryResponse[];
  
  // Afterword
  afterword?: string;
}

export interface TOCResponse {
  storyTitle: string;
  eventDate: string;
  displayOrderInDay: number;
  page: number;
}

export interface StoryResponse {
  id: string;
  title: string;
  eventDate: string;
  displayOrderInDay?: number;
  weather?: WeatherType;
  content: string;
  musicUrl?: string;
  photos: PhotoResponse[];
  locations: LocationResponse[];
}

export type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'clear_night';

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
  locationTheme: LocationTheme;
  mapUrl?: string;
  displayOrder: number;
}