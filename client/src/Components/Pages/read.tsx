import React from 'react';

import Grid from '@material-ui/core/Grid';

import Layout from '../Blog/layout';
import Rating from '../Products/rating';
import Comment from '../Blog/comment';
import AddComment from '../Blog/addcomment';

import someString from '../Utils/somestring';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import '../../Styles/blog.css';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	rating: {
		display: 'flex',
		flexDirection: 'column',
		[theme.breakpoints.down('xs')]: {
			alignItems: 'center'
		},
		'& > div': {
			display: 'flex',
			alignItems: 'center',
			'& > span': {
				marginLeft: 5,
				color: 'white'
			}
		}
	},
	subTitle: {
		marginBottom: '10px !important',
		'& > span': {
			'&:nth-child(1)': {
				color: '#ffa114'
			},
			'&:nth-child(2)': {
				color: '#ececec'
			}
		},
	},
	rateMe: {
		display: 'flex',
		flexDirection: 'column',
		margin: '30px 0px',
		padding: '10px 5px',
		backgroundColor: '#fafafa',
		'& > h3': {
			fontSize: '1.3rem',
			margin: '0px 0px 10px 0px',
			[theme.breakpoints.down('md')]: {
				fontSize: '1.25rem'
			},
			[theme.breakpoints.down('sm')]: {
				fontSize: '1.2rem'
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: '1.1rem'
			}
		}
	},
	divider: {
		height: '1px',
		width: '100%',
		backgroundColor: '#dedede',
		margin: '5px 0px'
	},
	commentsContainer: {
		padding: '10px 0px',
		'& > h2': {
			fontSize: '1.5rem',
			margin: '5px 0px 15px 0px',
			[theme.breakpoints.down('md')]: {
				fontSize: '1.4rem'
			},
			[theme.breakpoints.down('sm')]: {
				fontSize: '1.3rem'
			},
			[theme.breakpoints.down('xs')]: {
				fontSize: '1.2rem'
			}
		}
	}
}));

const Read = ():JSX.Element => {
	const classes = useStyle();
	const [ratingMe, setRatingMe] = React.useState(0);

	const relatedLinks = [
		{
			title: "Featured blogs",
			links: [
				{
					title: "Start a Hello World app now",
					link: "#"
				},
				{
					title: "How about a Hi World app?",
					link: "#"
				},
			],
		}
	];

	const subTitle = <div className={classes.rating}>
		<p className={classes.subTitle}>
			<span> Cyril Cabo </span>
			<span> August 24, 2000 </span>
		</p>
		<div>
			<Rating value={4.5} isBig/> <span> (31) </span>
		</div>
	</div>

	const md = `# Hello world\n## NExt?
	
	How about me?\n

	> AHHHHH
	`;

	return (
		<Layout relatedLinks={relatedLinks} title={"Hi blog, welcome to my first guys!"} subTitle={subTitle}>
			<React.Fragment>	
				<ReactMarkdown plugins={[[gfm, {singleTilde: false}]]} source={someString} className={'md-container'} />
				<div className={classes.rateMe}>
					<h3> How did this story make you feel? </h3>
					<Rating interactive value={ratingMe} handleRate={setRatingMe} isBig />
				</div>
				<div className={classes.divider} />
				<div className={classes.commentsContainer}>
					<h2> Comments </h2>
					<AddComment
						apiAddComment={() => null}
						addComment={() => null}
						blogId={"id123"}
					/>
					<Comment />
				</div>
			</React.Fragment>
		</Layout>
	);
}

export default Read;