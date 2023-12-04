import { ArrowPathIcon } from "@heroicons/react/24/solid"

export default function Loading(){
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div>
        <ArrowPathIcon width={40} height={40} className="animate-spin h-56 w-56 mr-3 text-slate-600" />
        <p className="text-center text-2xl mt-2">Loading ...</p>
      </div>
    </div>
  )
}