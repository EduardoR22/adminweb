import ListProyects from "@/components/proyects/ListProyects"
import NavBar from "@/components/NavBar"
import { getProyects } from "../api/proyects/route"
import { cookies } from "next/headers"

export default async function Proyects(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const proyects = await getProyects(token)
  
  return (
    <>
      <NavBar />
      <div className="p-10">
        <h1 className="font-semibold text-gray-900">Proyectos</h1>
        <ListProyects proyects={proyects.data.data} token={token} />
      </div>
    </>
  )
}