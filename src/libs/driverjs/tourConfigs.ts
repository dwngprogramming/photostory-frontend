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