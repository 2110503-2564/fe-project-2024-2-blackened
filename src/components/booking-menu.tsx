'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Space, TimeSlots } from '@/interfaces/space.interface'
import { MouseEvent, useEffect, useState } from 'react'
import { CalendarIcon, Clock, Coffee } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { getReservableTime } from '@/repo/spaces'
import { useBooking } from '@/context/booking-context'
import { Session } from 'next-auth'
import { reserveRoom } from '@/repo/reservations'
import { toast } from 'sonner'

const BookingMenu = ({
  space,
  session,
}: {
  space: Space
  session: Session | null
}) => {
  const { selectedRoom, setSelectedRoom } = useBooking()

  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState('')
  const [timeslots, setTimeslots] = useState<TimeSlots[]>([])

  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (selectedRoom && date) {
        const ts = await getReservableTime(
          space._id,
          selectedRoom?._id,
          space.opentime,
          space.closetime,
          date?.toString(),
        )
        setTimeslots(ts)
      }
    }
    fetchTimeSlots()
    return () => {
      setTimeslots([])
      setTime('')
    }
  }, [selectedRoom, date, space._id, space.opentime, space.closetime])

  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault()
    try {
      if (!selectedRoom || !date || !session?.accessToken) {
        return
      }
      const response = await reserveRoom(
        space._id,
        selectedRoom._id,
        date,
        time,
        session.accessToken,
      )
      if (!response.success) {
        toast.error('Reservation not successful')
        return
      }
      toast.success('Reserved! Enjoy')
    } catch (e) {
      if (e instanceof Error && e.message.includes('exceeded the maximum')) {
        toast.error('Exceeded the maximum number of reservations')
      } else {
        toast.error('Something went wrong!')
      }
    }
  }

  return (
    <Card id='booking-menu' className='sticky top-20 scroll-mt-20'>
      <CardHeader>
        <CardTitle className='text-xl'>Book a room in this space</CardTitle>
        <CardDescription className='text-md'>
          Select a room, date, and time to make your reservation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='mb-4'>
            <div className='font-medium mb-2'>Room</div>
            <div className='flex gap-1 items-baseline'>
              <div className='text-3xl font-bold'>
                {selectedRoom?.roomNumber || '-'}
              </div>
            </div>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='mb-4'>
            <div className='font-medium mb-2'>Price</div>
            <div className='flex gap-1 items-baseline'>
              <div className='text-3xl font-bold'>
                {selectedRoom?.price || 0} ฿
              </div>
              <div className='text-md text-muted-foreground'>/ session</div>
            </div>
          </div>
        </div>

        <div className='w-full grid grid-cols-2 gap-2'>
          <div className='col-span-2'>
            <Select
              value={selectedRoom?._id}
              onValueChange={(val) => {
                const room = space.rooms.find((room) => room._id === val)
                setSelectedRoom(room)
              }}
              required
            >
              <SelectTrigger className='w-full cursor-pointer'>
                <SelectValue
                  placeholder={
                    <div className='w-full flex items-center gap-2'>
                      <Coffee />
                      Select a room
                    </div>
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {space.rooms.map((room) => (
                  <SelectItem key={room._id} value={room._id}>
                    {room.roomNumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <div className='w-full basis-1/2'>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal cursor-pointer',
                    !date && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={date}
                onSelect={setDate}
                fromDate={new Date()}
                initialFocus
                required
              />
            </PopoverContent>
          </Popover>
          <div className='rounded-md basis-1/2'>
            <Select value={time} onValueChange={(val) => setTime(val)} required>
              <SelectTrigger
                className='w-full cursor-pointer'
                disabled={timeslots.length === 0}
              >
                <SelectValue
                  placeholder={
                    <div className='w-full flex items-center gap-2'>
                      <Clock />
                      Pick a time
                    </div>
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {timeslots.map((t) => (
                  <SelectItem
                    key={t.time}
                    value={t.time}
                    disabled={t.available}
                  >
                    {t.time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className='w-full grid grid-cols-4 lg:grid-cols-2 gap-2'>
          <Button
            variant='outline'
            className='basis-1/2 col-start-3 lg:col-start-1'
          >
            Contact Host
          </Button>
          <Button
            className='basis-1/2 cursor-pointer'
            type='submit'
            onClick={handleSubmit}
            disabled={
              !date || date.toString().trim() === '' || !selectedRoom || !time
            }
          >
            Reserve
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default BookingMenu
