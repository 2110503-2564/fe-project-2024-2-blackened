import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, CheckCircle, BookOpen } from 'lucide-react'

const UserSection = () => {
  return (
    <section className='w-full max-w-5xl px-4 mt-16 text-center'>
      <h2 className='text-3xl font-bold text-gray-800'>
        Why Users Love Spaceflow
      </h2>
      <p className='text-lg text-gray-600 mt-2'>
        Discover why professionals and teams trust us for their workspace needs.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
        {/* Feature 1 */}
        <Card className='shadow-md'>
          <CardHeader className='flex items-center justify-center'>
            <BookOpen className='w-12 h-12 text-gray-700' />
          </CardHeader>
          <CardContent>
            <h3 className='font-semibold'>Easy Booking</h3>
            <p className='text-sm text-gray-600'>
              Reserve a workspace in just a few clicks.
            </p>
          </CardContent>
        </Card>

        {/* Feature 2 */}
        <Card className='shadow-md'>
          <CardHeader className='flex items-center justify-center'>
            <User className='w-12 h-12 text-gray-700' />
          </CardHeader>
          <CardContent>
            <h3 className='font-semibold'>User-Friendly</h3>
            <p className='text-sm text-gray-600'>
              A simple and intuitive interface for everyone.
            </p>
          </CardContent>
        </Card>

        {/* Feature 3 */}
        <Card className='shadow-md'>
          <CardHeader className='flex items-center justify-center'>
            <CheckCircle className='w-12 h-12 text-gray-700' />
          </CardHeader>
          <CardContent>
            <h3 className='font-semibold'>Verified Spaces</h3>
            <p className='text-sm text-gray-600'>
              Only high-quality, verified workspaces available.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default UserSection
