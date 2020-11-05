//Material components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

//Utils
import React from 'react';
import {Link} from 'react-router-dom';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle:any = makeStyles(theme => ({
	root: {
		minHeight: 155,
		backgroundColor: 'black',
		color: 'white',
		[theme.breakpoints.down('sm')]: {
			padding: '30px 0px',
		}
	},
	container: {
		'& > div.MuiGrid-item': {
			display: 'flex',
			alignItems: 'center',
			[theme.breakpoints.down('sm')]: {
				marginBottom: 20,
			}
		}
	},
	brandTitle: {
		fontSize: '1.3rem',
		margin: '0px 0px 5px 0px',
	},
	brandSlogan: {
		margin: 0,
		fontSize: '0.8rem',
	},
	logoContainer: {
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center',
		}
	},
	CTA: {
		color: 'white',
		backgroundColor: '#085569',
		fontSize: '0.7rem',
		fontWeight: 550,
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.65rem',
		}
	},
	navContainer: {
		justifyContent: 'flex-end',
		textAlign: 'right',
		'& > div.MuiGrid-item': {
			marginLeft: 20,
			fontSize: '1rem',
			'& a': {
				color: 'white',
				textDecoration: 'none',
				'&:hover': {
					color: '#00CBFF'
				}
			},
			'& p': {
				margin: 0,
			},
			[theme.breakpoints.down('sm')]: {
				margin: '0px 10px',
			}
		},
		[theme.breakpoints.down('sm')]: {
			textAlign: 'center',
			justifyContent: 'center',
		}
	}
}));

interface NavLink {
	name: string;
	link: string;
}

interface Props {
	navs: NavLink[];
}

const Footer = ({navs}: Props): JSX.Element => {
	const classes:any = useStyle();
	const navLinks:JSX.Element[] = navs.map((item, key) => {
		return <Grid item key={key}>
			<Link to={item.link}>
				<p> {item.name} </p>
			</Link>
		</Grid>
	});
	return (
		<Grid item xs={12} className={classes.root} container justify="center" alignItems="center">
			<Grid item xs={11} md={10} container className={classes.container} justify="space-between">
				<Grid item xs={12} md={3} lg={2}>
					<Grid item container direction="column" alignItems="center">
						<Grid item>
							<h4 className={classes.brandTitle}> <span style={{color: '#00CBFF'}}>Alpha</span> Development </h4>
						</Grid>
						<Grid item>
							<p className={classes.brandSlogan}> 
								<span style={{color: '#00CBFF'}}> Explore. </span>
								Innovate.
								<span style={{color: '#FFA114'}}> Evolve. </span>
							</p>
						</Grid>	
					</Grid>
				</Grid>
				<Grid item xs={12} md={3} lg={2}>
					<Grid item container direction="column" alignItems="center" justify="space-around">
						<Grid item container justify="space-around" className={classes.logoContainer}>
							<Grid item>
								<IconButton>
									<a href={"https://web.facebook.com/developmentalpha"} target={"_blank"} rel={"noopener noreferrer"}>
										<img className={classes.logo} src={'/images/Logos/FB_logo.png'} alt={"Facebook logo"} />
									</a>
								</IconButton>
							</Grid>
							<Grid item>
								<IconButton>
									<a href={"https://github.com/cyrilcabo"} target={"_blank"} rel={"noopener noreferrer"}>
										<img className={classes.logo} src={'/images/Logos/github.png'} alt={"Github logo"} />
									</a>
								</IconButton>
							</Grid>
						</Grid>
						<Grid item>
							<Button 
								className={classes.CTA}
								onClick={() => window.open('/Resume/resume.pdf')}
							> Download Resume </Button>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} md={4} lg={3}>
					<Grid item container className={classes.navContainer}>
						{navLinks}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
} 

export default Footer;