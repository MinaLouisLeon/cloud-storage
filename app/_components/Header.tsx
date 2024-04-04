import Image from 'next/image'
import React from 'react'
import { ThemeToggler } from '../../components/ThemeToggler'
import Link from 'next/link'
import { UserButton, auth, currentUser } from "@clerk/nextjs";
const Header = () => {
    const { userId } = auth();
    console.log(userId)
    return (
        <header className="border-b">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                <Image alt='logo' src={'/logo.svg'} width={150} height={100} />

                <div className="flex flex-1 items-center justify-end md:justify-between">
                    <nav aria-label="Global" className="hidden md:block">
                        <ul className="flex items-center gap-6 text-sm">
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

                        <button
                            className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                        >
                            <span className="sr-only">Toggle menu</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header