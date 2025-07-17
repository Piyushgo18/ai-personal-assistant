"use client"
import React, { useContext } from 'react'
import Image from 'next/image';
import { AuthContext } from '@/context/AuthContext';

function Header() {
    const {user} = useContext(AuthContext);
  return user&&(
    <div className='p-3 fixed shadow-sm flex justify-between items-center px-14'>
      <Image src={'/logo.svg'} alt='logo' width={40} height={40}/>
      {user?.picture&&<Image className='rounded-full' src={user?.picture} alt='logo' width={40} height={40}/>}
    </div>
  )
}

export default Header
