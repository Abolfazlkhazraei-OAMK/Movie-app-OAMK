export default function GroupChatMessage({ text, timestamp }) {
    return (
        <div className='chatMessage'>
            <div className='messageContent' dangerouslySetInnerHTML={{__html: text}}></div>
            <p className="messageTimestamp">{String(new Date(timestamp).toLocaleString())}</p>
        </div>
    )
}