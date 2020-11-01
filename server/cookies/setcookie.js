const uniqueID = require('../utils/uid');

const setCookie = (req, res, next) => {
	if (!req.headers.cookie || (req.headers.cookie && !req.signedCookies["alpha_id"])) {
		const date = new Date();
		res.cookie("alpha_id", uniqueID(), {
			signed: true,
			httpOnly: true,
			expires: new Date(date.setFullYear(date.getFullYear()+1)),
			sameSite: true,
		});
	}
	return next();
}


module.exports = {
	setCookie,
}