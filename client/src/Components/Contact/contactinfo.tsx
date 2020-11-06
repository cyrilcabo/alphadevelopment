import React from 'react';

//Material components
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Graphql
import {useMutation} from 'react-apollo';
import {CONTACT} from '../../Graphql/mutation';

//Style components
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	title: {
		margin: '70px 0px 20px 0px',
		fontSize: '3rem',
		fontFamily: 'arial, helvetica, sans-serif',
		fontWeight: 550,
		textAlign: 'center',
		[theme.breakpoints.down('md')]: {
			fontSize: '2.5rem',
			margin: '60px 0px 15px 0px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '2rem',
			margin: '40px 0px 0px 0px'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.75rem',
			margin: '15px 0px 0px 0px'
		}
	},
	boxContainer: {
		width: '80%',
		'& > div.MuiGrid-item': {
			width: '100%',
			marginBottom: 15,
		},
		marginBottom: 20,
		[theme.breakpoints.down('md')]: {
			marginBottom: 15,
		},
		[theme.breakpoints.down('sm')]: {
			marginBottom: 5,
			width: '90%'
		},
		[theme.breakpoints.down('xs')]: {
			maxWidth: 300,
		}
	},
	textBox: {
		'& > div.MuiInputBase-root': {
			backgroundColor: 'white'
		},
		'& input.MuiFilledInput-input': {
			paddingTop: 20,
		}
	},
	textBoxDetails: {
		'& >div.MuiInputBase-root': {
			height: 240,
			display: 'flex',
			alignItems: 'flex-start',
			paddingTop: 20,
			[theme.breakpoints.down('sm')]: {
				height: 150,
			}
		}
	},
	button: {
		backgroundColor: '#297f89',
		color: '#f1f1f1',
		width: 100,
		fontSize: '1.2rem',
		fontWeight: 550,
		padding: '2px 20px',
		marginBottom: 20,
		'& .MuiCircularProgress-root': {
			margin: 5,
			height: '1.5rem !important',
			width: '1.5rem !important',
			[theme.breakpoints.down('xs')]: {
				height: '25px !important',
				width: '25px !important'
			}
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '1.1rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1rem',
			padding: '2px 15px',
		}
	},
	
}));

interface Props {
	placeholder?: string;
	title?: string;
	className?: string;
}

const ContactInfo = (props: Props):JSX.Element => {
	const classes = useStyle();
	//Message states
	const [contactInfo, setContactInfo] = React.useState("");
	const [messageInfo, setMessageInfo] = React.useState(props.placeholder || "");
	const [errorInfo, setErrorInfo] = React.useState({error: false, message: ""});
	const [counter, setCounter] = React.useState(2);
	const [sendQuery, {data, loading, error}] = useMutation(CONTACT);
	//Display helper message
	const handleInfo = (type: string) => {
		if (counter <= 0) return false;
		if (type==="UNSET") setCounter(counter-1);
		setErrorInfo({
			error: false, 
			message: type==="SET" ?"How we can reach you back." :""
		});
	}
	//Save user input
	const handleContactInfo = (e: Event | any) => setContactInfo(e.target.value);
	const handleMessageInfo = (e: Event | any) => setMessageInfo(e.target.value);
	//Send message
	const sendMessage = ():void => {
		if (!contactInfo || !messageInfo) {
			setErrorInfo({error: true, message: "All fields necessary!"});
			return;
		}
		setErrorInfo({error: false, message: ""});
		sendQuery({variables: {contact: contactInfo, message: messageInfo}});
	}

	React.useEffect(() => {
		if (data) {
			setErrorInfo(data.contact);
			if (!data.error) {
				setContactInfo("");
				setMessageInfo("");
			}
		}
	}, [data]);

	React.useEffect(() => {
		if (error) setErrorInfo({error: true, message: "Something went wrong."});
	}, [error]);

	return (
		<Grid item xs={12} container direction={"column"} alignItems={"center"} className={props.className}>
			<Grid item>
				<h2 className={classes.title}> {props.title || "Talk with us!"} </h2>
			</Grid>
			<Grid item container direction={"column"} alignItems={"center"} className={classes.boxContainer}>
				<Grid item>
					<Grid item style={{textAlign: 'center'}}>
						<p style={{color: errorInfo.error ?'maroon' :'green'}}> {errorInfo.message} </p>
					</Grid>
					<Grid item container>
						<TextField 
							fullWidth 
							variant="filled" 
							color="secondary" 
							className={classes.textBox}
							onChange={handleContactInfo}
							onFocus={handleInfo.bind(ContactInfo, "SET")}
							onBlur={handleInfo.bind(ContactInfo, "UNSET")}
							value={contactInfo}
							placeholder={'Email / Phone number'}
						/>
					</Grid>
				</Grid>
				<Grid item>
					<TextField
						fullWidth
						variant="filled"
						color="secondary"
						className={[classes.textBox, classes.textBoxDetails].join(' ')}
						placeholder={`"I would like to have a website. Can you help me?"`}
						onChange={handleMessageInfo}
						value={messageInfo}
						multiline
					/>
				</Grid>
			</Grid>
			<Grid item>
				<Button 
						variant="contained" 
						className={classes.button}
						disabled={loading}
						onClick={sendMessage}
					> 
					{loading
						?<CircularProgress />
						:"Send" 
					}
				</Button>
			</Grid>
		</Grid>
	);
}

export default ContactInfo;