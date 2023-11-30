"use client"

import { TrashIcon } from '@heroicons/react/24/solid';
import {confirmAlert} from 'react-confirm-alert';
import Alert,{showToastMessage, showToastMessageError, showToastMessageWarning, showToastMessageInfo} from "@/components/Alert";
import { useRouter } from 'next/navigation';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { removeIssue } from '@/app/api/issues/route';

export default function DeleteIssue({token, issue} : {token : string, issue: any}){
  
  const router = useRouter()

  const deleteIssue = async (id:string, name:any)  => {
    confirmAlert({
      title: 'Confirmacion para eliminar Issue?',
      message: `Desea eliminar la issue ${name}`,
      buttons: [
      {
        label: 'Si',
        onClick: async () => {
          let res;
          try {
            res = await removeIssue(id, token);
            if(res != undefined) {
              if(res === 204) {
                showToastMessage('Issue eliminado exitosamente!');
                setTimeout(() =>{
                  router.refresh();
                  router.push('/issue');
                }, 2000)
              } else {
                showToastMessageError(res.toString());
              }
            } else {
              showToastMessageError('El issue no pudo ser eliminado..');
              router.refresh();
              }
              router.refresh()
          } catch (error) {
            showToastMessageError('El issue no pudo ser eliminado...');
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
      deleteIssue(issue._id, issue.issue)
      router.refresh()
      }}>
      <TrashIcon className="h-6 w-6 text-red-500"/>
      <Alert/>
    </div>
  )
}