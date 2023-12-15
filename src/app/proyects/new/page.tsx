import FormNew from "@/components/proyects/FormNew";
import ContainerForm from "@/components/ContainerForm";
import { cookies } from "next/headers";
import NavBar from "@/components/Navigation/NavBar";
import { getServices } from "@/app/api/services/route";

export default async function New(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  let user;
  user = cookieStore.get('user')?.value;
  if(user) user = JSON.parse(user);
  else return <h1>Error: Usuario no auntentificado</h1>

  const company = user.company;

  let services;
  try {
    services = await getServices(token);
    if(typeof(services) === 'string'){
      return <h1>{services}</h1>
    }
  } catch (error) {
    return <h1>Ocurrio un problema al consultar servicios!!!</h1>
  }

  return(
    <>
      <NavBar />
      <ContainerForm img="/projects.jpg" subtitle="Proyecto a publicar" title="Nuevo Proyecto" width="w-2/3">
        <FormNew token={token} address="" features="" id="" seg="" subtitle="" 
                  tittle="" services={services} user={user._id} company={company} />
      </ContainerForm>
    </>
  )
}