"use client"

import { Bars3Icon, Cog8ToothIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import RemoveCookies from "../RemoveCookies"

export default function NavBarClient({user}: {user:any}){

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenP, setIsOpenP] = useState(false);

  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  }

  const toggleProfile = () => {
    setIsOpenP(!isOpenP);
  }
  
  //let name='NOAutorizado', photo='/default.jpg', role='', ok=false, id='1234567890'; 
  let name = user.name;
  let photo = user.photo;
  let role = user.role;
  let id = user._id;
  //let user;
  
  const router = useRouter();
  
  function logOut(){
    RemoveCookies();
    router.push('/login');
  }

  return(
    <>
      <nav className="bg-blue-950 top-0 flex-wrap z-[20] mx-auto flex w-full items-center justify-between">
        <Bars3Icon width={40} height={40} className="md:hidden cursor-pointer ml-2 rounded-md p-1 bg-slate-500 text-white" onClick={toggleNavBar} />
        <Image src={'/icono.jpg'} alt="logo" width={50} height={50} priority />
        <div className="w-1/12 md:w-9/12 flex justify-end">
          <div className="hidden w-full text-white md:flex justify-between ">
            <NavLinks role={role} /> 
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="flex justify-around items-center w-20 text-white">
            <p className="invisible md:visible text-2xl"> | </p>
            {/* <Link href={'/'}><ChartBarIcon width={30} height={30} /></Link> */}
            <Link href={'/issues'}><Cog8ToothIcon width={30} height={30} /></Link>
          </div>
          <Image src={photo} alt="profile" width={50} height={50} 
                  onClick={toggleProfile} className="cursor-pointer"
          />
        </div>
      </nav>
      {isOpen && (
          <div className="flex text-gray-200 bg-stone-400 md:hidden flex-col items-start pl-2  basis-full">
            <NavLinks role={role} />
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

const NavLinks = ({role}: {role:string}) => {
  return(
    <>
      <Link href={'/proyects'} className="text-sm lg:text-base">PROYECTOS</Link>
      <Link href={'/sliders'} className="text-sm lg:text-base">SLIDERS</Link>
      <Link href={'/clients'} className="text-sm lg:text-base">CLIENTES</Link>
      <Link href={'/reviews'} className="text-sm lg:text-base">REVIEWS</Link>
      <Link href={'/contact-us'} className="text-sm lg:text-base">CONTACTOS</Link>
      {role === 'admin'? <><Link href={'/companies'} className="text-sm lg:text-base">COMPAÑIAS</Link> <Link href={'/accounts'} className="text-sm lg:text-base">CUENTAS</Link> </>: ''}
    </>
  )
};