'use client'

import ListReservations from '@/components/list-reservations'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Filter, Grip, List } from 'lucide-react'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

import GridReservations from './grid-reservations'
import { ReservationsClientProps } from '@/interfaces/interface'
import { ReservationFilterParams } from '@/types/reservations-filter'

const ReservationsClient = ({
  initialReservations,
  initialSort,
  session,
}: ReservationsClientProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const [layout, setLayout] = useState<'list' | 'grid'>('grid')

  const updateFilters = (filters: Partial<ReservationFilterParams>) => {
    const params = new URLSearchParams()

    if (initialSort !== 'date-desc') params.set('sort', initialSort)

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'date-desc') {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    const queryString = params.toString() ? `?${params.toString()}` : ''
    router.push(`${pathname}${queryString}`)
    router.refresh()
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col justify-end sm:flex-row gap-4'>
        <div className='flex gap-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <Button variant='outline' size='icon'>
                  <Filter className='h-4 w-4' />
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[200px]'>
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => updateFilters({ sort: 'date-desc' })}
              >
                Date Descending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateFilters({ sort: 'date-asc' })}
              >
                Date Ascending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateFilters({ sort: 'price-desc' })}
              >
                Price (High to low)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateFilters({ sort: 'price-asc' })}
              >
                Price (Low to high)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className='flex rounded-md'>
            <Button
              variant={layout === 'list' ? 'default' : 'outline'}
              size='icon'
              className='rounded-r-none'
              onClick={() => setLayout('list')}
            >
              <List className='h-4 w-4' />
            </Button>
            <Button
              variant={layout === 'grid' ? 'default' : 'outline'}
              size='icon'
              className='rounded-l-none'
              onClick={() => setLayout('grid')}
            >
              <Grip className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
      {layout === 'grid' ? (
        <GridReservations reservations={initialReservations} />
      ) : (
        <ListReservations
          reservations={initialReservations}
          session={session}
        />
      )}
    </div>
  )
}

export default ReservationsClient
