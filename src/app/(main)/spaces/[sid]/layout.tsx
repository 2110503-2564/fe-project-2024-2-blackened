import { BookingProvider } from '@/context/booking-context'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Space Details',
  description: 'View workspace information and make a reservation.',
}

export default function SpaceDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <BookingProvider>{children}</BookingProvider>
}
