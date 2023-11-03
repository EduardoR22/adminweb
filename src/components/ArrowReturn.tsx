import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function ArrowReturn({url, width, height}: {url:string, width:number, height:number}){
  return(
    <Link href={url}>
      <ArrowLeftIcon width={width} height={height} className='text-gray-500' />
    </Link>
  )
}