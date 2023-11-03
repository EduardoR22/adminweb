export default function Upload(){
  return (
    <>
      {/* <label htmlFor="" className='text-gray-500 mb-3'>Fotografias</label> */}
      <div className='border-2 border-dashed rounded-md border-gray-200 relative p-4 w-full'>
        <input 
          type="file" 
          id="photo" 
          name="photo" 
          multiple
          className="opacity-0 absolute inset-0	">                                            
        </input>
        <p className='text-center	'>Subir fotos</p>
      </div>
    </>
  )
}