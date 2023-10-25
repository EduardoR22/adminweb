export default function Button({textB, typeB, styleB}: 
                            {textB:string, typeB:string, styleB: string}){
 
  return(
    <button className={`group flex items-center justify-center space-x-2 rounded-full border 
          px-5 py-2 text-sm transition-colors ${styleB}`} 
        type={`${typeB == 'button'? "button" : "submit"}`}>
      <p>{textB}</p>
    </button>
  )
}