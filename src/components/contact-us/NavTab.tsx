"use client"
import { useRouter } from "next/navigation"

export default function NavTab({opt}: {opt:string}){
  
  const router = useRouter();
  const option = (opt === '2'? 2: (opt === '3'? 3 : (opt === '4'? 4 : 1))) 
  return(
    <>
      <div className="flex mb-3">
        <div onClick={() => {
          router.push('/contact-us')
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }} 
          className={`p-2 mx-2 cursor-pointer ${option === 1? 'text-red-500 border-b-2 border-red-500': ''}`}>Pendientes</div>
        
        <div onClick={() => {
          router.push('/contact-us?opc=2')
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }}
          className={`p-2 mx-2 cursor-pointer ${option === 2? 'text-red-500 border-b-2 border-red-500': ''}`}>En tramite</div>
        
        <div onClick={() => {
          router.push('/contact-us?opc=3');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }}
          className={`p-2 mx-2 cursor-pointer ${option === 3? 'text-red-500 border-b-2 border-red-500': ''}`}>Solucionados</div>

        <div onClick={() => {
          router.push('/contact-us?opc=4');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }}
          className={`p-2 mx-2 cursor-pointer ${option === 4? 'text-red-500 border-b-2 border-red-500': ''}`}>Anulados</div>
      </div>
    </>
  )
}