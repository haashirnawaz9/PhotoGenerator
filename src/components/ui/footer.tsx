"use client"
import { InstagramIcon } from 'next-share'
import Link from 'next/link'

function Footer() {
  return (
    <div className="flex flex-row justify-center items-center text-center h-[60px]">
            <h1 className="font-normal text-sm">Copyright © 2025 PhotoGenerator - Haashir Nawaz | All Rights Reserved</h1>
            <Link href="https://www.instagram.com/haashir_nawaz_/">      
                <InstagramIcon size={34} round className="ml-3" />
            </Link>
    </div>
  )
}

export default Footer;