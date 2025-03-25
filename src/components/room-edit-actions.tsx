import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Calendar, SquarePen, MoreHorizontal, Trash2 } from 'lucide-react'

import Link from 'next/link'

const RoomActions = ({ room_id, onEdit }: { room_id: string, onEdit:Function }) => {
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
        <div onClick={(e)=>{e.stopPropagation() ;onEdit()}}>
          <DropdownMenuItem>
            <SquarePen className='mr-2 h-4 w-4' />
            Edit Room Details
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-red-600'>
          <Trash2 className='mr-2 h-4 w-4 text-red-600' />
          Delete Room
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default RoomActions
