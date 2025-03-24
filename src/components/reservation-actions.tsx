import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Calendar, Eye, MoreHorizontal, X } from 'lucide-react'

import Link from 'next/link'

const ReservationActions = ({ space_id }: { space_id: string }) => {
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
        <DropdownMenuItem className='text-red-600'>
          <X className='mr-2 h-4 w-4 text-red-600' />
          Cancel Reservation
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ReservationActions
