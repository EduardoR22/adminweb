import { getIssues } from "../api/issues/route"
import { cookies } from "next/headers";
import { StarIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import Modal from "@/components/issues/ModalIssue";
import DeleteIssue from "@/components/issues/DeleteIssue";

export default async function Issues(){
  const cookiestore = cookies();
  const token = cookiestore.get('token')?.value || '';
  let issues;

  try {
    issues = await getIssues(token);
    //console.log(issues);

    return(
      <>
        <div className="flex justify-center pt-4">
          <div>
            <div className="mt-4 flex justify-end">
              <Modal newIssue={true} issue='' token={token} id="" />
            </div>
            <table className="mt-2 border border-blue-200">
              <thead className="border-b font-semibold text-slate-700 bg-blue-100">
                <tr className="">
                  <td className="w-28 py-2 pl-2">Categoria</td>
                  <td className="w-40 py-2">Issue</td>
                  <td className="w-32 p-2">Rating</td>
                  <td className="w-16">&nbsp;</td>
                </tr>
              </thead>
              <tbody>
                {issues.map((issue:any) => (
                  <tr key={issue._id} className="border border-blue-200">
                    <td className="py-1 pl-2 text-slate-600">{issue.category}</td>
                    <td className="py-1 text-slate-600">{issue.issue}</td>
                    <td className="py-1">
                      <div className="flex">
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
  } catch (error) {
    console.log('Error al consultar lista de issues');
  }
  
  return(
    <h1>Issues</h1>
  )
}