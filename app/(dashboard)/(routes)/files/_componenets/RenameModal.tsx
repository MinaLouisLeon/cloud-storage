"use client";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Dialog, DialogFooter, DialogHeader, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export const RenameModal = () => {
    const { user } = useUser();
    const router = useRouter();
    const [input, setInput] = useState<string>('');
    const [
        fileID,
        filename,
        isRenameModalOpen,
        setIsRenameModalOpen
    ] = useAppStore((state) => [
        state.fileID,
        state.filename,
        state.isRenameModalOpen,
        state.setIsRenameModalOpen
    ])
    const renameFile = async () => {
        if(!user || !fileID) return;
        const toastId = toast.loading("Renaming file...");
        try {
            await updateDoc(doc(db,"users",user.id,"files",fileID),{
                filename: input
            });
            setIsRenameModalOpen(false);
            setInput("");
            toast.success("File renamed",{
                id: toastId
            })
            router.refresh();
        } catch (err) {
            toast.error("error renaming file",{
                id: toastId
            })
        }
    }
    return (
        <Dialog
            open={isRenameModalOpen}
            onOpenChange={(isOpen) => setIsRenameModalOpen(isOpen)}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Rename the file</DialogTitle>
                    <Input
                        id="link"
                        defaultValue={filename}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDownCapture={(e) => {
                            if (e.key === "Enter") {
                                renameFile();
                            }
                        }}
                    />
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <div className="flex space-x-2 py-3">
                            <Button
                                size="sm"
                                variant={'ghost'}
                                className="px-3 flex-1"
                                onClick={() => setIsRenameModalOpen(false)}
                            >
                                <span className="sr-only">Cancel</span>
                                <span>Cancel</span>
                            </Button>
                            <Button
                                type="submit"
                                size={'sm'}
                                className="px-3 flex-1 bg-green-700 hover:bg-green-500"
                            onClick={() => renameFile()}
                            >
                                <span className="sr-only">Rename</span>
                                <span>Rename</span>
                            </Button>
                        </div>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
