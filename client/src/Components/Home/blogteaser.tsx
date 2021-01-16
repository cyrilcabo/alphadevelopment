import React from 'react';
import {useHistory} from 'react-router-dom';

import BlogBannerImage from '../Misc/blogbannerimage';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		minHeight: 400,
		backgroundColor: '#fdfdfd',
		display: 'flex',
		position: 'relative',
		justifyContent: 'center',
		[theme.breakpoints.down('md')]: {
			minHeight: 380
		},
		[theme.breakpoints.down('sm')]: {
			minHeight: 320
		},
		[theme.breakpoints.down('xs')]: {
			minHeight: 260
		},
		'& > div.MuiGrid-item': {
			zIndex: 1,
			display: 'flex',
			flexDirection: 'column',
			padding: '10px 0px',
			[theme.breakpoints.down('sm')]: {
				alignItems: 'center',
				textAlign: 'center'
			},
			'& > p': {
				margin: "80px 0px 0px 0px",
				fontSize: '3.5rem',
				width: '70%',
				[theme.breakpoints.down('md')]: {
					fontSize: '3rem',
					marginTop: 70
				},
				[theme.breakpoints.down('sm')]: {
					fontSize: '2.5rem',
					marginTop: 50,
					width: '80%'
				},
				[theme.breakpoints.down('xs')]: {
					fontSize: '2rem',
					marginTop: 40,
					width: '95%'
				}
			},
			'& > div': {
				marginTop: 50,
				[theme.breakpoints.down('md')]: {
					marginTop: 45,
				},
				[theme.breakpoints.down('xs')]: {
					marginTop: 35
				},
				'& > button.MuiButtonBase-root': {
					borderColor: '#191919',
					color: '#191919',
					fontSize: '1.4rem',
					fontWeight: 800,
					[theme.breakpoints.down('md')]: {
						fontSize: '1.3rem'
					},
					[theme.breakpoints.down('sm')]: {
						fontSize: '1.2rem',
						margin: 'auto'
					},
					[theme.breakpoints.down('xs')]: {
						fontSize: '1.1rem'
					}
				}
			},
		}
	},
	image: {
		'& picture': {
			opacity: '0.15',
			[theme.breakpoints.down('md')]: {
				opacity: '0.1'
			}
		}
	}
}));

const BlogTeaser = () => {
	const classes = useStyle();
	const history = useHistory();

	return (
		<Grid item className={classes.root} xs={12}>
			<BlogBannerImage className={classes.image} />
			<Grid item xs={11} md={10}>
				<p> Read the latest on all things development </p>
				<div>
					<Button variant="outlined" onClick={() => history.push('/blogs')}> BLOGS </Button>
				</div>
			</Grid>
		</Grid>
	);
};

export default BlogTeaser;