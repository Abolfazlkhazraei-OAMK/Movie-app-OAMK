import React, { useEffect, useState } from 'react'
import GroupChatMessage from "../components/GroupChatMessage";
import { Remarkable } from 'remarkable'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const md = new Remarkable('commonmark');

export default function GroupChat() {
    const { groupId } = useParams();
    const currentUser = sessionStorage.getItem('user')
    console.log(currentUser)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3001/messages/${groupId}`)
            .then(response => {
                console.log(response.data)
                setMessages(response.data)
            })
            .catch(error => {
                alert(error)
            })
    }, [groupId])

    const addMessage = () => {
        if(message === '') return
        const user = JSON.parse(currentUser)
        axios.post(`http://localhost:3001/messages/${groupId}/post`, {
            userId: user.id,
            message: message
        })
        .then(response => {
            setMessages([...messages,{group_id: response.data.group_id,
                                      user_id: response.data.user_id,
                                      message_content: response.data.message_content,
                                      message_timestamp: response.data.message_timestamp
            }])
            console.log(response.data)
            setMessage('')
        }).catch(error => {
            alert(error.response.data.error ? error.response.data.error : error)
        })
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
                <h1>Current group id : {groupId}</h1>
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
                            messages.map((comment, index) => {
                                return <GroupChatMessage key={index} text={comment.message_content} timestamp={comment.message_timestamp}/>
                            })
                        }
                    </div>
                </div>
            </section>
        </main>
    )
}