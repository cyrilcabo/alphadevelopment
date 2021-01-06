//Material components
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';

//Utils
import React from 'react';
import {Link, useHistory} from 'react-router-dom';

//Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle:any = makeStyles(theme => ({
	root: {
		height: 56,
		backgroundColor: '#212121',
		zIndex: 5,
		display: 'flex',
		justifyContent: 'center'
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'center',
		padding: 0,
	},
	brandContainer: {
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer'
	},
	brandLogo: {
		height: 30,
		width: 30,
		marginRight: 5,
		[theme.breakpoints.down('sm')]: {
			marginRight: 3,
			height: 25,
			width: 25
		}
	},
	brandTitle: {
		fontSize: '0.98rem',
		margin: 0,
		color: 'white',
	},
	navContainer: {
		display: 'flex',
	},
	navs: {
		fontSize: '1rem',
		color: 'white',
		margin: '0px 0px 0px 35px',
		'& a': {
			textDecoration: 'none',
			color: 'white',
		},
		'& p': {
			margin: 0,
			'&:hover': {
				cursor: 'pointer',
				color: '#00CBFF'
			}
		}
	},
	menuIcon: {
		borderRadius: '10px', 
		padding: 5,
		transition: 'background-color 0.1s',
		'&:active': {
			backgroundColor: 'gray'
		}
	},
	menuIconLines: {
		width: 20, 
		height: 2, 
		backgroundColor: 'white', 
		margin: '3px 0px'
	}
}));

interface NavLink {
	name: string;
	link: string;
}

interface Props {
	navs: NavLink[];
	handleActive: Function;
}

const Navbar = ({navs, handleActive}: Props):JSX.Element => {
	const classes:any = useStyle();
	const history = useHistory();
	const brandClick = () => history.push('/');
	const navLinks:JSX.Element[] = navs.map((item, key) => {
		return <Grid item className={classes.navs} key={key}>
			<Link to={item.link}>
				<p> {item.name} </p>
			</Link>
		</Grid>
	});
	return (
		<React.Fragment>
			<AppBar position="fixed" className={classes.root}>
				<Toolbar className={classes.toolbar}>
					<Grid item xs={11} md={10} container justify="space-between" alignItems="center">
						<Grid item style={{display: 'flex', alignItems: 'center'}}>
							<Grid item>
								<Hidden mdUp>
									<IconButton style={{padding: 2}} onClick={handleActive.bind(Navbar)}>
										<Grid item container direction="column" className={classes.menuIcon}>
											{[1,2,3].map((item, key) => {
												return <Grid item key={key}>
													<div className={classes.menuIconLines} />
												</Grid>	
											})}
										</Grid>
									</IconButton>
								</Hidden>	
							</Grid>
							<Grid item className={classes.brandContainer} onClick={brandClick}>
								<img className={classes.brandLogo} src={"/icons/logo_64.png"} alt="Brand logo" />
								<h4 className={classes.brandTitle}> ALPHA<span style={{color: '#00CBFF'}}>DEVELOPMENT</span> </h4>
							</Grid>
						</Grid>
						<Hidden smDown>	
							<Grid item className={classes.navContainer}>
								{navLinks}
							</Grid>
						</Hidden>
					</Grid>
				</Toolbar>
			</AppBar>
			<Toolbar style={{minHeight: 56}} />
		</React.Fragment>
	);
}

export default Navbar;