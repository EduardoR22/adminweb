import FormNew from "@/components/proyects/FormNew";
import ContainerForm from "@/components/ContainerForm";
import { cookies } from "next/headers";
import NavBar from "@/components/Navigation/NavBar";
import { getServices } from "@/app/api/services/routeServices";
import { getSegments } from "@/app/api/proyects/routeProyects";
import { getClients } from "@/app/api/clients/routeClient";

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

  let segments;
  try {
    segments = await getSegments(token);
    if(typeof(segments) === 'string'){
      return <h1>{segments}</h1>
    }
  } catch (error) {
    return <h1>Ocurrio un problema al consultar servicios!!!</h1>
  }

  let clients;
  try {
    clients = await getClients(token);
    if(typeof(clients)=== 'string'){
      return <h1>{clients}</h1>
    }
  } catch (error) {
    return <h1 className="text-center text-red-500">Ocurrio un problema al consultar clientes!!</h1>
  }

  return(
    <>
      <NavBar />
      <ContainerForm img="/projects.jpg" subtitle="Proyecto a publicar" 
        title="Nuevo Proyecto" width="w-full md:w-2/3">
        <FormNew token={token} address="" features="" id="" seg="" subtitle="" 
                  tittle="" services={services} user={user._id} company={company} 
                  segments={segments} year="" clients={clients.data.data} idClient="" />
      </ContainerForm>
    </>
  )
}