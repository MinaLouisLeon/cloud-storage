"use client"
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AlignJustify, MenuSquareIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
const MobileMenu = () => {
    const router = useRouter();
    return (
         <div className="block md:hidden">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size={"icon"} className="border">
                        <AlignJustify />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-2 ml-4 mr-4">
                    <DropdownMenuItem onClick={() => router.push("/")}>Home</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/upload")}>Upload</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/files")}>Files</DropdownMenuItem>
                    <DropdownMenuItem>About Us</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
             </div>
    )
}

export default MobileMenu
