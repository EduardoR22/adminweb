"use client"
import { useState, useEffect } from "react"
import Searcher from "../Searcher"
import Pagination from "../Pagination";
import Image from "next/image";
import { EllipsisHorizontalCircleIcon, StarIcon } from "@heroicons/react/24/solid";
import ViewReview from "./ViewReview";
import { useRouter } from "next/navigation";
//import { getReviewsByProyect } from "@/app/api/reviews/routeReviews";

export default function ListReviews({proyects, token, idP, image, reviewsP}: 
                          {proyects:any, token:string, idP:string, image:string, reviewsP:any}){
  
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [num_rows, setNumRows] = useState(10);
  const [length, setLength] = useState(proyects.length); 
  const [filter, setFilter] = useState(proyects.slice(currentPage, currentPage + num_rows));
  const [height, setHeight] = useState<string>((75 * num_rows).toString());
  const [viewReview, setViewReview] = useState<JSX.Element>(<></>);

  const router = useRouter();

  useEffect(() => {
    if(search.length === 0){
      setLength(proyects.length)
      setFilter(proyects.slice(currentPage, currentPage + num_rows))
    }else{
      const filtered = proyects.filter( (proyect: any) => proyect.title.toLowerCase().includes(search.toLowerCase()));
      setLength(filtered.length);
      setFilter(filtered.slice(currentPage, currentPage + num_rows));
    }
  }, [search, currentPage, num_rows])

  useEffect(() => {
    setHeight((95 * num_rows).toString());
  }, [num_rows])

  const onSearchChange = (value: string) => {
    setCurrentPage(0);
    setSearch(value);
  }
  
  const IndexPages = [
    {value: 10, text: '10'},
    {value: 25, text: '25'},
    {value: 50, text: '50'},
    {value: 100, text: '100'},
  ]

  const changeReview = (idProyect:string, img:string) =>{
    router.push(`/reviews?idp=${idProyect}&&img=${img}`);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  useEffect(() => {

    if(typeof(reviewsP)==='string'){
      setViewReview(<h1>{reviewsP}</h1>)
    }else{
      if(reviewsP.length > 0){
        setViewReview(<ViewReview reviews={reviewsP} width='w-full' image={image} token={token} />)
      }else{
        setViewReview(<h1>No hay reviews..</h1>)
      }
    }

  }, []);

  return(
    <div className="flex flex-wrap mt-5">
      <div className="w-full md:w-2/3 xl:w-1/2">
        <div className="flex">
          <div className="w-80"><Searcher search={search} searchChange={onSearchChange} placeholder="Buscar review" /></div>
        </div>
        {/* <div style={{height:`${height}px`}}> */}
        <div>
          <table className="mt-5">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-gray-500 bg-slate-200">
                <th className="w-20 py-1">&nbsp;</th>
                <th className="w-20">Estatus</th>
                <th className="w-56 text-left">Nombre / Subtitulo</th>
                <th className="w-28 text-left">Total reseñas</th>
                <th className="w-20 text-left">Reseñas</th>
              </tr>
            </thead>
            <tbody>
              {filter.map((proyect:any, index:number) => (
                <tr key={proyect._id} onClick={() => changeReview(proyect._id, proyect.images[0].photo)} 
                    className={`${index%2===0? 'cursor-pointer bg-white':'cursor-pointer bg-slate-200'}`}>
                  <td>
                    <div className="flex justify-center">
                      <Image src={proyect.images[0].photo} alt="profile" width={30} height={30} />
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center items-center text-green-600">
                      <EllipsisHorizontalCircleIcon width={40} height={25} />
                    </div>
                  </td>
                  <td>
                    <div className="py-1">
                      <p className="text-gray-800">{proyect.title}</p>
                      <p className="text-gray-400">{proyect.subtitle}</p>
                    </div>
                  </td>
                  <td>
                    <div>
                      {/* <p className="text-gray-800 text-center">{review.rating}</p>
                      <p className="text-gray-400">2023-07-20</p> */}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center">
                      {/* <Rating defaultValue={review.ratingAverage} precision={0.5} readOnly /> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center mt-3">
          <Pagination IndexPages={IndexPages} currentPage={currentPage} num_rows={num_rows} 
                      setCurrentPage={setCurrentPage} setNumRows={setNumRows} 
                      length={length}/>
        </div>
      </div>
      <div className="w-full md:w-1/3 mt-7 md:mt-0 ">
        {viewReview}
      </div>
    </div>
  )
}