import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Home } from 'lucide-react'
import Link from 'next/link'

const NotFoundPage = () => {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='flex flex-col items-center gap-8'>
        <div className='flex space-x-4 h-5 text-xl items-center'>
          <h1>404</h1>
          <Separator orientation='vertical' />
          <h1>Page not found</h1>
        </div>
        <Button asChild>
          <div className='flex gap-1'>
            <Home />
            <Link href='/'>Return Home</Link>
          </div>
        </Button>
      </div>
    </div>
  )
}

export default NotFoundPage
