"use client"

import { TrashIcon } from '@heroicons/react/24/solid';
import {confirmAlert} from 'react-confirm-alert';
import {showToastMessage, showToastMessageError, showToastMessageWarning, showToastMessageInfo} from "@/components/Alert";
import { useRouter } from 'next/navigation';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Alert from '@/components/Alert';
import { removeSlider } from '@/app/api/sliders/routeSliders';

export default function Delete({token, slider} : {token : string, slider: any}){
  const router = useRouter()

  const deleteSlider = async (id:string, name:string)  => {
  
    confirmAlert({
      title: 'Confirmacion para eliminar Slider?',
      message: `Desea eliminar slider ${name}`,
      buttons: [
      {
        label: 'Si',
        onClick: async () => {
          let res = undefined;

          switch('user'){
            case 'user':
              try {
                res = await removeSlider(token, id);
                if(res === 204) {
                  showToastMessage('Slider eliminado exitosamente!');
                  setTimeout(() => {
                    router.refresh();
                    router.push('/sliders');
                  }, 2000)
                } else {
                  showToastMessageError('El slider no pudo ser eliminado..');
                  router.refresh()
                }
              } catch (error) {
                console.log('Error al eliminar slider');
              }
            break;
          }
          // router.refresh()
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
    <>
      <Alert />
      <button type="button" className='absolute right-9' onClick={() => {
        deleteSlider(slider._id, slider.title)
        router.refresh()
        }}>
        <TrashIcon width={30} height={30} className="text-red-700 hover:text-red-500"/>
      </button>
    </>
  )
}