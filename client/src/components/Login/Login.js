import './Login.css';

import { useRef } from 'react';

import { v4 as generateId } from 'uuid';

import { useContacts } from '../../Contexts/ContactsProvider';
import { useOnlineContact } from '../../Contexts/OnlineContactProvider';
import { useSocket } from '../../Contexts/SocketProvider';

function Login() {

    const { contacts, createContact } = useContacts();
    const { setOnlineContact } = useOnlineContact();
	const { socket } = useSocket();

    const contactRef = useRef();

    // login contact and create if needed
	function loginContact()
	{
        const contactname = contactRef.current.value;
		const contact = contacts.find( contact => contact.contactName === contactname );

		if( contact )
		{
			setOnlineContact( contact );
		}
		else
		{
			const newContact = { id: generateId(), contactName: contactname };
			socket.emit( 'create-contact', newContact );
			createContact( newContact )
			setOnlineContact( newContact );
		}
	}

    return (
        <div className='login'>
            <h1> Live Chat </h1>
            <input type='text' ref={ contactRef } className='text-input' placeholder='Name'/>
            <input type='submit' className='btn' value='Enter chat' onClick={ () => loginContact() }/>
        </div>
    )
}
export default Login