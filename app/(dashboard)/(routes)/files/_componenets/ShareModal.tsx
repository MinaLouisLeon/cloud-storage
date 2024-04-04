"use client";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Dialog, DialogFooter, DialogHeader, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import GlobalApi from "@/GlobalApi";



export const ShareModal = () => {
    const { user } = useUser();
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [enablePassword, setEnablePassword] = useState<boolean>(true);
    const [
        fileID,
        filename,
        downloadUrl,
        type,
        isShareModalOpen,
        setIsShareModelOpen
    ] = useAppStore((state) => [
        state.fileID,
        state.filename,
        state.downloadUrl,
        state.type,
        state.isShareModalOpen,
        state.setIsShareModalOpen
    ])
    const shareFile = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if(!user || !fileID) return;
        const toastId = toast.loading("Sending Email...");
        try {
           if(enablePassword){
            await updateDoc(doc(db,"users",user.id,"files",fileID),{
                password: password
            })
           }
           const data = {
            emailToSend: email,
            userName: user.fullName,
            filename: filename,
            type:type,
            downloadUrl:downloadUrl,
            emailFrom: user.emailAddresses[0].emailAddress
           }
           //@ts-ignore
           GlobalApi.SendEmail(data).then((res:any) => console.log(res));
           toast.success("Email sent", {
               id: toastId
           })
        } catch (err) {
            toast.error("error sending email", {
                id: toastId
            })
        }
    }
    return (
        <Dialog
            open={isShareModalOpen}
            onOpenChange={(isOpen) => setIsShareModelOpen(isOpen)}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share File</DialogTitle>
                </DialogHeader>
                <div>
                <h2><strong>File Name:</strong> {filename}</h2>
                <h2 ><strong>File Type:</strong> {type}</h2>
                </div>
                <form onSubmit={shareFile}>
                    <div className="border rounded-lg p-4">
                        <div className="flex items-center space-x-2 pl-4 pr-4 pb-4">
                            <Checkbox id="enablePassword" checked={enablePassword} onCheckedChange={
                                //@ts-ignore
                                (value) => setEnablePassword(value)} />
                            <Label htmlFor="enablePassword">Enable Password</Label>
                        </div>
                        {enablePassword && <div className="pl-4 pr-4 pb-2">
                            <Input type="password" id="password" onChange={(e) => setPassword(e.target.value)} required={enablePassword}/>
                        </div>}
                    </div>
                    <div className="border rounded-lg p-4 mt-4">
                        <div className="grid w-full max-w-sm items-center gap-4">
                            <Label htmlFor="email" className="mt-2">Send File To Email</Label>
                            <Input id="email" type="email" onChange={(e) => setEmail(e.target.value)} required={true}/>
                        </div>
                    </div>
                    <div className="flex space-x-2 py-3">
                        <Button
                            size="sm"
                            variant={'ghost'}
                            className="px-3 flex-1"
                            onClick={() => setIsShareModelOpen(false)}
                        >
                            <span className="sr-only">Cancel</span>
                            <span>Cancel</span>
                        </Button>
                        <Button
                            type="submit"
                            size={'sm'}
                            className="px-3 flex-1 bg-green-700 hover:bg-green-500"
                        >
                            <span className="sr-only">send email</span>
                            <span>Send Email</span>
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
