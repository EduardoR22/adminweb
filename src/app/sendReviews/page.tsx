//import {getProjects, getIssues} from "@/api/routeReviews"
import { getProyects } from "../api/proyects/routeProyects";
import { getIssues } from "../api/issues/routeIssues";
import FormReview from "@/components/sendReviews/FormReview";

export default async function Reviews(){
  
  const token = '';
  let projects;
  try {
    projects = await getProyects(token);
    if(typeof(projects)==='string'){
      return <h1 className="text-center text-red-500">{projects}</h1>
    }
    if(!projects || projects.length === 0){
      return <h1 className="text-center text-red-500">No se encontraron proyectos..</h1>
    }
  } catch (error) {
    return <h1 className="text-center text-red-500">Error al consultar los proyectos..</h1>
  }

  let issues;
  try {
    issues = await getIssues(token);
    if(typeof(issues)==='string'){
      return <h1 className="text-center text-red-500">{issues}</h1>
    }
    if(!issues || issues.length === 0){
      return <h1 className="text-center text-red-500">No se encontraron issues..</h1>
    }
  } catch (error) {
    return <h1 className="text-center text-red-500">Error al consultar los issues..</h1>
  }

  //console.log(projects);
  //console.log(issues)
  return(
    <>
      <div className="flex justify-center ">
        <FormReview issues={issues} projects={projects.data.data} />
      </div>
    </>
    // <>Reviews</>
  )
}