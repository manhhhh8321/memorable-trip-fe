export interface Room {
  id: number
  createdAt: string
  updatedAt: string
  roomType: string
  roomName: string
  price: number
  about: string
  numberOfLivingRoom: number
  numberOfBedroom: number
  numberOfBed: number
  numberOfBathroom: number
  address: string
  isActive: boolean
  deletedAt: string | null
  image: {
    id: number
    createdAt: string
    updatedAt: string
    url: string
  }[]
  city: {
    id: number
    createdAt: string
    updatedAt: string
    name: string
    code: string
  }
  description: {
    id: number
    createdAt: string
    updatedAt: string
    name: string
    icon: string | null
  }
  user: {
    id: number
    createdAt: string
    updatedAt: string
    userType: string
    firstName: string
    lastName: string
    email: string
    phone: string
    gender: string
    isVerified: boolean
    deleted_at: string | null
  }
  bookingDate: string[]
  roomAmenities: RoomAmenity[]
}

export interface RoomAmenity {
  roomId: number
  amenitiesId: number
  amenities: {
    id: number
    createdAt: string
    updatedAt: string
    name: string
    rate: number
    icon: string
  }
}

export interface CreateBookingDto {
  roomId: number
  note?: string
  paymentType: PaymentType
  checkIn: Date
  checkOut: Date
}

export enum PaymentType {
  CASH = 'CASH',
  CARD = 'CARD'
}

export interface RoomDto {
  roomName: string
  price: number
  numberOfLivingRoom: string
  numberOfBedroom: string
  numberOfBed: string
  numberOfBathroom: string
  roomType: string
  about: string
  description: string
  city: string
  amenities: string[]
  image: string[]
  address: string
}

export const AMENITIES = [
  'Bathroom',
  'Baby carriage',
  'Wheel chair',
  'TV',
  'Smoking ban',
  'Wifi',
  'Swimming pool',
  'Parking lot',
  'Air conditioner',
  'Bedroom',
  'Beach',
  'Buzzer/wireless intercom',
  'Horsefire',
  'Bicyle'
] as const;

export const DESCRIPTION = [
  'House',
  'Apartment',
  'Villa',
  'Condo',
  'Townhouse',
  'Cabin',
  'Bungalow',
  'Loft',
  'Studio',
  'Treehouse',
  'Boat'
]

export const VALID_PROVINCES_CODE = [
  'Lai Chau',
  'Lao Cai',
  'Ha Giang',
  'Cao Bang',
  'Son La',
  'Yen Bai',
  'Tuyen Quang',
  'Lang Son',
  'Quang Ninh',
  'Hoa Binh',
  'Ninh Binh',
  'Thanh Hoa',
  'Nghe An',
  'Ha Tinh',
  'Quang Binh',
  'Quang Tri',
  'Thua Thien Hue',
  'Da Nang',
  'Quang Nam',
  'Quang Ngai',
  'Binh Dinh',
  'Phu Yen',
  'Khanh Hoa',
  'Ninh Thuan',
  'Binh Thuan',
  'Kon Tum',
  'Gia Lai',
  'Dak Lak',
  'Lam Dong',
  'Binh Phuoc',
  'Tay Ninh',
  'Binh Duong',
  'Dong Nai',
  'Ba Ria',
  'HCMC',
  'Long An',
  'Tien Giang',
  'Ben Tre',
  'Can Tho',
  'Vinh Long',
  'Dong Thap',
  'An Giang',
  'Kien Giang',
  'Ca Mau',
  'Bac Lieu',
  'Soc Trang',
  'Tra Vinh'
] as const;

export enum RoomType {
  ROOM = 'ROOM',
  ENTIRE_HOME = 'ENTIRE_HOME',
  SHARED_ROOM = 'SHARED_ROOM'
}

export const NUMBER_VALUES = ['1', '2', '3', '4', '5+']
