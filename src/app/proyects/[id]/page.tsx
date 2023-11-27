import ViewProyect from "@/components/proyects/ViewProyect"
import { getProyect } from "@/app/api/proyects/route";
import { cookies } from "next/headers";
import NavBar from "@/components/NavBar";

export default async function Proyect({params}: {params: {id:string}}){
  
  const id = params.id;
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  let proyect;

  try {
    proyect = await getProyect(id, token);
    if(!proyect){
      return(
        <h1 className="font-bold text-center text-red-500">Error al obtener los datos del proyecto..</h1>
      )
    }
    if(proyect.status !== 'success'){
      return(
        <h1 className="font-bold text-center text-red-500">Error al obtener los datos del proyecto...</h1>
      )
    }    
  } catch (error) {
    return(
      <h1 className="font-bold text-center text-red-500">Ocurrio un error al obtener los datos del proyecto..</h1>
    )
  }

  return(
    <>
      <NavBar />
      <div className="flex justify-center">
        <div className="w-2/3 p-10">
          <ViewProyect token={token} width="w-full" proyect={proyect.data.data} />
        </div>
      </div>
    </>
  )
}