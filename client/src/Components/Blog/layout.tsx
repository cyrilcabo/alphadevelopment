import React from 'react';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';

import RelatedList from './relatedlist';

import Sections from '../../Types/Blog/sections';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		position: 'relative',
	},
	fab: {
		position: 'fixed',
		bottom: 20,
		right: 20,
	},
	moreIcon: {
		fontSize: '2rem',
		lineHeight: '15px',
		margin: '-15px 0px 0px 0px',
		fontWeight: 800
	},
	drawer: {
		'& div.MuiPaper-root': {	
			padding: '15px 20px',
			overflowY: 'auto'
		}
	},
	banner: {
		minHeight: 400,
		paddingBottom: 150,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: '#191919',
		[theme.breakpoints.down('sm')]: {
			minHeight: 320
		},
	},
	bannerText: {
		marginTop: 80,
		marginBottom: 100,
		display: 'flex',
		flexDirection: 'column',
		[theme.breakpoints.down('md')]: {
			marginTop: 70,
			marginBottom: 80,
		},
		[theme.breakpoints.down('sm')]: {
			marginBottom: 60,
		},
		[theme.breakpoints.down('xs')]: {
			margin: '50px 0px',
			alignItems: 'center',
			textAlign: 'center'
		},
		'& > h1': {
			margin: '0px 0px 20px 0px',
			fontSize: '3.5rem',
			color: 'white',
			'& > span': {
				color: '#00CBFF'
			},
			[theme.breakpoints.up('xl')]: {
				fontSize: '4rem',
			},
			[theme.breakpoints.down('md')]: {
				marginBottom: '15px',
				fontSize: '3rem'
			},
			[theme.breakpoints.down('sm')]: {
				marginBottom: '12px',
				fontSize: '2.8rem'
			},
			[theme.breakpoints.down('xs')]: {
				marginBottom: '10px',
				fontSize: '2rem'
			}
		},
		'& p': {
			margin: 0,
			color: 'white',
			fontSize: '1.5rem',
			[theme.breakpoints.down('md')]: {
				fontSize: '1.4rem'
			},
			[theme.breakpoints.down('sm')]: {
				fontSize: '1.3rem'
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: '1.1rem'
			}
		}
	},
	bodyContainer: {
		minHeight: 400,
		[theme.breakpoints.down('sm')]: {
			minHeight: 350,
		},
		[theme.breakpoints.down('xs')]: {
			minHeight: 300
		}
	},
	body: {
		margin: '-150px 0px 100px 0px',
		backgroundColor: 'white',
		boxShadow: '0px 2px 5px #00000078',
		display: 'flex',
		justifyContent: 'space-between',
		padding: '20px 15px',
		'& > div.MuiGrid-item': {
			'&:nth-child(1)': {
				width: '70%',
				[theme.breakpoints.down('sm')]: {
					width: '95%'
				}
			},
			'&:nth-child(2)': {
				[theme.breakpoints.up('md')]: {
					width: '25%'
				}
			},
		},
		[theme.breakpoints.down('md')]: {
			marginBottom: 80,
			padding: '18px 13px'
		},
		[theme.breakpoints.down('sm')]: {
			marginBottom: 60,
			padding: '15px 10px',
			justifyContent: 'center',
		},
		[theme.breakpoints.down('xs')]: {
			width: '95%',
			padding: '12px 5px'
		}
	}
}));

interface Props {
	title?: string,
	subTitle?: string | JSX.Element,
	relatedLinks: Sections[],
	children: JSX.Element,
}

const BlogLayout = ({children, relatedLinks, title, subTitle}:Props):JSX.Element => {
	const classes = useStyle();
	const [drawerOpen, setDrawerOpen] = React.useState(false);

	const handleDrawerClose = () => setDrawerOpen(false);

	return (
		<Grid item xs={12} className={classes.root}>
			<Hidden mdUp>
				<Fab size="small" color="primary" className={classes.fab} onClick={() => setDrawerOpen(true)}>
					<p className={classes.moreIcon}> ... </p>
				</Fab>
				<Drawer open={drawerOpen} onClose={handleDrawerClose} anchor={"right"} className={classes.drawer} elevation={5}>
					<RelatedList relatedLinks={relatedLinks} />
				</Drawer>
			</Hidden>
			<Grid item xs={12} className={classes.banner}>
				<Grid item xs={11} md={10} container justify="flex-start">
					<Grid item xs={12} md={8} xl={5} className={classes.bannerText}>
						{title
							?<h1> {title} </h1>
							:<h1> Learn all things <span>development.</span> </h1>
						}
						{subTitle
							?subTitle
							:<p> Follow AlphaDevelopment for the latest updates! </p>
						}
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} container justify="center" className={classes.bodyContainer}>
				<Grid item sm={11} md={10} className={classes.body}>
					<Grid item>
						{children}
					</Grid>
					<Hidden smDown>
						<Grid item>
							<RelatedList relatedLinks={relatedLinks} />
						</Grid>
					</Hidden>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default BlogLayout;