import { getIssues } from "../api/issues/routeIssues"
import { getServices } from "../api/services/routeServices";
import { cookies } from "next/headers";
import { StarIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import Modal from "@/components/issues/ModalIssue";
import DeleteIssue from "@/components/issues/DeleteIssue";
import NavBar from "@/components/Navigation/NavBar";
import NavTab from "@/components/issues/NavTabIssues";
import ModalService from "@/components/services/Modal";
import DeleteService from "@/components/services/DeleteService";

export default async function Issues({searchParams}: {searchParams: {[opc:string]: string}}){
  const cookiestore = cookies();
  const token = cookiestore.get('token')?.value || '';
  
  const opt = searchParams.opc;

  let issues;
  let services;

  const Nav = (
    <>
      <NavBar />
      <div className="flex justify-center">
        <NavTab opt={opt} />
      </div>
    </>
  )
  try {
    if(opt !== '2'){
      issues = await getIssues(token);
    
      return(
        <>
          {Nav}
          <div className="flex justify-center pt-2 px-2">
            <div>
              <div className="flex justify-end">
                <Modal newIssue={true} issue='' token={token} id="" />
              </div>
              <table className="mt-2 border border-blue-200">
                <thead className="border-b font-semibold text-slate-700 bg-blue-100">
                  <tr className="">
                    <td className="w-28 py-2 pl-2">Categoria</td>
                    <td className="w-40 py-2">Issue</td>
                    <td className="w-24 sm:w-32 p-2">Rating</td>
                    <td className="w-16">&nbsp;</td>
                  </tr>
                </thead>
                <tbody>
                  {issues.map((issue:any) => (
                    <tr key={issue._id} className="border border-blue-200">
                      <td className="py-1 pl-2 text-slate-600">{issue.category}</td>
                      <td className="py-1 text-slate-600">{issue.issue}</td>
                      <td className="py-1">
                        <div className="flex flex-wrap">
                          <StarIcon width={20} height={20} className={`${issue.rating >= 1? 'text-yellow-500': 'text-slate-500'}`} />
                          <StarIcon width={20} height={20} className={`${issue.rating >= 2? 'text-yellow-500': 'text-slate-500'}`} />
                          <StarIcon width={20} height={20} className={`${issue.rating >= 3? 'text-yellow-500': 'text-slate-500'}`} />
                          <StarIcon width={20} height={20} className={`${issue.rating >= 4? 'text-yellow-500': 'text-slate-500'}`} />
                          <StarIcon width={20} height={20} className={`${issue.rating >= 5? 'text-yellow-500': 'text-slate-500'}`} />
                        </div>
                      </td>
                      <td className="py-1 pr-2">
                        <div className="flex items-center">
                          <Modal newIssue={false} issue={issue} token={token} id={issue._id}/>
                          <DeleteIssue issue={issue} token={token} />
                        </div>
                      </td>
                      {/* <td><PencilSquareIcon width={20} height={20} className="text-slate-600 cursor-pointer"/></td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )
    }else{
      
      services = await getServices(token);
      return(
        <>
          {Nav}
          <div className="flex justify-center pt-4">
            <div>
              <div className="flex justify-end">
                <ModalService newService={true} service='' token={token} id="" />
              </div>
              <table className="mt-2 border border-blue-200">
                <thead className="border-b font-semibold text-slate-700 bg-blue-100">
                  <tr className="">
                    <td className="w-48 py-2 pl-2">Nombre</td>
                    <td className="w-16 py-2">Estado</td>
                    <td className="w-16">&nbsp;</td>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service:any) => (
                    <tr key={service._id} className="border border-blue-200">
                      <td className="py-1 pl-2 text-slate-600">{service.name}</td>
                      <td className="py-1 text-slate-600 flex justify-center items-center">
                        <div 
                          className={`rounded-full w-4 h-4 ${service.status? 'bg-green-500':'bg-red-500'}`}
                        ></div>
                      </td>                      
                      <td className="py-1 pr-2">
                        <div className="flex items-center">
                          <ModalService newService={false} service={service} token={token} id={service._id}/>
                          <DeleteService service={service} token={token} />
                        </div>
                      </td>
                      {/* <td><PencilSquareIcon width={20} height={20} className="text-slate-600 cursor-pointer"/></td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )
    }
  } catch (error) {
    if(opt !== '2'){
      console.log('Error al consultar lista de issues');
    }else{
      console.log('Error al consultar lista de servicios');
    }
  }
  
  return(
    <h1>Issues</h1>
  )
}