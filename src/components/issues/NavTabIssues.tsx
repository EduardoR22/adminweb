import Link from "next/link"

export default function NavTab({opt}: {opt:string}){
  
  const option = (opt === '2'? 2: 1) 
  return(
    <>
      <div className="flex mb-3">
        <Link href={'/issues?opc=1'}>
          <div className={`p-2 mx-2 ${option === 1? 'text-red-500 border-b-2 border-red-500': ''}`}>Issues</div>
        </Link>
        <Link href={'/issues?opc=2'}>
          <div className={`p-2 mx-2 ${option === 2? 'text-red-500 border-b-2 border-red-500': ''}`}>Servicios</div>
        </Link>
      </div>
    </>
  )
}