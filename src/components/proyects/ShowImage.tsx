import Image from "next/image"
import DeleteImage from "./DeleteImage"

export default function ShowImage({img, token, idProyect}: {img:any, token:string, idProyect:string}){
  
  return(
    <div className="flex items-center justify-between w-full mb-3 outline-0 outline-none">
      <div className="flex items-center">
        <Image src={img.photo} alt="img" width={90} height={90} />
        <p className="ml-5">{img.services.name}</p>
      </div>
      <DeleteImage image={img} token={token} idProyect={idProyect} />
    </div>
  )
}