"use client"

import { TrashIcon } from '@heroicons/react/24/solid';
import {confirmAlert} from 'react-confirm-alert';
import { removeUser } from '@/app/api/users/route';
import {showToastMessage, showToastMessageError, showToastMessageWarning, showToastMessageInfo} from "@/components/Alert";
import { useRouter } from 'next/navigation';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Delete({token, user} : {token : string, user: any}){
  
  /**
    * Metodo para eliminar un determinado usuario
    * @param id Id del usuario
    * @param user Nombre del usuario
    */

  const router = useRouter()

   const deleteUser = async (id:string, name:any)  => {
    
    confirmAlert({
      title: 'Confirmacion para eliminar Usuario?',
      message: `Desea eliminar al usuario ${name}`,
      buttons: [
      {
        label: 'Si',
        onClick: async () => {
          //let res = await removeUser(id, token);
          let res = undefined;

          switch('user'){
            case 'user':
              res = await removeUser(id, token);
            break;
          }

          if(res != undefined) {
            if(res === 204) {
              showToastMessage('Usuario eliminado exitosamente!');
            } else {
              showToastMessageError(res);
            }
          }else {
          showToastMessageError('El usuario no pudo ser eliminado..');
          }
          router.refresh()
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
      //afterClose: () => {},
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
    <button type="button" onClick={() => {
      deleteUser(user._id, user.name)
      router.refresh()
      }}>
      <TrashIcon className="h-6 w-6 text-gray-400"/>
    </button>
  )
}