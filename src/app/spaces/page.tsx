import PaginationBar from '@/components/pagination'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card'
import { SpacesPageProps } from '@/interfaces/interface'
import { fetchSpacesWithPagination } from '@/repo/spaces'
import { Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const ITEMS_PER_PAGE = 6

const SpacesPage = async ({ searchParams }: SpacesPageProps) => {
  const currentPage = searchParams?.page ? parseInt(searchParams.page) : 1
  const { spaces, pagination } = await fetchSpacesWithPagination(
    currentPage,
    ITEMS_PER_PAGE,
  )

  return (
    <div className='flex flex-col gap-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:grid-rows-2'>
        {spaces &&
          spaces.map((space) => (
            <Card
              key={space._id}
              className='w-full rounded-lg overflow-hidden shadow-md pt-0 h-[400px]'
            >
              <div className='relative bg-muted block'>
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src='https://placehold.co/600x400.png'
                    alt='Card Image'
                    fill
                    className='rounded-t-md object-cover'
                  />
                </AspectRatio>
              </div>
              <CardContent className='space-y-4'>
                <div>
                  <CardTitle className='text-xl font-bold truncate'>
                    {space.name}
                  </CardTitle>
                  <CardDescription className='text-muted-foreground'>
                    {`${space.address}, ${space.district}, ${space.province}`}
                  </CardDescription>
                </div>
              </CardContent>
              <CardFooter className='mt-auto'>
                <div className='flex justify-between items-center w-full'>
                  <div className='text-gray-500 text-sm flex gap-1 items-center'>
                    <Clock className='w-4 h-4' />
                    {`${space.opentime.slice(0, 2)}:${space.opentime.slice(2)} - ${space.closetime.slice(0, 2)}:${space.closetime.slice(2)}`}
                  </div>
                  <Button size='sm'>
                    <Link href={`/spaces/${space._id}`}>Details</Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>

      {pagination.totalPages > 1 && (
        <PaginationBar currentPage={currentPage} pagination={pagination} />
      )}
    </div>
  )
}

export default SpacesPage
