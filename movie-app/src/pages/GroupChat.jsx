import React, { useState } from 'react'
import GroupChatMessage from "../components/GroupChatMessage";
import { Remarkable } from 'remarkable'

const md = new Remarkable('commonmark');

export default function GroupChat() {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    const addMessage = () => {
        if(message === '') return
        const renderedHTML = md.render(message)
        setMessages([...messages,{id: messages.length, text: renderedHTML}])
    }

    /**
     * Handles the submission of the chat messages
     * @param {Event} e 
     */
    const handleSubmit = (e) => {
        e.preventDefault()
        addMessage()
        setMessage('')
    }

    return (
        <main>
            <section>
                <div className='groupChat'>
                    <div className='commentInput'>
                        <label>
                            <textarea
                                className='form-control'
                                name='message'
                                form='messageForm'
                                placeholder='Add a comment'
                                rows={2}
                                cols={80}
                                maxLength={255}
                                minLength={1}
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                            />
                        </label>    
                        <form id='messageForm' onSubmit={handleSubmit}>
                            <input type='reset' value='Cancel' onClick={() => setMessage('')}></input>
                            <input type='submit' value='Comment'></input>
                        </form>
                    </div>
                    <div className='comments'>
                        {
                            messages.map(comment => {
                                return <GroupChatMessage key={comment.id} text={comment.text} timestamp={comment.timestamp}/>
                            })
                        }
                    </div>
                </div>
            </section>
        </main>
    )
}