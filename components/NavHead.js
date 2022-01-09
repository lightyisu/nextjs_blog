import Link from "next/link"
import MoveBanner from "./moveBanner"
export default function NavHead(){
    return(
        <header className='text-black p-4 border-solid border-b flex relative content-center border-gray-300 '>
        <Link href='/'>
        <i className='bg-logo bg-90%  cursor-pointer inline-block w-11 bg-no-repeat h-3.4r p-2 sm:ml-10 ml-4 '></i>
        </Link>
        <i className="bg-multiply-icon inline-block w-8 h-8 m-2   bg-90%"/>
        <MoveBanner/>
        <div className='absolute right-7 top-7 flex content-end'>
        
        <label for="toggle">
           
            <input type="checkbox" id='toggle' />
            <span className='toggle'></span>
        </label>
        </div>
    </header>
    )
}