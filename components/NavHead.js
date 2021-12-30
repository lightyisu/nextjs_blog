import Link from "next/link"
export default function NavHead(){
    return(
        <header className='text-black p-4 border-solid border-b flex relative content-center border-gray-300 '>
        <Link href='/'>
        <i className='bg-logo bg-90%  cursor-pointer inline-block w-11 bg-no-repeat h-3.4r p-2 ml-10 '></i>
        </Link>
       
        <div className='absolute right-7 top-7 flex content-end'>
        
        <label for="toggle">
           
            <input type="checkbox" id='toggle' />
            <span className='toggle'></span>
        </label>
        </div>
    </header>
    )
}