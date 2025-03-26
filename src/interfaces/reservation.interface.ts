import { Room } from './space.interface'

export interface Reservation {
  _id: string
  reservationDate: string
  user: {
    name: string
    _id: string
  }
  room: Room
  space: {
    _id: string
    name: string
    tel: string
    image: string
  }
}

export interface ReservationResponse {
  reservationDate: string
  user: string
  room: string
  space: string
  _id: string
  createdAt: string
  __v: number
}
