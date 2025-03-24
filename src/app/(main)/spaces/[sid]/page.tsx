import SpaceDetailClient from '@/components/space-detail'
import { getSpaceById } from '@/repo/spaces'

const SpacePage = async ({ params }: { params: { sid: string } }) => {
  let space
  try {
    space = await getSpaceById(params.sid)
  } catch (_) {
    return (
      <div className='container py-24 text-center text-lg font-semibold'>
        Space not found
      </div>
    )
  }

  return <SpaceDetailClient space={space} />
}

export default SpacePage
