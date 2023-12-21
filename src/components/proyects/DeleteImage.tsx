"use client"

import { TrashIcon } from '@heroicons/react/24/solid';
import {confirmAlert} from 'react-confirm-alert';
import {showToastMessage, showToastMessageError, showToastMessageWarning, showToastMessageInfo} from "@/components/Alert";
import { useRouter } from 'next/navigation';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { removeImageProyect } from '@/app/api/proyects/routeProyects';
import Alert from '@/components/Alert';

export default function DeleteImage({token, image, idProyect} : {token : string, image: any, idProyect:string}){
  
  const router = useRouter()

  const deleteImage = async (id:string, name:any, idProyect:string)  => {
    confirmAlert({
      title: 'Confirmacion para eliminar Imagen?',
      message: `Desea eliminar la imagen ${name}`,
      buttons: [
      {
        label: 'Si',
        onClick: async () => {
          let res;
          try {
            res = await removeImageProyect(id, token, idProyect);
            if(res != undefined) {
              if(res === 204) {
                showToastMessage('Imagen eliminada exitosamente!');
                setTimeout(() =>{
                  window.location.reload();
                }, 2000)
              } else {
                showToastMessageError(res.toString());
              }
            } else {
              showToastMessageError('La imagen no pudo ser eliminada..');
              router.refresh();
              }
              router.refresh()
          } catch (error) {
            showToastMessageError('la imagen no pudo ser eliminada...');
          }
        }
          
        },
        {
          label: 'No',
          onClick: () => {
            showToastMessageInfo('Se ha cancelado la eliminacion!');            
          }
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      willUnmount: () => {},
      onClickOutside: () => {
        showToastMessageWarning('Se ha cerrado dialogo, volver a intentar!');
      },
      onkeyPress: () => {
        showToastMessageInfo('Favor de seleccionar SI o NO');
      },
      onKeypressEscape: () => {
        showToastMessageWarning('Se ha cerrado dialogo, volver a intentar!');
      },
      overlayClassName: "overlay-custom-class-name"
    });   
  }

  return(
    <div className='p-0 cursor-pointer' onClick={() => {
      deleteImage(image._id, image.services.name, idProyect)
      router.refresh()
      }}>
      <TrashIcon className="h-6 w-6 text-red-500"/>
      <Alert/>
    </div>
  )
}