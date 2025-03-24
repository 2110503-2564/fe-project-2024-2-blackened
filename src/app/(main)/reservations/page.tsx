import { Suspense } from 'react'
import ReservationsClient from '@/components/reservations'
import ReservationsSkeleton from '@/components/reservations-skeleton'

import { fetchReservationsByUser } from '@/repo/reservations'
import { ReservationFilterParams } from '@/types/reservations-filter'

const ReservationsPage = async ({
  searchParams,
}: {
  searchParams: ReservationFilterParams
}) => {
  const sort = searchParams.sort || 'date-desc'

  const reservations = await fetchReservationsByUser('001', {
    sort,
  })

  return (
    <Suspense fallback={<ReservationsSkeleton />}>
      <ReservationsClient
        initialReservations={reservations}
        initialSort={sort}
      />
    </Suspense>
  )
}

export default ReservationsPage
