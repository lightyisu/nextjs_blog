import {parseISO,format} from 'date-fns'

export default function Date({dateString}){
    const date=parseISO(dateString);
    return <time dateTime={dateString}><i className='text-lg'>{format(date,'LLLL d,yyyy')}</i></time>
}