import spaces from './spaces.json'
import {
  Space,
  SpacesPagination,
  TimeSlots,
} from '@/interfaces/space.interface'
import { APIResponse, Pagination } from '@/interfaces/interface'

/*  currently using mockup data
 *  TODO: Implement Backend API Usage
 */

export const fetchSpaces = (page: number = 1, limit: number = 6) => {
  return new Promise<SpacesPagination>(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/spaces?page=${page}&limit=${limit}`,
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Fetch spaces failed')
      }

      const body = await response.json()
      resolve(body.data as SpacesPagination)
    } catch (error) {
      reject(error instanceof Error ? error : new Error('Fetch spaces failed'))
    }
  })
}

export const getSpaceById = (id: string) => {
  return new Promise<Space>(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/spaces/${id}`,
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Fetch failed')
      }

      const body = await response.json()

      resolve(body.data as Space)
    } catch (error) {
      reject(error instanceof Error ? error : new Error('Update failed'))
    }
  })
}

export const searchSpaces = (
  query: string,
  page: number = 1,
  limit: number = 10,
) => {
  return new Promise<{
    spaces: Space[]
    pagination: Pagination
  }>((resolve) => {
    setTimeout(() => {
      const searchTerm = query.toLowerCase().trim()

      const filteredSpaces = spaces.filter(
        (space) =>
          space.name.toLowerCase().includes(searchTerm) ||
          space.district.toLowerCase().includes(searchTerm) ||
          space.province.toLowerCase().includes(searchTerm),
      )

      const currentPage = Math.max(1, page)
      const itemsPerPage = Math.max(1, limit)

      const startIndex = (currentPage - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage

      const totalSpaces = filteredSpaces.length
      const totalPages = Math.ceil(totalSpaces / itemsPerPage)

      const paginatedSpaces = filteredSpaces.slice(startIndex, endIndex)

      resolve({
        spaces: paginatedSpaces as Space[],
        pagination: {
          total: totalSpaces,
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

export const getReservableTime = (
  spaceId: string,
  roomId: string,
  opentime: string,
  closetime: string,
  date: string,
) => {
  return new Promise<{ time: string; available: boolean }[]>(
    async (resolve, reject) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/spaces/${spaceId}/rooms/${roomId}/reservations`,
        )

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || 'Failed to fetch time slots')
        }

        const body = await response.json()
        const timeslots = body.data as string[]

        const filteredTimeslots = timeslots.filter((dateString) => {
          const timeSlotDate = new Date(dateString)
          const requestedDate = new Date(date)

          return (
            timeSlotDate.getFullYear() === requestedDate.getFullYear() &&
            timeSlotDate.getMonth() === requestedDate.getMonth() &&
            timeSlotDate.getDate() === requestedDate.getDate()
          )
        })

        const formattedTimeSlots = filteredTimeslots.map((dateString) => {
          const _date = new Date(dateString)
          const hours = _date.getHours().toString().padStart(2, '0')
          const minutes = _date.getMinutes().toString().padStart(2, '0')
          return `${hours}:${minutes}`
        })

        const openHour = parseInt(opentime.substring(0, 2))
        const openMinute = parseInt(opentime.substring(2, 4))
        const closeHour = parseInt(closetime.substring(0, 2))
        const closeMinute = parseInt(closetime.substring(2, 4))

        let currentHour = openHour
        let currentMinute = openMinute

        const timeSlots = []

        while (
          currentHour < closeHour ||
          (currentHour === closeHour && currentMinute < closeMinute)
        ) {
          const time = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`
          const available = formattedTimeSlots.includes(time)
          timeSlots.push({ time, available })
          currentHour += 1
          if (currentHour !== openHour) {
            currentMinute = 0
          }
        }

        resolve(timeSlots as TimeSlots[])

        return
      } catch (e) {
        reject(e instanceof Error ? e : new Error('Failed to fetch time slots'))
      }
    },
  )
}
