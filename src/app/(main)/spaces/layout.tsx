import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import Link from 'next/link'

const title = 'Finding your spaces'
const description =
  'Browse professional workspaces, meeting rooms, and collaborative environments.'
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
            <Link href='#spaces'>Start Browsing</Link>
          </Button>
          <Button asChild size='sm' variant='ghost' className='rounded-md'>
            <Link href='/reservations'>Your reservations</Link>
          </Button>
        </PageActions>
      </PageHeader>
      <div className='container-wrapper'>
        <div className='container py-6'>
          <section id='spaces' className='scroll-mt-20'>
            {children}
          </section>
        </div>
      </div>
    </>
  )
}

export default SpacesLayout
