"use client"

import { TrashIcon } from '@heroicons/react/24/solid';
import {confirmAlert} from 'react-confirm-alert';
import {showToastMessage, showToastMessageError, showToastMessageWarning, showToastMessageInfo} from "@/components/Alert";
import { useRouter } from 'next/navigation';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { removeProyect } from '@/app/api/proyects/route';
import Alert from '@/components/Alert';

export default function DeleteProyect({token, proyect} : {token : string, proyect: any}){
  
  const router = useRouter()

  const deleteProyect = async (id:string, name:any)  => {
    confirmAlert({
      title: 'Confirmacion para eliminar Proyecto?',
      message: `Desea eliminar el proyecto ${name}`,
      buttons: [
      {
        label: 'Si',
        onClick: async () => {
          let res;
          try {
            res = await removeProyect(id, token);
            if(res != undefined) {
              if(res === 204) {
              showToastMessage('Proyecto eliminado exitosamente!');
              } else {
                showToastMessageError(res);
              }
            } else {
              showToastMessageError('El proyecto no pudo ser eliminado..');
              router.refresh();
              }
              router.refresh()
          } catch (error) {
            showToastMessageError('El proyecto no pudo ser eliminado...');
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
      deleteProyect(proyect._id, proyect.title)
      router.refresh()
      }}>
      <TrashIcon className="h-6 w-6 text-red-500"/>
      <Alert/>
    </div>
  )
}