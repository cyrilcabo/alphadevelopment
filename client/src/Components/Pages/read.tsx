import React from 'react';

import Grid from '@material-ui/core/Grid';

import Layout from '../Blog/layout';
import Rating from '../Products/rating';
import CommentList from '../Blog/commentlist';
import AddComment from '../Blog/addcomment';
import Categories from '../Blog/categories';

import qs from 'qs';
import {useLocation} from 'react-router-dom';

import someString from '../Utils/somestring';
import {BLOG} from '../../Graphql/queries';
import {LIKEBLOG} from '../../Graphql/mutation';

import {useQuery, useMutation} from 'react-apollo';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import moment from 'moment';

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
		},
		'& > span': {
			margin: '5px 0px',
			fontSize: '0.97rem',
			color: '#ffa114',
			cursor: 'pointer',
			'&:hover': {
				color: 'black'
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
		width: '100%',
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
	const location = useLocation();
	const {blogid} = qs.parse(location.search, {ignoreQueryPrefix: true});

	const [blog, setBlog] = React.useState({
		_id: "",
		title: "",
		author: "",
		category: [],
		featured: false,
		datePosted: "From the future",
		rating: 0,
		totalRatings: 0,
		content: "",
		series: [],
		iRating: 0
	});
	const {data: blogData, loading: blogLoading} = useQuery(BLOG, {variables: {_id: blogid}});
	const [likeBlog, {data: likeData, loading: likeLoading}] = useMutation(LIKEBLOG, {
		update(cache, {data: {likeBlog}}) {
			const prev: any = cache.readQuery({query: BLOG, variables: {_id: blog._id}});
			cache.writeQuery({
				query: BLOG,
				variables: {_id: blog._id},
				data: { 
					blog: [
						{
							...prev.blog[0],
							iRating: likeBlog.rating,
							rating: (prev.blog[0].rating)
						}
					],
				}
			})
		}
	})
	const [ratingMe, setRatingMe] = React.useState(blog.iRating);
	const [isRating, setIsRating] = React.useState(false);

	React.useEffect(() => {
		if (blogData?.blog.length) {
			setBlog({
				...blogData.blog[0],
				datePosted: moment(blogData.blog[0].datePosted).format("MMMM DD, YYYY"),
				iRating: 4,
			});
			setRatingMe(blogData.blog[0].iRating || 3);
		}
	}, [blogData]);

	const onRating = (value?: number):void => {
		setIsRating(false);
	}

	const relatedLinks = [
		{
			title: "Read more",
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
		},
	];

	const subTitle = <div className={classes.rating}>
		<p className={classes.subTitle}>
			<span> {blog.author} </span>
			<span> {blog.datePosted} </span>
		</p>
		<div>
			<Rating value={blog.rating} isBig/> <span> ({blog.totalRatings}) </span>
		</div>
	</div>

	return (
		<Layout relatedLinks={relatedLinks} title={blog.title} subTitle={subTitle}>
			<React.Fragment>
				<Categories categories={blog.category} />	
				<ReactMarkdown plugins={[[gfm, {singleTilde: false}]]} source={blog.content} className={'md-container'} />
				<div className={classes.rateMe}>
					<h3> {!blog.iRating || isRating
						?"How did this story make you feel?"
						:"Thank you for sharing your feedback" 
					}</h3>
					<Rating 
						interactive={!blog.iRating || isRating} 
						value={isRating ?ratingMe :blog.iRating} 
						handleRate={!blog.iRating || isRating ?setRatingMe :null} isBig 
						handleOpen={onRating}
					/>
					{(blog.iRating && !isRating) &&
						<span onClick={() => setIsRating(true)}> Edit feedback </span>
					}
				</div>
				<div className={classes.divider} />
				<div className={classes.commentsContainer}>
					<h2> Comments </h2>
					<AddComment
						apiAddComment={() => null}
						addComment={() => null}
						blogId={"id123"}
					/>
					<CommentList />
				</div>
			</React.Fragment>
		</Layout>
	);
}

export default Read;