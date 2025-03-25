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
import { Calendar, Eye, MoreHorizontal, X } from 'lucide-react'
import { useSession } from 'next-auth/react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'
import { toast } from 'sonner'

const ReservationActions = ({
  space_id,
  reservation_id,
}: {
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

        <DropdownMenuItem>
          <Calendar className='mr-2 h-4 w-4' />
          Reschedule
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-red-600' onClick={handleDelete}>
          <X className='mr-2 h-4 w-4 text-red-600' />
          Cancel Reservation
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ReservationActions
