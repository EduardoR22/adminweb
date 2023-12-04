import { cookies } from "next/headers"
import NavBarClient from "./NavBarClient";

export default function NavBar(){
  const cookieStore = cookies();
  let user:any = cookieStore.get('user')?.value;
  try {
    user = JSON.parse(user);
    if(!user) return <h1>Error usuario no ha iniciado sesion..</h1>

  } catch (error) {
    return <h1>Error al obtener autorizacion del usuario..</h1>
  }

  return(
    <>
      <NavBarClient user={user} />
    </>
  )
}