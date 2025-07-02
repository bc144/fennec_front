import React from 'react';
import Link from 'next/link';
import OrangeButton from '@/stories/ArrowButton';
import WhiteButton from '@/stories/WhiteButton';
import BasicLink from '@/stories/BasicLink';

const Navbar = () => {
  return (
    <div className='w-full h-fit py-6 flex flex-row justify-center px-40 items-center fixed z-50 bg-white shadow-sm'>
        <div className='w-1/3'>
            <Link href="/">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="./images/Fennec-logo-trans.png" alt="Logo Fennec" className='w-40' />
            </Link>
        </div>

        <nav className='w-1/3 flex flex-row justify-center items-center gap-x-8'>
            <BasicLink text='Soluciones y servicios' href='/solutions'></BasicLink>

            <BasicLink text='Sobre nosotros' href='/about'></BasicLink>
        </nav>
        
        <div className='flex flex-row justify-end items-center gap-x-2 w-1/3'>
          <Link href={'/login'}>
            <WhiteButton text='Iniciar Sesión'></WhiteButton>
          </Link>
          
          <Link href={'signup'}>
            <OrangeButton text='Registrarse' className='py-3 px-9'></OrangeButton> 
          </Link>
        </div>
    </div>
  )
}

export default Navbar;