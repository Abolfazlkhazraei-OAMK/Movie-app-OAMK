import { Remarkable } from 'remarkable'

const md = new Remarkable('commonmark');

export default function GroupChatMessage({ text, timestamp }) {
    const renderedHTML = md.render(text)
    return (
        <div className='chatMessage'>
            <div className='messageContent' dangerouslySetInnerHTML={{__html: renderedHTML}}></div>
            <time dateTime={timestamp}/>
        </div>
    )
}