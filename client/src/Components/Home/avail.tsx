//Material components
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//SVG
import {ReactComponent as LineDesign} from '../../images/SVG/Line Design.svg';

//Graphql
import {useMutation} from 'react-apollo';
import {SUBSCRIBE} from '../../Graphql/mutation';

//Utils
import React from 'react';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle:any = makeStyles(theme => ({
	root: {
		minHeight: 413,
		position: 'relative',
		color: 'white',
		[theme.breakpoints.down('xs')]: {
			minHeight: 383,
		}
	},
	bg: {
		backgroundColor: '#191919',
		position: 'absolute',
		zIndex: -2,
		height: '100%',
		width: '100%',
	},
	design: {
		transform: 'scaleY(-1)',
		position: 'absolute',
		zIndex: -1,
		bottom: 35,
		[theme.breakpoints.down('md')]: {
			width: '30%',
		},
		[theme.breakpoints.down('xs')]: {
			width: '40%',
			height: 60,
			bottom: 10,
		}
	},
	designLeft: {
		left: 0,
		transform: 'scale(-1, -1)',
	},
	designRight: {
		right: 0,
	},
	container: {
		marginTop: 50,
		textAlign: 'center',
		'& > div.MuiGrid-item': {
			marginBottom: 15,
			width: '50%',
			[theme.breakpoints.down('md')]: {
				width: '60%',
			},
			[theme.breakpoints.down('sm')]: {
				width: '80%',
			},
			[theme.breakpoints.down('xs')]: {
				width: '90%',
			}
		}
	},
	title: {
		margin: 0,
		fontSize: '2rem',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.8rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.5rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.3rem',
		}
	},
	textfield: {
		width: 300,
		[theme.breakpoints.down('sm')]: {
			width: 250,
		},
		[theme.breakpoints.down('xs')]: {
			width: 200,
		},
		'& > div.MuiInputBase-root': {
			backgroundColor: 'white',
			height: 35,
			borderRadius: 5,
			'&:before': {
				borderBottom: 0,
			},
			'&:after': {
				borderBottom: 0,
			},
			'& input': {
				padding: '15px 10px',
			}
		}
	},
	subscribe: {
		backgroundColor: '#FFA114',
		minWidth: 100,
		color: 'white',
		fontWeight: 600,
		fontSize: '1.1rem',
		[theme.breakpoints.down('md')]: {
			fontSize: '1rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.9rem',
		}

	},
	details: {
		margin: 0,
		fontSize: '0.95rem',
		[theme.breakpoints.down('md')]: {
			fontSize: '0.93rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.9rem'
		}
	},
	msg: {
		fontSize: '1.1rem',
		margin: '8px 0px',
		textAlign: 'center',
		color: 'white',
		fontWeight: 600,
	},
	progress: {
		height: 20,
		animation: 'none',
		'& svg': {
			transform: 'scale(0.70) translateY(-2px)',
		}
	}
}));

interface MessageStatus {
	message: string;
	error: boolean;
}

const HomeAvail = ():JSX.Element => {
	const classes:any = useStyle();
	const [subscribe, {loading, data}] = useMutation(SUBSCRIBE);
	const [email, setEmail]: [string, Function] = React.useState("");
	const [msg, setMsg]: [MessageStatus, Function] = React.useState({error: false, message: ""});
	const handleEmail = (e:any):void => setEmail(e.target.value);
	const submitEmail = ():void => {
		if (loading) return;
		setMsg({error: false, message: ""});
		subscribe({ variables: {email: email } });
	}
	React.useEffect(() => {
		if (data) { 
			setMsg(data.subscribe);
			if (!data.subscribe.error) setEmail("");
		}
	}, [data]);
	return (
		<Grid item className={classes.root} xs={12} container justify="center">
			<div className={classes.bg} />
			<LineDesign viewBox="0 0 400 109.298" className={[classes.design, classes.designLeft].join(' ')} />
			<LineDesign viewBox="0 0 400 109.298" className={[classes.design, classes.designRight].join(' ')} />
			<Grid item container direction="column" alignItems="center" xs={11} md={10} className={classes.container}>
				<Grid item>
					<h2 className={classes.title}> Avail <span style={{color: '#FFA114'}}>Alpha</span> Service now! </h2> 
				</Grid>
				<Grid item>
					{msg.message
						?<p className={classes.msg} style={{color: msg.error ?"red" :""}}> 
							{msg.message} 
						</p>
						:""
					}
				</Grid>
				<Grid item>
					<form onSubmit={(e) => {e.preventDefault(); submitEmail(); }}>
						<TextField className={classes.textfield} placeholder="Email address..." value={email} onChange={handleEmail} variant="filled" />
						<input style={{display: 'none'}} type="submit" />
					</form>
				</Grid>
				<Grid item>
					<Button 
						className={classes.subscribe} 
						onClick={submitEmail}
						disabled={loading}
						style={{height: loading ?35 :"initial"}}
					> {loading
						?<CircularProgress className={classes.progress} />
						:"SUBSCRIBE"
					} </Button>
				</Grid>
				<Grid item>
					<p className={classes.details}>
						By subscribing with your email address, we will be able to send you a message, and we can further discuss about your inquiries.
					</p>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default HomeAvail;