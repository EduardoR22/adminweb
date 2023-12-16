import ListReviews from "@/components/reviews/ListReviews"
import NavBar from "@/components/Navigation/NavBar"
//import { getReviews } from "../api/reviews/route"
import { cookies } from "next/headers"
import { getProyects } from "../api/proyects/route"

export default async function Reviews({searchParams}: {searchParams:{idp:string, img:string}}){
  
  const cookiestore = cookies();
  const token = cookiestore.get('token')?.value || '';
  
  const idP = searchParams.idp? searchParams.idp : '';
  const img = searchParams.img? searchParams.img : '';

  let proyects;
  try {
    proyects = await getProyects(token);
    if(typeof(proyects) === 'string') 
      return <h1>{proyects}</h1>
  } catch (error) {
    return <h1>Error al obtener proyectos con reviews</h1>
  }
  
  // let reviews;
  // try {
  //   reviews = await getReviews(token);
  //   if(typeof(reviews) === 'string') 
  //     return <h1>{reviews}</h1> 
  // } catch (error) {
  //   return <h1>Error al obtener reviews</h1>
  // }

  //console.log(reviews);

  return(
    <>
      <NavBar />
      <div className="p-10">
        <h1 className="font-semibold text-gray-900">Reviews</h1>
        <ListReviews proyects={proyects.data.data} token={token} idP={idP} image={img} />
      </div>
    </>
  )
}