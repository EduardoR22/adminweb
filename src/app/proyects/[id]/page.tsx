// import Image from "next/image"
// import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import ViewProyect from "@/components/proyects/ViewProyect"

export default function Proyect(){
  return(
    <>
      <div className="flex justify-center">
        <div className="w-2/3 p-10">

          <ViewProyect width="w-1/2" />

        </div>
      </div>
    </>
  )
}