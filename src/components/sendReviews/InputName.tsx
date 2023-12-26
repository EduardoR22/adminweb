export default function InputName({formik}: {formik:any}){
  return (
    <>
      <div className="mb-4 text-gray-700">
        <label className="block text-sm font-medium text-gray-500" htmlFor="name">
          Nombre
        </label>
        <input 
          className="shadow appearance-none border rounded w-full mt-2 py-4 px-3 text-xs sm:text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Deja tu nombre"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}>
        </input>
      </div>
      {formik.touched.name && formik.errors.name ? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p>{formik.errors.name}</p>
        </div>
      ) : null}
    </>
  )
}