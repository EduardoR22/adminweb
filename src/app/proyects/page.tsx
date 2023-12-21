import ListProyects from "@/components/proyects/ListProyects"
import NavBar from "@/components/Navigation/NavBar"
import { getProyects } from "../api/proyects/routeProyects"
import { cookies } from "next/headers"
import { getServices } from "../api/services/routeServices"

export default async function Proyects(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  let proyects;
  try {
    proyects = await getProyects(token)
  } catch (error) {
    return <h1>Error al consultar proyectos</h1>
  }
  
  let services;
  try {
    services = await getServices(token);   
  } catch (error) {
    return <h1>Error al consultar los servicios</h1>
  }

  return (
    <>
      <NavBar />
      <div className="p-1 md:px-10">
        {/* <h1 className="font-semibold text-gray-900">Proyectos</h1> */}
        <ListProyects proyects={proyects.data.data} token={token} services={services} />
      </div>
    </>
  )
}