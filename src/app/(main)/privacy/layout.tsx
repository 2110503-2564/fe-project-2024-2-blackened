import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import Link from 'next/link'

const title = 'Privacy Policy'
const description =
  'Learn how we collect, use, and protect your personal information in our privacy policy. Your privacy is important to us.'

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
            <Link href='#terms'>Start Reading</Link>
          </Button>
          <Button asChild size='sm' variant='ghost' className='rounded-md'>
            <Link href='/terms'>Terms of Service</Link>
          </Button>
        </PageActions>
      </PageHeader>
      <div className='container-wrapper'>
        <div className='container py-6'>
          <section id='terms' className='scroll-mt-20'>
            {children}
          </section>
        </div>
      </div>
    </>
  )
}

export default SpacesLayout
