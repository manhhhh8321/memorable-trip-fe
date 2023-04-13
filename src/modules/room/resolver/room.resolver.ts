import { AMENITIES, RoomDto, RoomType, VALID_PROVINCES_CODE } from '../interface/room.interface'
import z from 'zod'

const roomSchema = z.object({
  roomName: z.string(),
  price: z.number(),
  numberOfLivingRoom: z.enum(['1', '2', '3', '4', '5+']),
  numberOfBedroom: z.enum(['1', '2', '3', '4', '5+']),
  numberOfBed: z.enum(['1', '2', '3', '4', '5+']),
  numberOfBathroom: z.enum(['1', '2', '3', '4', '5+']),
  roomType: z.enum([RoomType.ENTIRE_HOME, RoomType.ROOM, RoomType.SHARED_ROOM]),
  about: z.string(),
  description: z.string(),
  city: z.enum(VALID_PROVINCES_CODE),
  amenities: z.array(z.enum(AMENITIES)),
  image: z.array(z.string()),
  address: z.string()
})

export default roomSchema
