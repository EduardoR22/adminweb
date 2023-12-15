import FormNew from "@/components/proyects/FormNew";
import ContainerForm from "@/components/ContainerForm";
import { cookies } from "next/headers";
import { getProyect } from "@/app/api/proyects/route";
import NavBar from "@/components/Navigation/NavBar";

export default async function Edit({params}: {params:{id:string}}){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const id = params.id;
  let user;
  user = cookieStore.get('user')?.value;
  if(user) user = JSON.parse(user);
  else return <h1>Error: Usuario no se encuentra autenticado</h1>

  let proyect;
  try {
    proyect = await getProyect(id, token);
    if(!proyect){
      return(
        <h1 className="text-center text-red-500">Error al obtener los datos del proyecto..</h1>
      )
    }
  } catch (error) {
    return(
      <h1 className="text-center text-red-500">Error al obtener los datos del proyecto..</h1>
    )
  }

  return(
    <>
      <NavBar />
      <ContainerForm img="/projects.jpg" subtitle="Proyecto a modificar" title="Modificar Proyecto" width="w-2/3">
        <FormNew token={token} address={proyect.data.data.address} features={proyect.data.data.features} 
                  seg={proyect.data.data.segment} subtitle={proyect.data.data.subtitle} 
                  tittle={proyect.data.data.title} id={id} services='' user={user._id} 
                  company={user.company} />
      </ContainerForm>
    </>
  )
}