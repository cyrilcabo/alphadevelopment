import React from 'react';

//Material components
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

//Custom components
import ContactInfo from './contactinfo';

//Style components
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		width: '50%',
		paddingBottom: '30px',
		backgroundColor: '#f9f9f9',
		[theme.breakpoints.down('md')]: {
			width: '55%',
		},
		[theme.breakpoints.down('sm')]: {
			width: '70%'
		},
		[theme.breakpoints.down('xs')]: {
			width: '85%',
			paddingTop: 15,
		}
	},
	socialIcons: {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: 10,
		'& > div.MuiGrid-item': {
			margin: '0px 10px',
		},
		'& img': {
			height: 30,
			[theme.breakpoints.down('md')]: {
				height: 28
			},
			[theme.breakpoints.down('sm')]: {
				height: 25,
			},
		}
	},
	contactInfos: {
		alignItems: 'center',
		fontFamily: 'arial, helvetica, sans-serif',
		'& a': {
			color: '#313131',
			textDecoration: 'none',
			'&:hover': {
				color: '#f4ba88'
			}
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.9rem',
		}
	}
}));

interface Props {
	title?: string;
	placeholder?: string;
}

const ContactForm = (props: Props) => {
	const classes = useStyle();
	const links = [`https://facebook.com/developmentalpha`,`https://github.com/cyrilcabo`];
	const socialIcons = ['FB_logo', 'github'].map((i, index) => {
		return <Grid item key={index}>
			<IconButton onClick={() => window.open(links[index])}>
				<img src={`/images/Logos/${i}.png`} />
			</IconButton>
		</Grid>
	});
	return (
		<Paper className={classes.root} elevation={2}>
			<Grid item xs={12}>
				<ContactInfo title={props.title} placeholder={props.placeholder} />
			</Grid>
			<Grid item className={classes.socialIcons}>
				{socialIcons}
			</Grid>
			<Grid item className={classes.contactInfos} container direction={"column"}>
				<Grid item>
					<a href={"tel:+639398815697"}> +639398815697 </a>
				</Grid>
				<Grid item>
					<a href={"mailto:cyrilcabo@gmail.com"}> cyrilcabo@gmail.com </a>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default ContactForm;