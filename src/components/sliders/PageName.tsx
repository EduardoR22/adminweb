export default function PageName({pageName, setPageName, pagesName}: 
                        {pageName:string, setPageName:Function, pagesName:any}){
  
  return(
    <>
      <select name="" id="" 
          className="bg-white outline-none outline-0 shadow appearance-none border border-gray-400
          rounded-md w-full py-2 px-3 text-base text-gray-500 leading-tight font-sans 
          font-ligth focus:outline-none focus:shadow-outline" 
          //onChange={(e) => onChange(e.target.value) }
          defaultValue={pageName}
          onChange={(e) => setPageName(e.target.value)}
      >
        {pagesName.map((page:any) => (
          <option value={page.name} key={page._id}>{page.name}</option>
        ))}
      </select>
    </>
  )
}