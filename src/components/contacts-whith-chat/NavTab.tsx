import Link from "next/link"

export default function NavTab({opt}: {opt:string}){
  
  const option = (opt === '2'? 2: (opt === '3'? 3 : 1)) 
  return(
    <>
      <div className="flex mb-3">
        <Link href={'/contacts'}>
          <div className={`p-2 mx-2 ${option === 1? 'text-red-500 border-b-2 border-red-500': ''}`}>Pendientes</div>
        </Link>
        <Link href={'/contacts?opc=2'}>
          <div className={`p-2 mx-2 ${option === 2? 'text-red-500 border-b-2 border-red-500': ''}`}>Solucionados</div>
        </Link>
        <Link href={'/contacts?opc=3'}>
          <div className={`p-2 mx-2 ${option === 3? 'text-red-500 border-b-2 border-red-500': ''}`}>Anulados</div>
        </Link>
      </div>
    </>
  )
}