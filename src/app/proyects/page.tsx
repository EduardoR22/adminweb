import ListProyects from "@/components/proyects/ListProyects"
import NavBar from "@/components/NavBar"

export default function Proyects(){
  return (
    <>
      <NavBar />
      <div className="p-10">
        <h1 className="font-semibold text-gray-900">Proyectos</h1>
        <ListProyects />
      </div>
    </>
  )
}