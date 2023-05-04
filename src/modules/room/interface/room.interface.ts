export interface Room {
  id: string
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
  roomId: string
  note?: string
  paymentType?: PaymentType
  checkIn: string
  checkOut: string
  duration?: string
  totalPrice?: number | null | undefined
  totalDiscount?: number | null | undefined
}

export enum PaymentType {
  CASH = 'CASH',
  CARD = 'CARD'
}

export interface RoomDto {
  roomName: string
  price: number
  numberOfLivingRoom: number
  numberOfBedroom: number
  numberOfBed: number
  numberOfBathroom: number
  roomType: string
  about: string
  description: string
  city: string
  amenities: string[]
  image: string[]
  address: string
  checkIn: Date
  checkOut: Date
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
] as const

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
] as const

export enum RoomType {
  ROOM = 'ROOM',
  ENTIRE_HOME = 'ENTIRE_HOME',
  SHARED_ROOM = 'SHARED_ROOM'
}

export const NUMBER_VALUES = ['1', '2', '3', '4', '5+']

export const PROVINCES = [
  { code: '01', name: 'Lai Chau' },
  { code: '02', name: 'Lao Cai' },
  { code: '03', name: 'Ha Giang' },
  { code: '04', name: 'Cao Bang' },
  { code: '05', name: 'Son La' },
  { code: '06', name: 'Yen Bai' },
  { code: '07', name: 'Tuyen Quang' },
  { code: '09', name: 'Lang Son' },
  { code: '10', name: 'Quang Ninh' },
  { code: '11', name: 'Hoa Binh' },
  { code: '12', name: 'Ninh Binh' },
  { code: '14', name: 'Thanh Hoa' },
  { code: '15', name: 'Nghe An' },
  { code: '16', name: 'Ha Tinh' },
  { code: '17', name: 'Quang Binh' },
  { code: '18', name: 'Quang Tri' },
  { code: '19', name: 'Thua Thien Hue' },
  { code: '20', name: 'Da Nang' },
  { code: '21', name: 'Quang Nam' },
  { code: '22', name: 'Quang Ngai' },
  { code: '23', name: 'Binh Dinh' },
  { code: '24', name: 'Phu Yen' },
  { code: '25', name: 'Khanh Hoa' },
  { code: '26', name: 'Ninh Thuan' },
  { code: '27', name: 'Binh Thuan' },
  { code: '28', name: 'Kon Tum' },
  { code: '29', name: 'Gia Lai' },
  { code: '30', name: 'Dak Lak' },
  { code: '31', name: 'Lam Dong' },
  { code: '32', name: 'Binh Phuoc' },
  { code: '33', name: 'Tay Ninh' },
  { code: '34', name: 'Binh Duong' },
  { code: '35', name: 'Dong Nai' },
  { code: '36', name: 'Ba Ria - Vung Tau' },
  { code: '37', name: 'HCMC' },
  { code: '39', name: 'Long An' },
  { code: '40', name: 'Tien Giang' },
  { code: '41', name: 'Ben Tre' },
  { code: '42', name: 'Can Tho' },
  { code: '43', name: 'Vinh Long' },
  { code: '44', name: 'Dong Thap' },
  { code: '45', name: 'An Giang' },
  { code: '46', name: 'Kien Giang' },
  { code: '47', name: 'Ca Mau' },
  { code: '48', name: 'Bac Lieu' },
  { code: '49', name: 'Soc Trang' },
  { code: '50', name: 'Tra Vinh' }
]
