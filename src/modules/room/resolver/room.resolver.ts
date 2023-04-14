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

export default roomSchema
