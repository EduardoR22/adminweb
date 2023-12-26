"use client"
import { useState, useEffect } from "react"
import { useFormik } from "formik";
import * as Yup from 'yup';
import ButtonIssue from "./ButtonIssue";
import { createReview } from "@/app/api/routeReviews";
import StarElement from "./StarElement";
import UploadImage from "./UploadImage";
import Comments from "./Comments";
import InputName from "./InputName";
import InputEmail from "./InputEmail";
import SelectProjects from "./SelectProjects";
import Alert, {showToastMessage, showToastMessageError} from "../Alert";
import { useRouter } from "next/navigation";

export default function FormReview({issues, projects}: {issues:any, projects:any}){
  
  const [project, setProject] = useState<string>(projects[0]._id);
  const [file, setFile] = useState<any>();
  const [rating, setRating] = useState<number>(5);
  const [filter, setFilter] = useState<any[]>();
  const [issueList, setIssueList] = useState<any[]>([]);
  const [category, setCategory] = useState<string>();
  
  const router = useRouter();

  const onProjectChange = (value:string) => {
    setProject(value);
  }

  const formik = useFormik({
    initialValues: {
      email:'',
      name:'',
      comments: ''
    }, 
    validationSchema: Yup.object({
      email: Yup.string()
                  .email('El email no es valido')
                  .required('El email no puede ir vacio'),
      name: Yup.string()
                  .required('El nombre es obligatorio'),
      comments: Yup.string()
                  .required('Los comentarios son obligatorios')
    }),
    onSubmit: async (valores) => {
      const {name, email, comments} = valores;

      const issuelist:string[] = [];

      issueList.map((issue: any) => {
        if(issue.state){
          issuelist.push(issue.id);
        }
      })

      const dataReview = new FormData();
      dataReview.append('name', name);
      dataReview.append('email', email);
      dataReview.append('review', comments);
      if(category) dataReview.append('category', category);
      dataReview.append('rating', rating.toString());
      issuelist.map((issue) => {
        dataReview.append('issuelist', issue);
      })
      dataReview.append('project', project);
      dataReview.append('photo', file);

      const review = {
        name,
        email,
        'review': comments,
        category,
        rating,
        issuelist,
        project,
        "photo": "/public/img/clients/default.jpg",
      }

      try {
        console.log('create revieww');
        const res = await createReview(review);
        if(typeof(res)==='string'){
          //console.log(res);
          showToastMessageError(res);
        }
        if(res === 201) {
          showToastMessage('Review enviada exitosamente!!')
          router.refresh();
          // router.push('')
        }
      } catch (error) {
        showToastMessageError('Error al enviar review!!');
        console.log(error);
      }                                  
    },       
  });
  
  useEffect(() => {
    const filtered = issues.filter((issue: any) => issue.rating === rating); 
    setFilter(filtered);
    const issuesAux:any[] = [];
    filtered.map((issueFilter:any) => {
      issuesAux.push({
        id: issueFilter._id,
        state: false,
      })
    })
    setIssueList(issuesAux);
    if(filtered && filtered.length > 0){
      setCategory(filtered[0].category);
    }
  }, [rating])

  const selectIssue = (index: number) => {
    const newArray: any[] = [...issueList];
    newArray[index] = {
      id: newArray[index].id,
      state: !newArray[index].state,
    }
    setIssueList(newArray);
  }

  const selectRating = (value: number) => {
    setRating(value);
  }

  return (
    <>
      <Alert/>
      <form className="bg-white rounded shadow-md w-full sm:w-10/12 lg:w-2/3 xl:w-1/2 md:px-8 pt-6 pb-3" encType="multipart/form-data" onSubmit={formik.handleSubmit}>                            
        <div>
          <div className="flex flex-wrap">
            <div className="w-full px-2 sm:w-1/2 mb-4 text-gray-700">
              <SelectProjects projectChange={onProjectChange} projects={projects} project={project} />
            </div>
            <div className="w-full sm:w-1/2 px-3 sm-px-5">
              <InputName formik={formik} />
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full sm:w-1/2 px-3 sm-px-5">
              <InputEmail formik={formik} />
            </div>
            <div className="w-full sm:w-1/2 px-3 sm-px-5">
              <UploadImage setFile={setFile} />
            </div> 
          </div>
        </div>
        <div className="flex px-2 justify-center">
          <StarElement index={1} rating={rating} selectRating={selectRating} />
          <StarElement index={2} rating={rating} selectRating={selectRating} />
          <StarElement index={3} rating={rating} selectRating={selectRating} />
          <StarElement index={4} rating={rating} selectRating={selectRating} />
          <StarElement index={5} rating={rating} selectRating={selectRating} />
        </div>
        <div className="flex flex-wrap justify-center px-2 mt-3">
          {filter?.map((issue:any, index:number) => (
            <ButtonIssue selectIssue={selectIssue} index={index} key={issue._id} issue={issue} />
          ))}
        </div>
        <div className="flex mt-3">
          <div className="w-full px-3 sm-px-5">
            <Comments formik={formik} />
          </div>
        </div>
        <div className="flex justify-center my-2">
          <button className="rounded-md bg-blue-600 hover:bg-blue-500 text-white w-36 h-8" type="submit">Enviar</button>
        </div>
      </form>
    </>
  )
}