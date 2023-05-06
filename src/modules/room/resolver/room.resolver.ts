import { AMENITIES, RoomDto, RoomType, VALID_PROVINCES_CODE } from '../interface/room.interface'
import z from 'zod'

const roomSchema = z.object({
  roomName: z.string(),
  price: z.number(),
  numberOfLivingRoom: z.number(),
  numberOfBedroom: z.number(),
  numberOfBed: z.number(),
  numberOfBathroom: z.number(),
  roomType: z.enum([RoomType.ENTIRE_HOME, RoomType.ROOM, RoomType.SHARED_ROOM]),
  about: z.string(),
  description: z.string(),
  city: z.enum(VALID_PROVINCES_CODE),
  amenities: z.array(z.enum(AMENITIES)),
  image: z.any(),
  address: z.string()
})

export const filterRoomSchema = z.object({
  price: z.optional(z.number()),
  numberOfLivingRoom: z.optional(z.number()),
  numberOfBedroom: z.optional(z.number()),
  numberOfBed: z.optional(z.number()),
  numberOfBathroom: z.optional(z.number()),
  roomType: z.optional(z.any()),
  description: z.optional(z.any()),
  city: z.optional(z.any()),
  amenities: z.optional(z.array(z.enum(AMENITIES))),
  checkIn: z.optional(z.date()),
  checkOut: z.optional(z.date()),
})

const editRoomSchema = z.object({
  roomName: z.optional(z.string()),
  price: z.optional(z.number()),
  numberOfLivingRoom: z.optional(z.number()),
  numberOfBedroom: z.optional(z.number()),
  numberOfBed: z.optional(z.number()),
  numberOfBathroom: z.optional(z.number()),
  roomType: z.optional(z.enum([RoomType.ENTIRE_HOME, RoomType.ROOM, RoomType.SHARED_ROOM])),
  about: z.optional(z.string()),
  description: z.optional(z.string()),
  city: z.optional(z.enum(VALID_PROVINCES_CODE)),
  amenities: z.optional(z.array(z.enum(AMENITIES))),
  image: z.optional(z.any()),
  address: z.optional(z.string()),
  isActive: z.optional(z.any()),
})

export default roomSchema
export { editRoomSchema }
