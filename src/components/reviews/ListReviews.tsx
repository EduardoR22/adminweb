"use client"
import { useState, useEffect } from "react"
import Searcher from "../Searcher"
import Pagination from "../Pagination";
import Image from "next/image";
import { EllipsisHorizontalCircleIcon, StarIcon } from "@heroicons/react/24/solid";
import ViewReview from "./ViewReview";
import { useRouter } from "next/navigation";
import { getReviewsByProyect } from "@/app/api/reviews/route";

export default function ListReviews({proyects, token, idP, image}: 
                          {proyects:any, token:string, idP:string, image:string}){
  
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
      const filtered = proyects.filter( (proyect: any) => proyect.name.toLowerCase().includes(search.toLowerCase()));
      setLength(filtered.length);
      setFilter(filtered.slice(currentPage, currentPage + num_rows));
    }
  }, [search, currentPage, num_rows])

  useEffect(() => {
    setHeight((75 * num_rows).toString());
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

  const [reviews, setReviews] = useState<any>();
  const getReviewsProyect = async (idProyect:string, img:string) => {
    try {
      const res = await getReviewsByProyect(token, idProyect);
      setReviews(res);
      if(typeof(res) === 'string')
        return <h1>{reviews}</h1>
      
      if(res.length > 0){
        setViewReview(<ViewReview reviews={res} width="w-full" image={img} token={token} />)
      }else{
        setViewReview(<h1>No hay reviews..</h1>)
      }
    } catch (error) {
      return <h1>Error al obtener las reviews del proyecto...</h1>
    }
  }

  useEffect(() => {
    setViewReview(<></>)
    if(idP !== '' && image !== ''){
      getReviewsProyect(idP, image);
    }
  }, []);

  return(
    <div className="flex mt-5">
      <div className="w-2/3">
        <div className="flex">
          <div className="w-1/3"><Searcher search={search} searchChange={onSearchChange} placeholder="Buscar review" /></div>
        </div>
        <table className="mt-5">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-gray-500">
              <th className="w-20">&nbsp;</th>
              <th className="w-20">Estatus</th>
              <th className="w-56 text-left">Nombre / Subtitulo</th>
              <th className="w-28 text-left">Total reseñas</th>
              <th className="w-20 text-left">Reseñas</th>
            </tr>
          </thead>
          <tbody>
            {proyects.map((proyect:any) => (
              <tr key={proyect._id} onClick={() => changeReview(proyect._id, proyect.images[0].photo)} 
                  className="cursor-pointer">
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
                  <div>
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
        <div className="flex justify-center items-center mt-3">
          <Pagination IndexPages={IndexPages} currentPage={currentPage} num_rows={num_rows} 
                      setCurrentPage={setCurrentPage} setNumRows={setNumRows} 
                      length={length}/>
        </div>
      </div>
      <div className="w-1/3">
        {viewReview}
      </div>
    </div>
  )
}