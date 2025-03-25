'use client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { deleteReservation } from '@/repo/reservations'
import {
  Calendar,
  CalendarIcon,
  Clock,
  Eye,
  MoreHorizontal,
  X,
} from 'lucide-react'
import { useSession } from 'next-auth/react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Space } from '@/interfaces/space.interface'
import { Reservation } from '@/interfaces/reservation.interface'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { cn } from '@/lib/utils'
import { Calendar as CalendarModal } from '@/components/ui/calendar'
const ReservationActions = ({
  reservation,
  space,
  space_id,
  reservation_id,
}: {
  reservation: Reservation
  space: Partial<Space>
  space_id: string
  reservation_id: string
}) => {
  const { data: session } = useSession()
  const router = useRouter()

  const handleDelete = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!session?.accessToken) return

    try {
      const response = await deleteReservation(
        reservation_id,
        session.accessToken,
      )

      if (!response.success) {
        toast.error(response.message || 'Failed to cancel reservation')
        return
      }
      toast.success('Reservation cancelled')
      router.refresh()
    } catch (e) {
      toast.error('Something wrong!')
      console.log(e)
    }
  }

  const handleUpdate = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='h-full'>
            <Button variant='ghost' size='icon'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <Link href={`/spaces/${space_id}`}>
            <DropdownMenuItem>
              <Eye className='mr-2 h-4 w-4' />
              View Space Details
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem asChild>
            <DialogTrigger className='w-full'>
              <>
                <Calendar className='mr-2 h-4 w-4' />
                Reschedule
              </>
            </DialogTrigger>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem className='text-red-600' onClick={handleDelete}>
            <X className='mr-2 h-4 w-4 text-red-600' />
            Cancel Reservation
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit reservation</DialogTitle>
          <DialogDescription>Edit your reservation details</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Room
            </Label>
            <Input
              id='room'
              defaultValue={reservation.room.roomNumber}
              className='col-span-3'
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <div className='w-full basis-1/2'>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal cursor-pointer',
                  )}
                >
                  <CalendarIcon />
                  {<span>Pick a date</span>}
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <CalendarModal
                mode='single'
                fromDate={new Date()}
                initialFocus
                required
              />
            </PopoverContent>
          </Popover>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              Time
            </Label>
            <Select required>
              <SelectTrigger className='col-span-3 w-full cursor-pointer'>
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
                {Array.from({ length: 25 }, (_, i) => {
                  const hour = i.toString().padStart(2, '0')
                  const t = `${hour}:00`
                  return (
                    <SelectItem
                      key={t}
                      value={t}
                      // disabled={t}
                    >
                      {t}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Update reservation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ReservationActions
