import ListReviews from "@/components/reviews/ListReviews"
import NavBar from "@/components/Navigation/NavBar"

export default function Reviews(){
  return(
    <>
      <NavBar />
      <div className="p-10">
        <h1 className="font-semibold text-gray-900">Proyectos</h1>
        <ListReviews />
      </div>
    </>
  )
}