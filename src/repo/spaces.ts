import {
  Room,
  Space,
  SpacesPagination,
  TimeSlots,
} from '@/interfaces/space.interface'

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

export const addRoom = (
  space_id: string,
  room: Partial<Room>,
  token: string,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/spaces/${space_id}/rooms`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(room),
        },
      )
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to add a room')
      }

      resolve({})
    } catch (e) {
      reject(e instanceof Error ? e : new Error('Failed to add a room'))
    }
  })
}
