import React from 'react';

import {ReactComponent as BannerContainer} from '../../images/SVG/Banner Container.svg';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles(theme => ({
	root: {
		position: 'absolute',
		height: '100%',
		width: '70%',
		top: 0,
		right: 0,
		zIndex: 0,
		[theme.breakpoints.up('xl')]: {
			width: '60%'
		},
		[theme.breakpoints.down('md')]: {
			width: '60%'
		},
		[theme.breakpoints.down('sm')]: {
			width: '100%'
		},
		'& foreignObject': {
			clipPath: "url(#blog-clipper)",
			[theme.breakpoints.down('sm')]: {
				clipPath: 'unset'
			}
		},
		'& picture': {
			opacity: '0.07',
			[theme.breakpoints.down('sm')]: {
				opacity: '0.04'
			}
		}
	}
}));

interface Props {
	className?: string
}

const BlogBannerImage = ({className}:Props):JSX.Element => {
	const classes = useStyle();
	return <BannerContainer viewBox={"0 0 833 451"} className={[classes.root, className].join(' ')}/>
}

export default BlogBannerImage;