import { Suspense } from 'react'
import ReservationsClient from '@/components/reservations'
import ReservationsSkeleton from '@/components/reservations-skeleton'

import { fetchReservationsByUser } from '@/repo/reservations'
import { ReservationFilterParams } from '@/types/reservations-filter'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'

const ReservationsPage = async ({
  searchParams,
}: {
  searchParams: ReservationFilterParams
}) => {
  const sort = searchParams.sort || 'date-asc'
  const session = await getServerSession(authOptions)

  const reservations = await fetchReservationsByUser(
    session?.accessToken || '',
    {
      sort,
    },
  )

  return (
    <Suspense fallback={<ReservationsSkeleton />}>
      <ReservationsClient
        initialReservations={reservations}
        initialSort={sort}
        session={session}
      />
    </Suspense>
  )
}

export default ReservationsPage
