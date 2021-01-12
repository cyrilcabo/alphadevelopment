const products = require('./products');
const product = require('./product');
const reviews = require('./reviews');
const isReviewed = require('./isreviewed');
const testimonials = require('./testimonials');
const blogs = require('./blogs');

const Query = {
	products,
	product,
	reviews,
	isReviewed,
	testimonials,
	blogs,
}

module.exports = {
	Query,
}