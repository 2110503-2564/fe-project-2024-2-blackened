import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

const title = 'My Reservations'
const description = 'View and manage your space reservations'
export const metadata: Metadata = {
  title,
  description,
}

const SpacesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions>
          <Button asChild size='sm' className='rounded-md'>
            <Link href='/spaces'>
              <Plus className='w-4 h-4' />
              New Reservation
            </Link>
          </Button>
        </PageActions>
      </PageHeader>
      <div className='container-wrapper'>
        <div className='container py-6'>
          <section id='reservations' className='scroll-mt-20'>
            {children}
          </section>
        </div>
      </div>
    </>
  )
}

export default SpacesLayout
