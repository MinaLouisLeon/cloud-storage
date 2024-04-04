import { SelectedFilesType } from '@/types'
import prettyBytes from 'pretty-bytes'
import React from 'react'
import { FileIcon } from 'react-file-icon'

const UploadForm = ({ filesData }: { filesData: SelectedFilesType[] | null }) => {
  console.log(filesData)
  return (
    <div>
      {filesData?.map((file) => {
        const extension: string = file.type.split("/")[1]
        return (
          <div className={`border rounded-lg flex items-center h-20 w-full gap-2 my-2 ${file.isAccepted ? "" : "border-red-500"}`}>
            <div className='w-10 h-10 ml-2'>
              <FileIcon
                extension={extension}
                labelColor="blue"
              />
            </div>
            <div className='ml-10'>
              <h2>{file.filename}</h2>
              <p>{extension} / {prettyBytes(file.size)}</p>
            </div>
            {!file.isAccepted && <h2 className=' text-red-500'>File size is more than 20MB, can't be uploaded</h2>}
          </div>
        )
      }
      )}
    </div>
  )
}

export default UploadForm