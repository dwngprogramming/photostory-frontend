import {AlbumResponse, PhotoResponse, RelationshipType, StoryResponse} from "@/types";

// Dữ liệu giả để test lật trang khi chưa có dữ liệu dưới DB

const photo = (id: string, orientation: PhotoResponse['orientation'], caption: string, order: number): PhotoResponse => {
  const size = orientation === 'landscape' ? '800/600' : orientation === 'portrait' ? '600/800' : '700/700';
  return {
    id,
    mediaUrl: `https://picsum.photos/seed/photostory-${id}/${size}`,
    mediaType: 'photo',
    orientation,
    caption,
    displayOrder: order,
  };
};

const longContent = (title: string) => [
  `## ${title}`,
  'Hôm ấy trời trong, gió nhẹ. Chúng mình đi bộ dọc con phố nhỏ, ghé vào một quán cà phê quen.',
  '**Kỷ niệm đáng nhớ nhất:** khoảnh khắc cả nhóm cùng cười vì một câu chuyện chẳng đâu vào đâu.',
  ...Array.from({length: 10}, (_, i) => `Đoạn ${i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`),
  '> "Có những ngày bình thường lại trở thành kỷ niệm đẹp nhất."',
].join('\n\n');

const stories: StoryResponse[] = [
  {
    id: 's1',
    title: 'Chuyến đi Đà Lạt',
    eventDate: '2025-10-11',
    displayOrderInDay: 1,
    weather: 'cloudy',
    content: longContent('Sương sớm Đà Lạt'),
    photos: [
      photo('s1-1', 'landscape', 'Đồi thông', 1),
      photo('s1-2', 'portrait', 'Quán cà phê', 2),
      photo('s1-3', 'square', 'Hoàng hôn', 3),
    ],
    locations: [
      {id: 'l1', name: 'Đà Lạt', locationTheme: 'mountain', displayOrder: 1},
      {id: 'l2', name: 'Quán cà phê nhỏ', locationTheme: 'cafe', displayOrder: 2},
    ],
  },
  {
    id: 's2',
    title: 'Biển Nha Trang',
    eventDate: '2025-11-02',
    displayOrderInDay: 1,
    weather: 'sunny',
    content: longContent('Ngày nắng đẹp'),
    photos: [
      photo('s2-1', 'landscape', 'Bãi biển', 1),
      photo('s2-2', 'landscape', 'Hải đăng', 2),
    ],
    locations: [{id: 'l3', name: 'Nha Trang', locationTheme: 'ocean', displayOrder: 1}],
  },
  {
    id: 's3',
    title: 'Đêm Hà Nội',
    eventDate: '2025-12-24',
    displayOrderInDay: 1,
    weather: 'clear_night',
    content: 'Một đoạn ngắn, không cần cuộn.',
    photos: [photo('s3-1', 'portrait', 'Phố cổ', 1)],
    locations: [{id: 'l4', name: 'Hà Nội', locationTheme: 'urban', displayOrder: 1}],
  },
];

export const createMockAlbum = ({withAfterword = true}: { withAfterword?: boolean } = {}): AlbumResponse => ({
  id: 'mock-album',
  ownerId: 'mock-owner',
  ownerName: 'Photostory Dev',
  relationship: RelationshipType.friend,
  savedDate: '2025-12-31',
  recipients: ['An', 'Bình'],
  title: 'Album Test',
  description: 'Album dữ liệu giả để test lật trang',
  frenchFlipNote: 'Gửi các bạn một chút kỷ niệm của năm nay. Mong rằng mỗi lần mở album sẽ thấy vui.',
  frenchFlipPlace: 'Hà Nội',
  avatarGender: 'male',
  preface: 'Lời tựa: những câu chuyện nhỏ của một năm đáng nhớ.',
  tableOfContents: stories.map((story, index) => ({
    storyTitle: story.title,
    eventDate: story.eventDate,
    displayOrderInDay: 1,
    page: index * 2 + 3,
  })),
  stories,
  afterword: withAfterword ? 'Lời kết: cảm ơn vì đã cùng nhau đi qua những ngày này.' : undefined,
});
