export default function InputEmail({formik}: {formik:any}){
  return(
    <>
      <div className="mb-4 text-gray-700">
        <label className="block text-sm font-medium text-gray-500" htmlFor="email">
          Correo
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-4 px-3 mt-2 text-xs sm:text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="tucorreo@dominio.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}>
        </input>
      </div>
      {formik.touched.email && formik.errors.email ? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p>{formik.errors.email}</p>
        </div>
      ) : null}
    </>
  )
}