import { HandRaisedIcon, HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/solid";
import { updateContactUs } from "@/app/api/contact-us/route";
import Alert, {showToastMessageError} from "../Alert";

export default function ChangeStatus({status, token, idContact}: {status:string, token:string, idContact:string}){
  
  const changeStatus = async (statusContact:string) => {
    const statusData = {
      statusContact
    }
    try {
      const res = await updateContactUs(token, statusData, idContact);
      if(res === 200){
        window.location.reload();
      }
      showToastMessageError(res.toString());
    } catch (error) {
      showToastMessageError('Error al cambiar estado del contacto!!');
    }
  }
  
  return (
    <>
      <Alert />
      <div className="flex items-center">
        <HandRaisedIcon width={30} height={30} onClick={() => changeStatus('EN ATENCION')}
          className="text-orange-500 cursor-pointer" 
        />
        <HandThumbUpIcon width={30} height={30} onClick={() => changeStatus('SOLUCIONADO')}
          className="text-green-500 cursor-pointer" 
        />
        <HandThumbDownIcon width={30} height={30} onClick={() => changeStatus('ANULADO')}
          className="text-red-500 cursor-pointer" 
        />
      </div>
      {/* <div className="flex items-center">
        {status==='PENDIENTE'? <HandRaisedIcon width={30} height={30} 
                                  className="text-orange-500 cursor-pointer" 
                                  onClick={() => changeStatus('EN ATENCION')}
                                  /> : ''}
        {status==='PENDIENTE' || status==='EN ATENCION'? <HandThumbUpIcon width={30} height={30} 
                                                          onClick={() => changeStatus('SOLUCIONADO')}
                                                          className="text-green-500 cursor-pointer" />: ''}
        {status==='PENDIENTE' || status==='EN ATENCION'? <HandThumbDownIcon width={30} height={30} 
                                                          onClick={() => changeStatus('ANULADO')}
                                                          className="text-red-500 cursor-pointer" />: ''}
      </div> */}
    </>
  )
}