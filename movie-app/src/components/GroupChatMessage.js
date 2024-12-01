export default function GroupChatMessage({ text, timestamp }) {
    return (
        <div className='chatMessage'>
            <div className='messageContent' dangerouslySetInnerHTML={{__html: text}}></div>
        </div>
    )
}