import ListReviews from "@/components/reviews/ListReviews"
import NavBar from "@/components/Navigation/NavBar"
//import { getReviews } from "../api/reviews/route"
import { cookies } from "next/headers"
import { getProyects } from "../api/proyects/routeProyects"
import { getReviewsByProyect } from "../api/reviews/routeReviews"

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
  
  let reviews;
  try {
    if(idP!== ''){
      reviews = await getReviewsByProyect(token, idP);
      if(typeof(reviews) === 'string') 
        return <h1>{reviews}</h1>  
    } 
  } catch (error) {
    return <h1>Error al obtener reviews</h1>
  }

  //console.log(reviews);

  if(!reviews) reviews=''

  return(
    <>
      <NavBar />
      <div className="px-1 sm:px-10">
        <ListReviews proyects={proyects.data.data} token={token} idP={idP} image={img} reviewsP={reviews} />
      </div>
    </>
  )
}