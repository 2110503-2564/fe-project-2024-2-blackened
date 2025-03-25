import {
  Reservation,
  ReservationResponse,
} from '@/interfaces/reservation.interface'
import reservations from './reservations.json'
import { APIResponse, Pagination } from '@/interfaces/interface'
import { ReservationFilterParams } from '@/types/reservations-filter'

/*  currently using mockup data
 *  TODO: Implement Backend API Usage
 */

export const fetchReservations = () => {
  return new Promise<Reservation[]>(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/reservations`,
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Fetch failed')
      }

      const body = await response.json()

      resolve(body.data as Reservation[])
    } catch (error) {
      reject(
        error instanceof Error ? error : new Error('Fetch reservation failed'),
      )
    }
  })
}

export const getReservationById = (id: string) => {
  return new Promise<Reservation>((resolve, reject) => {
    setTimeout(() => {
      const reservation = reservations.find(
        (reservation) => reservation._id === id,
      )
      if (reservation) {
        resolve(reservation as Reservation)
      } else {
        reject(new Error(`Reservation with id ${id} not found`))
      }
    }, 300)
  })
}

export const fetchReservationsByUser = (
  token: string,
  filters: ReservationFilterParams = {},
) => {
  return new Promise<Reservation[]>(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/reservations?sort=${filters.sort}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Fetch failed')
      }

      const body = await response.json()
      resolve(body.data as Reservation[])
    } catch (e) {
      reject(e instanceof Error ? e : new Error('Failed to fetch'))
    }
  })
}

export const fetchReservationsBySpace = (spaceId: string) => {
  return new Promise<Reservation[]>((resolve) => {
    setTimeout(() => {
      const spaceReservations = reservations.filter(
        (reservation) => reservation.space._id === spaceId,
      )
      resolve(spaceReservations as Reservation[])
    }, 300)
  })
}

export const fetchReservationsByRoom = (roomId: string) => {
  return new Promise<Reservation[]>((resolve) => {
    setTimeout(() => {
      const roomReservations = reservations.filter(
        (reservation) => reservation.room._id === roomId,
      )
      resolve(roomReservations as Reservation[])
    }, 300)
  })
}

export const fetchReservationsWithPagination = (
  page: number = 1,
  limit: number = 8,
) => {
  return new Promise<{
    reservations: Reservation[]
    pagination: Pagination
  }>((resolve) => {
    setTimeout(() => {
      const currentPage = Math.max(1, page)
      const itemsPerPage = Math.max(1, limit)

      const startIndex = (currentPage - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage

      const totalReservations = reservations.length
      const totalPages = Math.ceil(totalReservations / itemsPerPage)

      const paginatedReservations = reservations.slice(startIndex, endIndex)

      resolve({
        reservations: paginatedReservations as Reservation[],
        pagination: {
          total: totalReservations,
          page: currentPage,
          limit: itemsPerPage,
          totalPages,
          hasNextPage: currentPage < totalPages,
          hasPrevPage: currentPage > 1,
        },
      })
    }, 300)
  })
}

export const deleteReservation = (reservation: string, token: string) => {
  return new Promise<APIResponse<null>>(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/reservations/${reservation}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to reserver')
      }

      const body = await response.json()
      resolve(body as APIResponse<null>)
    } catch (e) {
      reject(e instanceof Error ? e : 'Failed to reserve')
    }
  })
}

export const reserveRoom = (
  space: string,
  room: string,
  date: Date,
  time: string,
  token: string,
) => {
  return new Promise<APIResponse<ReservationResponse>>(
    async (resolve, reject) => {
      try {
        date = new Date(date)
        const hours = parseInt(time.substring(0, 2))
        const minutes = parseInt(time.substring(3, 5))

        date.setHours(hours)
        date.setMinutes(minutes)
        date.setSeconds(0)
        date.setMilliseconds(0)

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/spaces/${space}/reservations`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              reservationDate: date.toISOString(),
              room: room,
            }),
            cache: 'no-store',
          },
        )

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || 'Failed to reserver')
        }

        const body = await response.json()
        resolve(body as APIResponse<ReservationResponse>)
      } catch (e) {
        reject(e instanceof Error ? e : 'Failed to reserve')
      }
    },
  )
}
