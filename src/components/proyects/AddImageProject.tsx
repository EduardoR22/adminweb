import { useState } from "react";
import Button from "../Button"
import AddOnlyImage from "./AddOnlyImage";
import { insertImage } from "@/app/api/proyects/route";
import Alert, {showToastMessage, showToastMessageError} from "../Alert";
import { useRouter } from "next/navigation";

export default function AddImageProyect({services, token, idProyect}: 
                            {services:any[], token:string, idProyect:string}){
  const [addImage, setAddImage] = useState<JSX.Element>(<></>);
  
  const router = useRouter();

  const showAddImage = () => {
    setAddImage(<AddOnlyImage services={services} addImage={sendAddImage} />)
  }
  
  const sendAddImage = async (file:any, service:string) => {
    try {
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('services', service);
      const res = await insertImage(token, idProyect, formData);
      if(res === 200) {
        showToastMessage('Imagen Agregada Exitosamente!!!')
        setTimeout(() => {
          setAddImage(<></>);
          router.refresh();
          router.push('/proyects');
        }, 2000);
      }
      else{
        showToastMessageError('La imagen no pudo ser agregada');
      }
    } catch (error) {
      showToastMessageError('Error al agregar imagen..')
    }
  }

  return(
    <>
      <Alert />
      {addImage}
      <div onClick={showAddImage} className="w-full flex justify-center">
        <Button typeB="button" textB="Agregar"
            styleB="bg-blue-950 hover:bg-blue-500 text-white mt-3" />
      </div>
    </>
  )
}