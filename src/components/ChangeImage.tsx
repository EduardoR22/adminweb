"use client"
import Alert,{ showToastMessageError } from "./Alert";

export default function ChangeImage({setFile}: {setFile: Function}){
  
  const onFileChange = (e: any) =>{
    if(e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if(file.type.includes("image")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        setFile(file);
      } else {
        showToastMessageError('Esta no es una imagen!, favor de agregar imagen');
      }
    }
  }
  
  return(
    <>
      <Alert />
      <div className='border rounded-md border-gray-200 relative p-4 w-5/6'>
        <input 
          type="file" 
          id="photo" 
          name="photo" 
          onChange={onFileChange}
          className="opacity-0 absolute inset-0	">                                            
        </input>
        <p className='text-center	'>Cambiar Foto</p>
      </div>
    </>
  )
}