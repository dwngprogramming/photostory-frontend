import {DriveStep} from "driver.js";

export const TOUR_STEPS: DriveStep[] = [
  {
    popover: {
      title: 'Chào mừng bạn đến với album của Photostory!',
      description: 'Đây là hướng dẫn cơ bản để giúp bạn làm quen với các tính năng chính.',
      side: 'over',
      align: 'center',
    },
  },
  {
    element: '#theme-music-player',
    popover: {
      title: 'Nhạc nền phát ở đây ~',
      description: 'Sử dụng trình phát nhạc này để điều khiển nhạc nền của album. Bạn có thể xem tên bài hát, tên tác giả, tạm dừng hoặc tiếp tục phát ở đây.',
      side: 'bottom',
      align: 'center',
    }
  },
  {
    element: "#theme-toggle",
    popover: {
      title: 'Bạn thích giao diện sáng hay tối?',
      description: 'Sử dụng nút chuyển đổi này để thay đổi giữa chế độ sáng và tối của giao diện album. Giao diện tối có lẽ sẽ "deep" hơn cho trải nghiệm đọc đó ~',
      side: 'bottom',
      align: 'center',
    }
  },
  {
    element: '#album-digital',
    popover: {
      title: 'Lật sang trang tiếp theo',
      description: 'Bấm vào mép phải của trang để lật sang trang tiếp theo của album. Hiệu ứng sẽ rõ hơn nếu bấm vào mép trên/dưới của trang',
      side: 'right',
      align: 'center',
    }
  },
  {
    element: '#album-digital',
    popover: {
      title: 'Lật lại trang trước đó',
      description: 'Bấm vào mép trái của trang để lật lại trang trước đó của album. Hiệu ứng sẽ rõ hơn nếu bấm vào mép trên/dưới của trang',
      side: 'left',
      align: 'center',
    }
  },
  {
    popover: {
      title: 'Hoàn thành!',
      description: 'Bạn đã hoàn thành hướng dẫn cơ bản. Chúc bạn tận hưởng album vui vẻ!',
      side: 'over',
      align: 'center',
    },
  },
];