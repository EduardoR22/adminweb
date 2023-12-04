export default function Upload({setFile}: {setFile: Function}){
  
  const onFileChange = (e: any) => {

    if(e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if(file.type.includes("image")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        setFile(file);
      } else {
        //showToastMessageError('Esta no es una imagen!, favor de agregar imagen');
      }
    }
  }
  
  return (
    <>
      {/* <label htmlFor="" className='text-gray-500 mb-3'>Fotografias</label> */}
      <div className='border-2 border-dashed rounded-md border-gray-200 relative py-3 md:px-2 w-full'>
        <input 
          type="file" 
          id="photo" 
          name="photo"
          onChange={onFileChange} 
          // multiple
          className="opacity-0 absolute inset-0	">                                            
        </input>
        <p className='text-center	'>Subir fotos</p>
      </div>
    </>
  )
}