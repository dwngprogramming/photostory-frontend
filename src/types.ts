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