"use client";
import { useState } from 'react'
import Dropzone from 'react-dropzone';
import { cn } from '@/lib/utils';
import { SelectedFilesType } from '@/types';
import UploadForm from './UploadForm';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import toast from 'react-hot-toast';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useRouter } from 'next/navigation';
const maxSize = 20971520;
const DropZoneComp = () => {
    const {user} = useUser();
    const router = useRouter();
    const [selectedFiles,setSelectedFiles] = useState<SelectedFilesType[] | null>(null);
    const [isFileSelected,setIsFileSelected] = useState<boolean>(false);
    const [readyToUpload,setReadyToUpload] = useState<boolean>(false);
    const [acceptedFiles,setAcceptedFiles] = useState<File[]>([]);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const onDrop = async (files:File[]) => {
        let tempFilesArr:SelectedFilesType[] = [];
        let tempAcceptedFiles:File[] = [];
        let readyToUploadFlag = false;;
        if(files){
            await files.forEach((file) => {
                tempFilesArr.push({
                    filename:file.name,
                    type: file.type,
                    size: file.size,
                    isAccepted: file.size <= maxSize ? true : false
                })
                if(file.size > maxSize){
                    readyToUploadFlag = false
                }else{
                    readyToUploadFlag = true
                    tempAcceptedFiles.push(file);
                }
            })
            setSelectedFiles(tempFilesArr);
            setIsFileSelected(true);
            setReadyToUpload(readyToUploadFlag);
            setAcceptedFiles(tempAcceptedFiles);
        }
    }
    const prepareToUpload = () => {
        acceptedFiles?.forEach((file) => {
            const reader = new FileReader();
            reader.onload = async () => {
                await uploadPost(file);
            }
            reader.readAsArrayBuffer(file);
        })
        router.push('/files');
    }
    const uploadPost = async (file:File) => {
        if(isLoading) return;
        if(!user) return;
        setIsLoading(true);
        const toastId = toast.loading('Uploading...');
        try {
            const docRef = await addDoc(collection(db,"users",user.id,"files"),{
                
                userId: user.id,
                filename: file.name,
                fullName: user.fullName,
                profileImg: user.imageUrl,
                timestamp: serverTimestamp(),
                type: file.type,
                size: file.size,
                password: ""
            })
            const imageRef = ref(storage,`users/${user.id}/files/${docRef.id}`);
            uploadBytes(imageRef,file).then(async(snapshot)=>{
                const downloadUrl = await getDownloadURL(imageRef);
                await updateDoc(doc(db,"users",user.id,"files",docRef.id),{downloadUrl:downloadUrl})
            });
            toast.success('Uploaded', { id: toastId });
        } catch (err) {
            toast.error('Something went wrong', { id: toastId });
        }
        setIsLoading(false);
    }
    return (
        <div>
            {isFileSelected ? (
                <UploadForm filesData={selectedFiles}/>
                // TODO: add table for file preview before upload 
                
            ) : (
                <Dropzone minSize={0} maxSize={maxSize} onDrop={files => onDrop(files)}>
                    {({ getRootProps, getInputProps, isDragActive, isDragReject, fileRejections }) => {
                        // TODO:loop in file rejection to show rejected files
                        const isFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
                        return (
                            <section className='m-5 lg:m-10'>
                                <div className={cn("w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center cursor-pointer container",
                                    isDragActive ? 'bg-[#835ffe] text-white animate-pulse' : 'bg-slate-100/50 dark:bg-slate-800/80 text-slate-400'
                                )}>
                                    <div
                                        // TODO:add styling for drag and drop
                                        {...getRootProps({ onDrop: event => event.stopPropagation() })}
                                    >
                                        <input {...getInputProps()} />
                                        {!isDragActive && "Click here or drop files to upload"}
                                        {isDragActive && !isDragReject && "Drag and drop some files here, or click to select files"}
                                        {isDragReject && "File type not supported"}
                                        {isFileTooLarge && (<p className='test-danger mt-2'>File is too large</p>)}
                                    </div>
                                </div>
                            </section>
                        )
                    }}
                </Dropzone>
            )}
            <Button className='p-2 w-[30%] mt-5' disabled={!readyToUpload} onClick={() => prepareToUpload()}>Upload</Button>
        </div>
    )
}

export default DropZoneComp