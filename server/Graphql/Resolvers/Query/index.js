const products = require('./products');
const product = require('./product');
const reviews = require('./reviews');
const isReviewed = require('./isreviewed');
const testimonials = require('./testimonials');
const blogs = require('./blogs');
const blog = require('./blog');
const blogComments = require('./blogcomments');

const Query = {
	products,
	product,
	reviews,
	isReviewed,
	testimonials,
	blogs,
	blog,
	blogComments
}

module.exports = {
	Query,
}