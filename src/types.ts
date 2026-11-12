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
  initialInView?: boolean;
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

// Khớp ResourceVisibility của backend:
// PUBLIC: ai có mã đều mở được; PIN_PROTECTED: cần mã + PIN; INVITE_ONLY: chỉ người trong nhóm được chia sẻ, mở qua link mời
export type AlbumPrivacy = 'PUBLIC' | 'PIN_PROTECTED' | 'INVITE_ONLY';

export interface Album {
  id: string;
  title: string;
  coverImage?: string;
  photoCount: number;
  createdAt: string; // ISO date, ví dụ "2024-08-12"
  privacy: AlbumPrivacy;
  shareCode?: string; // mã unwrap gửi người nhận; không có nghĩa là chưa chia sẻ
  shareLinkId?: string; // nanoid 16 ký tự trong link mời (INVITE_ONLY), tránh lộ album id
  pages: PageData[];
}

export interface Stats {
  myAlbums: number;
  totalPhotos: number;
  publicAlbums: number;
  protectedAlbums: number; // PIN_PROTECTED + INVITE_ONLY
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

export interface VerifyPinRequest {
  code: string;
  pin: string;
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

export enum RelationshipType {
  lover = 'lover',
  boyfriend = 'boyfriend',
  girlfriend = 'girlfriend',
  partner = 'partner',
  husband = 'husband',
  wife = 'wife',
  child = 'child',
  children = 'children',
  son = 'son',
  daughter = 'daughter',
  friend = 'friend',
  family = 'family',
  colleague = 'colleague',
  parent = 'parent',
  father = 'father',
  mother = 'mother',
  brother = 'brother',
  sister = 'sister',
  sibling = 'sibling',
  friend_group = 'friend_group',
  best_friend = 'best_friend',
  myself = 'myself'
}

export interface AlbumResponse {
  id: string;
  ownerId: string;
  ownerName: string;
  relationship: RelationshipType;
  customRelationship?: string;
  customRelationshipLocale?: 'vi' | 'en';
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

export interface SharingResponse {
  requiredPin?: boolean;
  publicSharingKey?: string;
  resourceId?: string;
  type?: SharingType;
  token?: string;
  exp?: number;
}

export type SharingType = 'album' | 'photo' | 'video';

export type AudioAlbumMode = "theme" | "story";

export interface AudioState {
  currentUrl: string | null;
  themeUrl: string | null;
  mode: AudioAlbumMode;
  // Ý định của người dùng: true = đang/sắp phát. Trạng thái thật do sự kiện của player cập nhật
  isPlaying: boolean;
  // Đang tải bài hoặc đang chờ player bắt đầu phát
  isLoading: boolean;
  hasError: boolean;
  volume: number; // 0..1
  isMuted: boolean;
  position: number; // giây
  duration: number; // giây, 0 = chưa biết
  seekRequest: number | null; // 0..1; GlobalAudioPlayer thực hiện rồi xoá
  attempt: number; // tăng khi thử lại để dựng lại player
  isThemeSongPlayed: boolean; // nhạc chủ đề đã tự phát một lần
}