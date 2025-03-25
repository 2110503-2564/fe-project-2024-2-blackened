import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import ReservationActions from '@/components/reservation-actions'

import Link from 'next/link'
import { format } from 'date-fns'
import { Reservation } from '@/interfaces/reservation.interface'
import { Session } from 'next-auth'

const ListReservations = ({
  reservations,
  session,
}: {
  reservations: Reservation[]
  session: Session | null
}) => {
  return (
    <div className='border rounded-md'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[175px]'>Space & Room</TableHead>
            {session?.user.role === 'admin' && <TableHead>User</TableHead>}
            <TableHead className='w-[200px] hidden md:table-cell'>
              Date
            </TableHead>
            <TableHead className='w-[200px] hidden md:table-cell'>
              Time
            </TableHead>
            <TableHead className='hidden md:table-cell'>Price</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className='h-24 text-center'>
                No reservations found.
              </TableCell>
            </TableRow>
          ) : (
            reservations.map((reservation) => (
              <TableRow key={reservation._id}>
                <TableCell className='w-1/5'>
                  <Link href={`/spaces/${reservation.space._id}`}>
                    <div className='flex flex-col'>
                      <span className='font-medium'>
                        {reservation.space.name}
                      </span>
                      <span className='text-sm text-muted-foreground'>
                        Room {reservation.room.roomNumber}
                      </span>
                    </div>
                  </Link>
                </TableCell>
                {session?.user.role === 'admin' && (
                  <TableCell>{reservation.user.name}</TableCell>
                )}
                <TableCell className='hidden md:table-cell'>
                  {format(reservation.reservationDate, 'MMM d, yyyy')}
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  {format(reservation.reservationDate, 'HH:mm')}
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  {reservation.room.price} ฿
                </TableCell>
                <TableCell className='text-right'>
                  <ReservationActions
                    reservation={reservation}
                    space={reservation.space}
                    space_id={reservation.space._id}
                    reservation_id={reservation._id}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default ListReservations
