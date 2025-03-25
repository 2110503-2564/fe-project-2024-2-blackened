import { Pagination } from './interface'

export interface Room {
  _id: string
  image: string
  roomNumber: string
  capacity: number
  price: number
  facilities: string[]
}

export interface Space {
  _id: string
  name: string
  address: string
  district: string
  image: string
  province: string
  postalcode: string
  tel: string
  opentime: string
  closetime: string
  rooms: Room[]
}

export interface TimeSlots {
  time: string
  available: boolean
}

export interface SpacesPagination {
  spaces: Space[]
  pagination: Pagination
}
