import React from 'react';

//Custom components
import ContactForm from './contactform';
import Modal from '../Modal/modal';

interface Props {
	handleClose: HandleClose;
	open: boolean;
	title?: string;
	placeholder?: string;
}

interface HandleClose {
	(): void;
}

const ContactContainer = (props: Props):JSX.Element | null => {
	return (props.open) 
		?<Modal handleClose={props.handleClose} dark>
			<ContactForm title={props.title} placeholder={props.placeholder} />
		</Modal>
		:null;
}

export default ContactContainer;