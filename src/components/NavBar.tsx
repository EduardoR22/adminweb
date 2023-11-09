"use client"

import { Bars3Icon, ChartBarIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation"
import RemoveCookies from "./RemoveCookies"

export default function NavBar(){

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenP, setIsOpenP] = useState(false);

  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  }

  const toggleProfile = () => {
    setIsOpenP(!isOpenP);
  }
  
  let name='NOAutorizado', photo='default.jpg', role='', ok=false, id='1234567890'; 
  let user;
  
  const router = useRouter();
  try {
    const userCookie: any = getCookie('user');
    user = JSON.parse(userCookie);

    if(user){
      name = user.name;
      role = user.role;
      photo = user.photo;
      id = user._id;
      ok = true;
    }           
  } catch (error) {
      router.push('/login');
  }

  function logOut(){
    RemoveCookies();
    router.push('/login');
  }

  return(
    <>
      <nav className="bg-blue-500 top-0 flex-wrap z-[20] mx-auto flex w-full items-center justify-between">
        <Bars3Icon width={30} height={30} className="sm:hidden" onClick={toggleNavBar} />
        <Image src={'/maxion.jpg'} alt="logo" width={50} height={50} priority />
        <div className="w-1/12 sm:w-2/3 flex justify-end">
          <div className="hidden w-full text-white sm:flex justify-between ">
            <NavLinks /> 
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="flex justify-around items-center w-20 text-white">
            <p className="text-2xl"> | </p>
            <Link href={'/'}><ChartBarIcon width={30} height={30} /></Link>
          </div>
          <Image src={photo} alt="profile" width={50} height={50} 
                  onClick={toggleProfile} className="cursor-pointer"
          />
        </div>
      </nav>
      {isOpen && (
          <div className="flex text-gray-200 bg-stone-400 sm:hidden flex-col items-start pl-2  basis-full">
            <NavLinks />
          </div>
        )}
      {isOpenP && (
        <div className="flex justify-end">
          <div className="flex flex-col w-36 absolute z-50 text-xs bg-white border border-white">
            <Link href={`/profile/${id}/edit`} className="py-1 hover:text-gray-900 hover:bg-gray-200">Editar Perfil</Link>
            <Link href={`/profile/${id}/changePassword`} className="py-1 hover:text-gray-900 hover:bg-gray-200">Cambiar Contrasena</Link>
            <p className="py-1 hover:text-gray-900 hover:bg-gray-200 cursor-pointer" onClick={logOut}>Salir</p>
          </div>
        </div>
      )}
    </>
  ) 
}

const NavLinks = () => {
  return(
    <>
      <Link href={'/proyects'}>PROYECTOS</Link>
      <Link href={'/sliders'}>SLIDERS</Link>
      <Link href={'/clients'}>CLIENTES</Link>
      <Link href={'/reviews'}>REVIEWS</Link>
      <Link href={'/contact'}>CONTACTOS</Link>
      <Link href={'/accounts'}>CUENTAS</Link>
    </>
  )
};