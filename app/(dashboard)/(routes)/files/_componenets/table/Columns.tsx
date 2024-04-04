"use client"
import { FileType } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import prettyBytes from "pretty-bytes"
import {FileIcon,defaultStyles} from "react-file-icon";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<FileType>[] = [
    {
        accessorKey:"type",
        header: "Type",
        cell: ({ renderValue, ...props }) => {
            const type = renderValue() as string;
            const extention: string = type.split("/")[1];
            return(
                <div className="w-10">
                    <FileIcon 
                        extension={extention}
                        labelColor="blue"
                        // @ts-ignore
                        {...defaultStyles[extention]}
                    />
                </div>
            )
        }
    },
    {
        accessorKey: "filename",
        header: "File Name",
    },
    {
        accessorKey: "timestamp",
        header: "Added Date",
        cell: ({ renderValue, ...props }) => {
            return (
                <div className="flex flex-col">
                    <div className="text-sm">
                        {(renderValue() as Date).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                        {(renderValue() as Date).toLocaleTimeString()}
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "size",
        header: "Size",
        cell: ({ renderValue, ...props }) => {
            return <span>{prettyBytes(renderValue() as number)}</span>
        }
    },
    {
        accessorKey: "downloadUrl",
        header: "Download Link",
        cell: ({ renderValue, ...props }) => {
            return <a href={renderValue() as string} target="_blank" rel="noreferrer" className="underline text-blue-500 hover:text-blue-700">Download</a>
        }
    }
]
