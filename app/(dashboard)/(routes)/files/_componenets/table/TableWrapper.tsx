"use client";
import { FileType } from '@/types'
import { DataTable } from './Table'
import { columns } from './Columns'
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { query, collection, orderBy } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from '@/components/ui/button';
const TableWrapper = ({ skeletonFiles }: { skeletonFiles: FileType[] }) => {
    const { user } = useUser();
    // const [initialfiles, setInitialFiles] = useState<FileType[]>([]);
    // const [sort, setSort] = useState<"asc" | "desc">("desc");
    // const [docs, loading, error] = useCollection(
    //     user && query(
    //         collection(db, "users", user.id, "files"),
    //         orderBy("timestamp", sort)
    //     )
    // );
    // console.log(docs)
    // useEffect(() => {
    //     if (!docs) return;
    //     const files: FileType[] = docs.docs.map((doc) => ({
    //         id: doc.id,
    //         filename: doc.data().filename || doc.id,
    //         timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    //         fullName: doc.data().fullName,
    //         downloadUrl: doc.data().downloadUrl,
    //         type: doc.data().type,
    //         size: doc.data().size
    //     }));
    //     console.log("from table",files)
    //     setInitialFiles(files);
    // }, [docs])
    if (skeletonFiles.length === undefined) return (
        <div className='flex flex-col'>
            <Button variant={'outline'} className='ml-auto w-36 h-10 mb-5' >
                <Skeleton className='h-5 w-full' />
            </Button>
            <div className='border rounded-lg'>
                <div className='border-b h-12 ' />
                {skeletonFiles.map((file) => (
                    <div
                        key={file.id}
                        className='flex items-center space-x-4 p-5 w-full'
                    >
                        <Skeleton className='h-12 w-12' />
                        <Skeleton className='h-12 w-full' />
                    </div>
                ))}
                {skeletonFiles.length === 0 && (
                    <div
                        className='flex items-center space-x-4 p-5 w-full'
                    >
                        <Skeleton className='h-12 w-12' />
                        <Skeleton className='h-12 w-full' />
                    </div>
                )}
            </div>
        </div>
    );
    return (
        <div className='flex flex-col space-y-5 pb-10'>
            {/* <Button className='ml-auto w-fit' variant={'outline'} onClick={() => setSort(sort === "desc" ? "asc" : "desc")} >Sort By {sort === "desc" ? "Newest" : "Oldest"} </Button> */}
            <DataTable columns={columns} data={skeletonFiles} />
        </div>
    )
}

export default TableWrapper