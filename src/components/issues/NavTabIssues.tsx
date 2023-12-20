import Link from "next/link"

export default function NavTab({opt}: {opt:string}){
  
  const option = (opt === '2'? 2: 1) 
  return(
    <>
      <div className="flex mb-1">
        <Link href={'/issues?opc=1'}>
          <div className={`p-2 mx-1 ${option === 1? 'text-red-500 border-b-2 border-red-500': ''}`}>Issues</div>
        </Link>
        <Link href={'/issues?opc=2'}>
          <div className={`p-2 mx-1 ${option === 2? 'text-red-500 border-b-2 border-red-500': ''}`}>Servicios</div>
        </Link>
      </div>
    </>
  )
}