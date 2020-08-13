const Mutation =  {
	subscribe: async (parent, args, context) => {
		let response = {error: false, message: ""};
		await context.send(args.email).then(info => {
			if (info.accepted.length) {
				response = {
					error: false,
					message: "Email subscribed succesfully!"
				};
				return;
			}
			response = {
				error: true,
				messsage: "Something went wrong. Try again.",
			};
		}).catch(err => {
			response = {
				error: true,
				message: "Service currently unavailable.",
			};
		});
		return response;
	}
}

module.exports = {
	Mutation,
}