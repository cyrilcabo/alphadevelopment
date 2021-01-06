//Material components
import Grid from '@material-ui/core/Grid';

//Custom components
import ContactContainer from '../Contact/contactcontainer';

//Utils
import React from 'react';

//SVG
import {ReactComponent as CallIcon} from '../../images/SVG/call_icon.svg';
import {ReactComponent as EmailIcon} from '../../images/SVG/email_icon.svg';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle:any = makeStyles(theme => ({
	root: {
		minHeight: 493,
		backgroundColor: '#212121',
		textAlign: 'center',
		color: 'white',
		marginBottom: 100,
		[theme.breakpoints.down('md')]: {
			minHeight: 400,
		},
		[theme.breakpoints.down('sm')]: {
			minHeight: 335,
			paddingBottom: 50,
			marginBottom: 60,
		},
	},
	title: {
		fontSize: '2.25rem',
		margin: '80px 0px 40px 0px',
		[theme.breakpoints.down('md')]: {
			fontSize: '2rem',
			marginBottom: 30,
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.8rem',
			marginTop: 60,
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.4rem',
			marginBottom: 15,
			marginTop: 50,
		}
	},
	details: {
		margin: 0,
		fontSize: '1.2rem',
		lineHeight: '30px',
		fontFamily: 'serif',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.1rem',
		},
		[theme.breakpoints.down('sm')]: {
			letterSpacing: '1px',
			fontSize: '0.9rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '0.85rem',
			lineHeight: '25px',
		}
	},
	contactContainer: {
		marginBottom: 20,
		'& > div.MuiGrid-item': {
			margin: '10px 20px',
		},
		[theme.breakpoints.down('md')]: {
			marginBottom: 10,
		}
	},
	contact: {
		fontSize: '1rem',
		letterSpacing: '1px',
		margin: 0,
		textDecoration: 'none',
		color: 'white',
		'&:hover': {
			color: '#FFA114'
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '0.95rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.9rem'
		}
	},
	icon: {
		[theme.breakpoints.down('sm')]: {
			height: 25,
		},
		[theme.breakpoints.down('xs')]: {
			height: 20,
		}
	},
	sendMessage: {
		margin: "0px 0px 20px 0px",
		fontSize: '1.2rem',
		fontWeight: 550,
		color: '#10cafc',
		cursor: 'pointer',
		'& p': {
			margin: 0,
		},
		'&:hover': {
			color: 'white',
			textShadow: '0px 0px 2px #313131',
		},
		[theme.breakpoints.down('md')]: {
			fontSize: '1.1rem'
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '1rem'
		}
	}
}));

const AboutConnect = ():JSX.Element => {
	const classes:any = useStyle();

	const [open, setOpen] = React.useState(false);
	const handleClose = ():void => setOpen(false);
	const handleOpen = ():void => setOpen(true);

	return (
		<Grid item className={classes.root} container xs={12} justify="center">
			<ContactContainer open={open} handleClose={handleClose} />
			<Grid item xs={11} sm={10} lg={8} container direction="column" alignItems="center" className={classes.container}>
				<Grid item>
					<h2 className={classes.title}> How to <span style={{color: '#FFA114'}}>connect</span> with us? </h2>
				</Grid>
				<Grid item container className={classes.contactContainer} justify="center">
					<Grid item xs={6} sm={4} md={3} lg={2} container direction="column" alignItems="center">
						<Grid item>
							<CallIcon viewBox="0 0 40.153 30" className={classes.icon}/>
						</Grid>
						<Grid item>
							<a className={classes.contact} href={"tel:+639398815697"}> +639398815697 </a>
						</Grid>
					</Grid>
					<Grid item xs={6} sm={4} md={3} lg={2} container direction="column" alignItems="center">
						<Grid item>
							<EmailIcon viewBox="0 0 50.351 30" className={classes.icon} />
						</Grid>
						<Grid item>
							<a className={classes.contact} href={"mailto:cyrilcabo@gmail.com"}> cyrilcabo@gmail.com </a>
						</Grid>
					</Grid>
				</Grid>
				<Grid item className={classes.sendMessage}>
					<p onClick={handleOpen}> MESSAGE US </p>
				</Grid>
				<Grid item>
					<p className={classes.details}>
						Connect with Alpha Development by sending a message to the following contact information. You can send us a message if you want to inquire about Alpha Services, or if you want further discuss about availing one. Alpha Development is available for inquiries from Monday to Friday, 8AM - 5PM (GMT+8).
					</p>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default AboutConnect;