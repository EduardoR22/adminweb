"use client"

import { TrashIcon } from '@heroicons/react/24/solid';
import {confirmAlert} from 'react-confirm-alert';
import { removeClient } from '@/app/api/clients/route';
import Alert, {showToastMessage, showToastMessageError, showToastMessageWarning, showToastMessageInfo} from "@/components/Alert";
import { useRouter } from 'next/navigation';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function DeleteClient({token, client} : {token : string, client: any}){
  
  const router = useRouter()

  const deleteClient = async (id:string, name:any)  => {
    confirmAlert({
      title: 'Confirmacion para eliminar Cliente?',
      message: `Desea eliminar al cliente ${name}`,
      buttons: [
      {
        label: 'Si',
        onClick: async () => {
        let res = await removeClient(id, token);
        if(res != undefined) {
          if(res === 204) {
            showToastMessage('Cliente eliminado exitosamente!');
            setTimeout(() =>{
              console.log('timer delete');
              router.refresh();
              router.push('/clients')
            }, 3000)
          } else {
            showToastMessageError(res.toString());
            router.refresh();
          }
        } else {
            showToastMessageError('El cliente no pudo ser eliminado..');
            router.refresh()
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
    <>
      <Alert />
      <button type="button" onClick={() => {
        deleteClient(client._id, client.name)
        router.refresh()
        }}>
        <TrashIcon className="h-6 w-6 text-red-500"/>
      </button>
    </>
  )
}