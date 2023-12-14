import { CurrencyDollarIcon } from "@heroicons/react/24/solid"

export default function Reviews({review}: {review:any}){
  return(
    <>
      <div className="w-full flex flex-wrap mt-5">
        <div className='flex justify-around flex-wrap'>
          {review.issuelist.map((issue:any) => (
            <button key={issue._id}
              className='w-40 text-sm md:text-base pl-2 md:pl-0.5 h-auto py-1 m-3 
                shadow-gray-400 shadow-md rounded-lg flex justify-between items-center 
                bg-green-600 text-white'
            >
              {issue.issue}           
              <CurrencyDollarIcon width={15} height={15} />         
            </button>
          ))}
        </div>
      </div>
      <div>
        <textarea value={review.review} readOnly 
            className="resize-none p-5 w-full bg-slate-300 rounded-md ml-2 mr-8 mt-2" />
      </div>
    </>
  )
}