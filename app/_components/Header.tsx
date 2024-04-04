import Image from 'next/image'
import React from 'react'
import { ThemeToggler } from '../../components/ThemeToggler'
import Link from 'next/link'
import { UserButton, auth } from "@clerk/nextjs";
import MobileMenu from './MobileMenu';
const Header = () => {
    const { userId } = auth();
    return (
        <header className="border-b">
            <div className={`mx-auto flex flex-wrap h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8`}>
                <Image alt='logo' src={'/logo.svg'} width={150} height={100} />
                <div className="flex flex-1 items-center justify-end md:justify-between">
                    <nav aria-label="Global" className="hidden md:block">
                        <ul className="flex flex-col md:flex-row md:items-center gap-6 text-sm">
                            <li>
                                <Link href={"/"}> Home </Link>
                            </li>

                            <li>
                                <Link href={"/upload"}> Upload </Link>
                            </li>

                            <li>
                                <Link href={"/files"}> Files </Link>
                            </li>

                            <li>
                                <Link href={"#"}> About Us </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="flex items-center gap-4">
                        <ThemeToggler />
                        <div className="sm:flex sm:gap-4">
                            {userId ? (
                                <UserButton afterSignOutUrl='/' />
                            ) : (
                                <>
                                    <Link
                                        className="block rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                                        href="/sign-in"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-blue-600 transition hover:text-blue-600/75 sm:block"
                                        href="sign-up"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                        <MobileMenu className="block md:hidden"/>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header