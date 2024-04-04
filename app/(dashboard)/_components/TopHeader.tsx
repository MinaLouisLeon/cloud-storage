"use client";
import { ThemeToggler } from "@/components/ThemeToggler"
import { UserButton } from "@clerk/nextjs"
import { AlignJustify, CircleXIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react";
import SideNav from "./SideNav";
const TopHeader = () => {
    const [isNavHidden, setIsNavHidden] = useState<boolean>(true);
    return (
        <>
            <div className="flex p-5 border-b items-center justify-between md:justify-end gap-2 h-20">
                <button onClick={() => setIsNavHidden(!isNavHidden)} className=" border rounded-lg p-2 md:hidden">
                    {isNavHidden ? <AlignJustify /> : <CircleXIcon />}
                </button>
                <Image alt='logo' src={'/logo.svg'} width={150} height={100} className='md:hidden' />
                <ThemeToggler />
                <UserButton afterSignOutUrl="/" />
            </div>
            {!isNavHidden && <SideNav />}
        </>
    )
}

export default TopHeader