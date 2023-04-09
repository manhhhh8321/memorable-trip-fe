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
