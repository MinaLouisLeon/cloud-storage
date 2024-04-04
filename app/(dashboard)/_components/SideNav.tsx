"use client";
import {CloudUpload,Files,Shield} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideNav = () => {
  const pathName = usePathname();

  const menuList = [
    {
      name:'Upload',
      icon: CloudUpload,
      link: '/upload'
    },{
      name:'Files',
      icon: Files,
      link: '/files'
    },{
      name:"Upgrade",
      icon: Shield,
      link: '/upgrade'
    }
  ]
  return (
    <div className="shadow-sm border-r md:h-full">
      <div className="p-5 border-b hidden md:block h-20">
        <Image alt='logo' src={'/logo.svg'} width={150} height={100}/>
      </div>
      <div className="flex flex-col float-left w-full border-b md:border-none">
      {menuList.map((item) => (
        <Link className={`flex gap-2 p-4 px-6 hover:bg-gray-200 dark:hover:bg-gray-800 w-full ${pathName === item.link ? 'bg-blue-50 dark:bg-slate-700 text-blue-400':null}`}
          href={item.link}
          key={item.name}
        >
          <item.icon />
          <h1>{item.name}</h1>
        </Link>
      ))}
      </div>
    </div>
  )
}

export default SideNav