export default function UploadImage({setFile}: {setFile:Function}){
  
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
  return(
    <div className="mb-4 text-gray-700">
      <label className="block text-sm font-medium text-gray-500 mb-2" htmlFor="photo">
        Adjunta tu foto (opcional):
      </label>
      <div className='border-2 border-dashed rounded-md border-gray-200 relative py-4  w-full'>
        <input
          type="file" 
          id="photo" 
          name="photo"
          onChange={onFileChange} 
          className="opacity-0 absolute inset-0 w-full">                                            
        </input>
        <p className='text-center	'>Subir imagen</p>
      </div>
    </div>
  )
}