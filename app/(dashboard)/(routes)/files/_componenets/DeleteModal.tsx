'use client';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { db, storage } from "@/firebaseConfig";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function DeleteModal() {
    const { user } = useUser();
    const router = useRouter();
    const [
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        fileID,
        setFileID
    ] = useAppStore((state) => [
        state.isDeleteModalOpen,
        state.setIsDeleteModalOpen,
        state.fileID,
        state.setFileID
    ])
    const deleteFile = async () => {
        if (!user || !fileID) return;
        const fileRef = ref(storage, `users/${user.id}/files/${fileID}`);
        const toastId = toast.loading("Deleting file...");
        try {
            await deleteObject(fileRef).then(async () => {
                deleteDoc(doc(db, "users", user.id, "files", fileID)).then(() => {
                    console.log("done delete")
                })
            }).finally(() => {
                setIsDeleteModalOpen(false);
                toast.success("File deleted", {
                    id: toastId
                })
                router.refresh();
            })
        } catch (err) {
            toast.error("error deleting file", {
                id: toastId
            })
        }
    }
    return (
        <Dialog
            open={isDeleteModalOpen}
            onOpenChange={(isOpen) => {
                setIsDeleteModalOpen(isOpen);
            }}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Are You sure you want to delete ?</DialogTitle>
                    <DialogDescription>
                        This action can not be undone. This will permanently delete your file!
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <div className="flex space-x-2 py-3">
                            <Button
                                size="sm"
                                variant={'ghost'}
                                className="px-3 flex-1"
                                onClick={() => setIsDeleteModalOpen(false)}
                            >
                                <span className="sr-only">Cancel</span>
                                <span>Cancel</span>
                            </Button>
                            <Button
                                type="submit"
                                size={'sm'}
                                variant={'destructive'}
                                className="px-3 flex-1"
                                onClick={() => deleteFile()}
                            >
                                <span className="sr-only">Delete</span>
                                <span>Delete</span>
                            </Button>
                        </div>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
