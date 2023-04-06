type TImage = {
  image_id: number;
  image_url: string;
  format: string;
}
type TProduct = {
  id: number
  title: string
  description: string
  time: string
  distance: string;
  price: string;
  isFavorite: boolean;
  images: TImage[];
  rate: number;
}

export const listProducts = [
  {
    id: 1,
    title: 'Thành phố Nha Trang',
    description: 'Thành phố Nha Trang',
    distance: 'Cách 3000m',
    time: 'Ngày 06 - Ngày 13 tháng 4',
    price: '15.000.000',
    isFavorite: true,
    rate: 5.0,
    images: [
      {
        image_id: 12,
        image_url: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-10-07/files/aperture-priority-ae-mode_1405-5.jpg',
        format: 'image'
      },
      {
        image_id: 13,
        image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxWdUsmHfqkR6JNCH69rTOIiklaiEdGKrNyoKPoLOsibjFX5BHuSPdIlfXHjc37Ws3kP8&usqp=CAU',
        format: 'image'
      },
      {
        image_id: 14,
        image_url:
          'https://c.pxhere.com/photos/8b/15/clouds_country_sun_paisage_landscape_nature_natural_outdoors-567564.jpg!s2',
        format: 'image'
      }
    ]
  },
  {
    id: 12,
    title: 'Thành phố Nha Trang',
    description: 'Thành phố Nha Trang',
    distance: 'Cách 3000m',
    time: 'Ngày 06 - Ngày 13 tháng 4',
    price: '15.000.000',
    isFavorite: false,
    rate: 5.0,
    images: [
      {
        image_id: 12,
        image_url: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-10-07/files/aperture-priority-ae-mode_1405-5.jpg',
        format: 'image'
      }
    ]
  },
  {
    id: 13,
    title: 'Thành phố Nha Trang',
    description: 'Thành phố Nha Trang',
    distance: 'Cách 3000m',
    time: 'Ngày 06 - Ngày 13 tháng 4',
    price: '15.000.000',
    isFavorite: false,
    rate: 5.0,
    images: [
      {
        image_id: 12,
        image_url: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-10-07/files/aperture-priority-ae-mode_1405-5.jpg',
        format: 'image'
      }
    ]
  },
  {
    id: 14,
    title: 'Thành phố Nha Trang',
    description: 'Thành phố Nha Trang',
    distance: 'Cách 3000m',
    time: 'Ngày 06 - Ngày 13 tháng 4',
    price: '15.000.000',
    isFavorite: false,
    rate: 5.0,
    images: [
      {
        image_id: 12,
        image_url: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-10-07/files/aperture-priority-ae-mode_1405-5.jpg',
        format: 'image'
      }
    ]
  },
  {
    id: 15,
    title: 'Thành phố Nha Trang',
    description: 'Thành phố Nha Trang',
    distance: 'Cách 3000m',
    time: 'Ngày 06 - Ngày 13 tháng 4',
    price: '15.000.000',
    isFavorite: false,
    rate: 5.0,
    images: [
      {
        image_id: 12,
        image_url: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-10-07/files/aperture-priority-ae-mode_1405-5.jpg',
        format: 'image'
      }
    ]
  },
  {
    id: 16,
    title: 'Thành phố Nha Trang',
    description: 'Thành phố Nha Trang',
    distance: 'Cách 3000m',
    time: 'Ngày 06 - Ngày 13 tháng 4',
    price: '15.000.000',
    isFavorite: false,
    rate: 5.0,
    images: [
      {
        image_id: 12,
        image_url: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-10-07/files/aperture-priority-ae-mode_1405-5.jpg',
        format: 'image'
      }
    ]
  },
  {
    id: 17,
    title: 'Thành phố Nha Trang',
    description: 'Thành phố Nha Trang',
    distance: 'Cách 3000m',
    time: 'Ngày 06 - Ngày 13 tháng 4',
    price: '15.000.000',
    isFavorite: false,
    rate: 5.0,
    images: [
      {
        image_id: 12,
        image_url: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-10-07/files/aperture-priority-ae-mode_1405-5.jpg',
        format: 'image'
      }
    ]
  },
  {
    id: 18,
    title: 'Thành phố Nha Trang',
    description: 'Thành phố Nha Trang',
    distance: 'Cách 3000m',
    time: 'Ngày 06 - Ngày 13 tháng 4',
    price: '15.000.000',
    isFavorite: false,
    rate: 5.0,
    images: [
      {
        image_id: 12,
        image_url: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-10-07/files/aperture-priority-ae-mode_1405-5.jpg',
        format: 'image'
      }
    ]
  },
  {
    id: 19,
    title: 'Thành phố Nha Trang',
    description: 'Thành phố Nha Trang',
    distance: 'Cách 3000m',
    time: 'Ngày 06 - Ngày 13 tháng 4',
    price: '15.000.000',
    isFavorite: false,
    rate: 5.0,
    images: [
      {
        image_id: 12,
        image_url: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-10-07/files/aperture-priority-ae-mode_1405-5.jpg',
        format: 'image'
      }
    ]
  }
] as TProduct[]