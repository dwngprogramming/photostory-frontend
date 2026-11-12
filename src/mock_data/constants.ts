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
  protectedAlbums: 7,
  storageUsed: 4.2,
  storageTotal: 15,
};

// Có cả ca biên: tên dài, thiếu ảnh bìa, album chưa có ảnh, số ảnh lớn
export const INITIAL_ALBUMS: Album[] = [
  {
    id: 'a1',
    title: 'Summer in Tuscany',
    coverImage: 'https://picsum.photos/id/1015/800/600',
    photoCount: 42,
    createdAt: '2024-08-12',
    privacy: 'PUBLIC',
    shareCode: 'SUMMER-IN-TUSCANY',
    pages: []
  },
  {
    id: 'a2',
    title: 'Winter Lodge',
    coverImage: 'https://picsum.photos/id/1036/800/600',
    photoCount: 18,
    createdAt: '2023-12-24',
    privacy: 'PIN_PROTECTED',
    shareCode: 'WINTER-LODGE-2023',
    pages: []
  },
  {
    id: 'a3',
    title: 'Tokyo Adventure',
    coverImage: 'https://picsum.photos/id/1047/800/600',
    photoCount: 1256,
    createdAt: '2023-10-03',
    privacy: 'PUBLIC',
    shareCode: 'TOKYO-ADVENTURE',
    pages: []
  },
  {
    id: 'a4',
    title: 'Weekend Camping',
    coverImage: 'https://picsum.photos/id/1043/800/600',
    photoCount: 24,
    createdAt: '2023-09-16',
    privacy: 'INVITE_ONLY',
    shareLinkId: 'V1StGXR8_Z5jdHi6',
    pages: []
  },
  {
    id: 'a5',
    title: 'Những buổi chiều cuối tuần cùng cả nhà ở quê ngoại, mùa lúa chín năm 2025',
    coverImage: 'https://picsum.photos/id/1018/800/600',
    photoCount: 87,
    createdAt: '2025-06-01',
    privacy: 'PIN_PROTECTED',
    shareCode: 'CHIEU-QUE-NGOAI',
    pages: []
  },
  {
    id: 'a6',
    title: 'Kỷ niệm 1 năm',
    photoCount: 0,
    createdAt: '2025-10-10',
    privacy: 'PIN_PROTECTED',
    pages: []
  },
];
