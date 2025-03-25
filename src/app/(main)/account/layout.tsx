import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

const title = 'Account'
const description = 'Update your account settings.'
export const metadata: Metadata = {
  title,
  description,
}

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions>
          <Button variant='ghost' size='sm' asChild className='rounded-md'>
            <Link href='/'>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to home
            </Link>
          </Button>
          <Button size='sm' asChild className='rounded-md'>
            <Link href='/reservations'>Your reservations</Link>
          </Button>
        </PageActions>
      </PageHeader>
      <div className='container-wrapper'>
        <div className='container py-6'>
          <div className='mx-auto max-w-4xl px-4'>{children}</div>
        </div>
      </div>
    </>
  )
}

export default SettingsLayout
