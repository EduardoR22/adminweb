"use client"

import { TrashIcon } from '@heroicons/react/24/solid';
import {confirmAlert} from 'react-confirm-alert';
import Alert,{showToastMessage, showToastMessageError, showToastMessageWarning, showToastMessageInfo} from "@/components/Alert";
import { useRouter } from 'next/navigation';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { removeCompany } from '@/app/api/companies/routeCompanies';

export default function DeleteCompany({token, company} : {token : string, company: any}){
  
  const router = useRouter()

  const deleteCompany = async (id:string, name:any)  => {
    confirmAlert({
      title: 'Confirmacion para eliminar Compañia?',
      message: `Desea eliminar la compañia ${name}`,
      buttons: [
      {
        label: 'Si',
        onClick: async () => {
          let res;
          try {
            res = await removeCompany(token, id);
            if(res != undefined) {
              if(res === 204) {
                showToastMessage('Compañia eliminada exitosamente!');
                setTimeout(() =>{
                  // router.refresh();
                  // router.push('/companies');
                  window.location.reload();
                }, 2000)
              } else {
                showToastMessageError(res.toString());
              }
            } else {
              showToastMessageError('La compañia no pudo ser eliminada..');
              router.refresh();
              }
              router.refresh()
          } catch (error) {
            showToastMessageError('La compañia no pudo ser eliminada...');
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
      deleteCompany(company._id, company.name)
      router.refresh()
      }}>
      <TrashIcon className="h-6 w-6 text-red-500"/>
      <Alert/>
    </div>
  )
}