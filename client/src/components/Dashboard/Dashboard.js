import { useState, useEffect } from 'react'
import { Conversation } from '../Conversation'
import { Sidebar } from '../Sidebar'
import './Dashboard.css'

function Dashboard({ onlineContact, contacts, conversations, setConversations, addMessage }) {

    const [ activeConversation, setActiveConversation ] = useState();

    useEffect(() => 
    {
        if( conversations )
        setActiveConversation( conversations[0] )
    }
    , [])


    return (
        <div className='dashboard'>
            <Sidebar 
                onlineContact={ onlineContact } 
                contacts={ contacts } 
                conversations = { conversations }
                setActiveConversation={ setActiveConversation }
                setConversations={ setConversations }
            />
            
            { activeConversation != null
                ? <Conversation 
                    onlineContact={ onlineContact }
                    contacts={ contacts }
                    activeConversation={ activeConversation } 
                    addMessage={ addMessage } 
                />
                : <div>
                    <h1> Invite some friends to talk.. </h1>
                </div>
            }
        </div>
    )
}

export default Dashboard
