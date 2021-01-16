import React from 'react';

import Layout from '../Blog/layout';
import Rating from '../Products/rating';
import CommentList from '../Blog/commentlist';
import AddComment from '../Blog/addcomment';
import Categories from '../Blog/categories';
import StyledLoading from '../Misc/styledloading';
import LoadingScreen from '../LoadingScreen/loadingscreen';

import qs from 'qs';
import {useLocation} from 'react-router-dom';

import {BLOG, BLOGS} from '../../Graphql/queries';
import {SKIP_BLOGS} from '../../Graphql/localqueries';
import {LIKEBLOG} from '../../Graphql/mutation';

import BlogSummary from '../../Types/Blog/blogsummary';
import Comment from '../../Types/Blog/comment';
import BlogSection from '../../Types/Blog/sections';

import {useQuery, useMutation, useLazyQuery} from 'react-apollo';

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
		position: 'relative',
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
		'& > div.edit-feedback': {
			margin: '5px 0px',
		},
		'& > div.edit-feedback > span': {
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
	},
	blogLoading: {
		display: 'flex',
		width: '100%',
		justifyContent: 'center',
		padding: '15px 0px',
	},
	likeLoading: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'inherit',
		opacity: '0.85',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
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
		series: {
			title: "",
			links: [],
		},
		iRating: 0
	});
	const {data: blogData, loading: blogLoading} = useQuery(BLOG, {variables: {_id: blogid}});
	const [fetchRelatedBlogs, {data: relatedBlogs, loading: relatedLoading}] = useLazyQuery(BLOGS);
	const [relatedLinks, setRelatedLinks]: [BlogSection, Function] = React.useState({title: "Read more", links: []});
	const [likeBlog, {loading: likeLoading}] = useMutation(LIKEBLOG, {
		update(cache, {data: {likeBlog}}) {
			const prev: any = cache.readQuery({query: BLOG, variables: {_id: blog._id}});
			const skipData: any = cache.readQuery({query: SKIP_BLOGS});
			//Update rating
			const updatedTotal = prev.blog[0].totalRatings+likeBlog.upsert;
			const updatedRating = prev.blog[0].rating+(likeBlog.iRating-likeBlog.prev);
			//Update document
			cache.writeQuery({
				query: BLOG,
				variables: {_id: blog._id},
				data: { 
					blog: [
						{
							...prev.blog[0],
							iRating: likeBlog.iRating,
							rating: updatedRating,
							totalRatings: updatedTotal
						}
					],
				}
			});
			//Update list
			for (let i = 0; i < skipData.skipBlogs; i+=10) {
				const tempData: any = cache.readQuery({query: BLOGS, variables: {skip: i}});
				cache.writeQuery({
					query: BLOGS,
					variables: {skip: i},
					data: {
						blogs: tempData.blogs.map((item: BlogSummary) => {
							if (item._id===blog._id) return {
								...item,
								rating: updatedRating,
								totalRatings: updatedTotal
							};
							return item;
						})					
					}
				});
			}
		}
	});
	const [ratingMe, setRatingMe] = React.useState(0);
	const [isRating, setIsRating] = React.useState(false);
	const [newComment, setNewComment]: [Comment[], Function] = React.useState([]);

	React.useEffect(() => {
		if (blogData?.blog.length) {
			setBlog({
				...blogData.blog[0],
				datePosted: moment(blogData.blog[0].datePosted).format("MMMM DD, YYYY"),
			});
			setRatingMe(blogData.blog[0].iRating);
			setIsRating(!blogData.blog[0].iRating);
			fetchRelatedBlogs({variables: {category: blogData.blog[0].category, limit: 5}});
		}
	}, [blogData, fetchRelatedBlogs]);

	React.useEffect(() => {
		if (relatedBlogs?.blogs) {
			setRelatedLinks({
				title: "Read more",
				links: relatedBlogs.blogs.map((item:BlogSummary) => ({
					title: item.title,
					link: `/blogs/read?blogid=${item._id}`
				})),
			});
		}
		if (relatedLoading) {
			setRelatedLinks({
				title: "Read more",
				links: "loading"
			});
		}
	}, [relatedBlogs, relatedLoading]);

	const onRating = (value?: number):void => {
		setIsRating(false);
		if (value && (value <= 5 && value > 0)) {
			likeBlog({variables: {prev: blog.iRating || 0, rating: value, blog: blog._id}});
		}
	}

	const subTitle = <div className={classes.rating}>
		<p className={classes.subTitle}>
			<span> {blog.author} </span>
			<span> {blog.datePosted} </span>
		</p>
		<div>
			<Rating value={blog.rating} isBig/> <span> ({blog.totalRatings}) </span>
		</div>
	</div>

	if (!blog._id) return <LoadingScreen />

	return (
		<Layout relatedLinks={[blog?.series?.links?.length ?blog.series :null, relatedLinks]} title={blog.title} subTitle={subTitle}>
			<React.Fragment>
				<Categories categories={blog.category} />	
				{blogLoading
					?<div className={classes.blogLoading}>
						<StyledLoading />
					</div>
					:<ReactMarkdown plugins={[[gfm, {singleTilde: false}]]} source={blog.content} className={'md-container'} />
				}
				<div className={classes.rateMe}>
					{likeLoading
						?<div className={classes.likeLoading}>
							<StyledLoading />
						</div>
						:""
					}
					<h3> {!blog.iRating || isRating
						?"How did this story make you feel?"
						:"Thank you for sharing your feedback" 
					}</h3>
					<Rating 
						interactive={!blog.iRating || isRating} 
						value={isRating ?ratingMe :blog.iRating} 
						handleRate={!blog.iRating || isRating ?setRatingMe :null} 
						isBig 
						handleOpen={isRating ?onRating :undefined}
					/>
					{(blog.iRating && !isRating)
						?<div className={"edit-feedback"}>
							<span onClick={() => setIsRating(true)}> Edit feedback </span>
						</div>
						:""
					}
				</div>
				<div className={classes.divider} />
				<div className={classes.commentsContainer}>
					<h2> Comments </h2>
					<AddComment
						blogId={blog._id}
						addComment={setNewComment}
					/>
					<CommentList _id={blog._id} newComments={newComment}/>
				</div>
			</React.Fragment>
		</Layout>
	);
}

export default Read;