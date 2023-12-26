export default function SelectProjects({project, projectChange, projects}:
                                  {project:string, projectChange:Function, projects:any}){

  const onProjectChange = (value:string) => {
    projectChange(value);
  }

  return(
    <>
      <label className="block text-sm font-medium text-gray-500" htmlFor="project">
        Proyecto
      </label>
      <select className="bg-white mt-2 outline-none outline-0 shadow appearance-none border 
              rounded w-full py-4 px-3 text-xs sm:text-base text-gray-500 leading-tight font-sans 
              font-ligth focus:outline-none focus:shadow-outline"
        onChange={(e) => onProjectChange(e.target.value)}
        value={project}
      >
        {projects.map((proyect:any, index:number) => (
          <option value={proyect._id} key={index}>{proyect.title}</option>
        ))}
      </select>
    </>
  )
}