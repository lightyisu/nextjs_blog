export default function NavHead(){
    return(
        <header className='text-black p-4 border-solid border-b flex relative content-center border-gray-300 '>

        <i className='bg-logo bg-90%  inline-block w-11 bg-no-repeat h-3.4r p-2 ml-10 '></i>
        <div className='absolute right-7 top-7 flex content-end'>
        
        <label for="toggle">
           
            <input type="checkbox" id='toggle' />
            <span className='toggle'></span>
        </label>
        </div>
    </header>
    )
}