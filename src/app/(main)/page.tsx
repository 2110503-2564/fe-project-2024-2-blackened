import { Card, CardContent } from '@/components/ui/card'
import { CardHeader } from '@/components/ui/card'
import { CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShieldCheck } from 'lucide-react'
import { Handshake } from 'lucide-react'
import { CalendarDays } from 'lucide-react'
import UserHomePageSection from '@/components/UserHomePageSection'

const Home = () => {
  return (
    <main>
      <div className='flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center w-full py-2 text-center bg-gray min-h-[80vh] bg-gray-50'>
          <div className='text-4xl font-bold md:text-5xl'>
            Find your Perfect Spaces
          </div>
          <div className='mt-3 text-lg opacity-90'>
            Book a room for meetings, study, or coworking—anytime, anywhere.
          </div>
        </div>

        <section className='text-center py-10 border-t border-b mt-10'>
          <div className='text-3xl font-bold'>DESIGNED FOR MODERN WORKERS</div>
          <p className='text-lg text-gray-600 mt-2'>
            Flexible spaces for productivity and collaboration.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-10'>
            <div className='flex flex-col items-center'>
              <span className='text-4xl'>
                <ShieldCheck />
              </span>
              <h3 className='font-semibold mt-2'>
                100% Satisfaction Guarantee
              </h3>
              <p className='text-gray-600 text-sm'>
                Full refund if you`&apos;`re not satisfied.
              </p>
            </div>
            <div className='flex flex-col items-center'>
              <span className='text-4xl'>
                <Handshake />
              </span>
              <h3 className='font-semibold mt-2'>Trusted Coworking Spaces</h3>
              <p className='text-gray-600 text-sm'>
                Real user reviews, real experiences.
              </p>
            </div>
            <div className='flex flex-col items-center'>
              <span className='text-4xl'>
                <CalendarDays />
              </span>
              <h3 className='font-semibold mt-2'>Peace of Mind</h3>
              <p className='text-gray-600 text-sm'>
                Once booked, your seat is secured.
              </p>
            </div>
          </div>
        </section>

        <section className='w-full max-w-5xl px-4 mt-2 mb-10' id='featured'>
          <UserHomePageSection></UserHomePageSection>
        </section>
      </div>
    </main>
  )
}

export default Home
