export default function CategoryList({categories, setCategory, category}: 
          {categories:any, setCategory:Function, category:string}){
  
  return(
    <>
      <select name="" id="" 
          className="bg-white outline-none outline-0 shadow appearance-none border border-gray-400
          rounded-md w-full py-2 px-3 text-base text-gray-500 leading-tight font-sans 
          font-ligth focus:outline-none focus:shadow-outline" 
          //onChange={(e) => onChange(e.target.value) }
          defaultValue={category}
          onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((cat:any) => (
          <option value={cat.name} key={cat._id}>{cat.name}</option>
        ))}
      </select>
    </>
  )
}