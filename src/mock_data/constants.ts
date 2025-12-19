import { Album, User, Stats } from '@/types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Elena Fisher',
  email: 'elena.story@example.com',
  avatar: 'https://picsum.photos/200',
};

export const MOCK_STATS: Stats = {
  myAlbums: 12,
  totalPhotos: 1483,
  publicAlbums: 5,
  privateAlbums: 7,
  storageUsed: 4.2,
  storageTotal: 15,
};

export const INITIAL_ALBUMS: Album[] = [
  {
    id: 'a1',
    title: 'Summer in Tuscany',
    coverImage: 'https://picsum.photos/id/1015/800/600',
    photoCount: 42,
    date: 'Aug 2024',
    privacy: 'public',
    pages: []
  },
  {
    id: 'a2',
    title: 'Winter Lodge',
    coverImage: 'https://picsum.photos/id/1036/800/600',
    photoCount: 18,
    date: 'Dec 2023',
    privacy: 'private',
    pages: []
  },
  {
    id: 'a3',
    title: 'Tokyo Adventure',
    coverImage: 'https://picsum.photos/id/1047/800/600',
    photoCount: 156,
    date: 'Oct 2023',
    privacy: 'public',
    pages: []
  },
  {
    id: 'a4',
    title: 'Weekend Camping',
    coverImage: 'https://picsum.photos/id/1043/800/600',
    photoCount: 24,
    date: 'Sep 2023',
    privacy: 'private',
    pages: []
  },
];