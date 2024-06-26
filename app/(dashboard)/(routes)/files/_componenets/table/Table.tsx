"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { PencilIcon, Share2Icon, TrashIcon } from "lucide-react"
import { FileType } from "@/types"
import { useAppStore } from "@/store/store"
import { DeleteModal } from "../DeleteModal"
import { RenameModal } from "../RenameModal"
import { Button } from "@/components/ui/button"
import { ShareModal } from "../ShareModal"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const [
    setFileID,
    setFilename,
    setDownloadUrl,
    setType,
    setIsRenameModalOpen,
    setIsDeleteModalOpen,
    setIsShareModalOpen
  ] = useAppStore(state => [
    state.setFileID,
    state.setFilename,
    state.setDownloadUrl,
    state.setType,
    state.setIsRenameModalOpen,
    state.setIsDeleteModalOpen,
    state.setIsShareModalOpen
  ]);


  const openDeletModal = (fileID: string) => {
    setFileID(fileID);
    setIsDeleteModalOpen(true);
  }
  const openRenameModal = (fileID: string, filename: string) => {
    setFileID(fileID);
    setFilename(filename);
    setIsRenameModalOpen(true);
  }
  const openShareModal = (fileID: string,filename:string ,downloadUrl: string,type:string) => {
    setFileID(fileID);
    setFilename(filename)
    setDownloadUrl(downloadUrl);
    setType(type);
    setIsShareModalOpen(true);
  }
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                <DeleteModal />
                <RenameModal />
                <ShareModal />
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.column.id === "filename" ? <p onClick={() => openRenameModal(
                      (row.original as FileType).id,
                      (row.original as FileType).filename
                    )} className="underline flex items-center text-blue-500 hover:cursor-pointer">
                      {cell.getValue() as string}{" "}
                      <PencilIcon size={15} className="ml-2" />
                    </p> : <>{flexRender(cell.column.columnDef.cell, cell.getContext())}</>}
                  </TableCell>
                ))}
                <TableCell key={(row.original as FileType).id}>
                  <Button variant={'outline'} className="mr-2" onClick={() =>
                    openShareModal(
                      (row.original as FileType).id,
                      (row.original as FileType).filename,
                      (row.original as FileType).downloadUrl,
                      (row.original as FileType).type.split('/')[1])
                    }>
                    <Share2Icon size={20} />
                  </Button>
                  <Button variant={'outline'} onClick={() => openDeletModal((row.original as FileType).id)}>
                    <TrashIcon size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                You have no files.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
