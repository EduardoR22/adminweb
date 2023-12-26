export default function Comments({formik}: {formik:any}){
  return (
    <>
      <div className="mb-4 text-gray-700">
        <label className="block text-sm font-medium text-gray-500" htmlFor="comments">
          Comentarios
        </label>
        <textarea 
          className="shadow appearance-none border resize-none overflow-hidden rounded w-full mt-2 py-4 px-3 text-xs sm:text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
          id="comments"
          //type="text"
          placeholder="Deje sus comentarios.."
          value={formik.values.comments}
          onChange={formik.handleChange}
          onBlur={formik.handleChange}>
        </textarea>
      </div>
      {formik.touched.comments && formik.errors.comments ? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p>{formik.errors.comments}</p>
        </div>
      ) : null}
    </>
  )
}