import Image from "next/image"

export default function ContainerForm({children, title, subtitle, img, width}: 
          {children:any, title:string, subtitle:string, img:string, width:string}){
  
  let header;

  if(img !== ''){
    header =  <div className="flex mt-2 pl-7">
                <Image    
                  className="rounded-full"                      
                  // src={`/img/users/${photo}`}
                  src={img}
                  alt={'img'}
                  width={50}
                  height={50}                                    
                  priority={true}                                    
                />
                <div>
                  <p className="text-xl">{title}</p>
                  <p className="text-gray-500 text-sm">{subtitle}</p>
                </div>
              </div>
  }else{
    header = <></>
  }

  return(
    <>
      <div className="flex justify-center mt-6">
        <div className={`${width} shadow-2xl shadow-slate-300`}>
          {header}                   
          {children}
        </div>                        
      </div>
    </>
  )
}