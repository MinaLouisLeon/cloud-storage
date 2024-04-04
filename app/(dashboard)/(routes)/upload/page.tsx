import { Button } from '@/components/ui/button'
import DropZoneComp from './_components/DropZoneComp';

const Upload = () => {
  return (
    <div className='p-5 px-8 md:px-28 text-center'>
      <h2 className='text-[20px] text-center m-5'>Start{" "}
        <strong className='text-primary'>Uploading</strong>{" "}
        File and {" "}
        <strong className='text-primary'>Share</strong>{" "}
        it.
      </h2>
      <DropZoneComp />
    </div>
  )
}

export default Upload