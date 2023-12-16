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
        setAddImage(<></>);
        window.location.reload();
        
        setTimeout(() => {
          showToastMessage('Imagen Agregada Exitosamente!!!');  
        }, 2000);
        
        // setTimeout(() => {
        //   setAddImage(<></>);
        //   router.refresh();
        //   router.push('/proyects');
        // }, 2000);
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
      <p className='text-xs font-sans font-thin mt-5'>Adjunte una fotografia con un aspecto 16:9 (1920×1080 píxeles o 1280×720 píxeles).</p>
      <div onClick={showAddImage} className="w-full flex justify-center">
        <Button typeB="button" textB="Agregar"
            styleB="bg-blue-950 hover:bg-blue-500 w-36 text-white mt-3" />
      </div>
    </>
  )
}