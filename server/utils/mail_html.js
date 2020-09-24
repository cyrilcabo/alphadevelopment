const htmlContent = `
	<html>
		<head>
			<title> Email Sample </title>
			<meta name="viewport" content="width=device-width, initial-scale=1"> 
			<style>
				.title {
					font-size: 1.5rem;
				}

				.body {
					font-size: 1rem;
					line-height: 25px;
				}

				.desc-title {
					margin-top: 20px;
					font-size: 1rem;
					text-align: center;
				}

				.footer {
					color: #212121;
					font-size: 0.9rem;
					text-align: justify;
				}

				@media (max-width: 960px) {
					.title {
						font-size: 1.3rem;
					}

					.body {
						font-size: 1rem;
					}

					.footer {
						font-size: 0.85rem;
					}
				}

				@media (max-width: 600px) {
					.title {
						font-size: 1.2rem;
					}

					.desc-title {
						margin-bottom: 17px;
					}

					.footer {
						font-size: 0.8rem;
					}
				}

			</style>
		</head>
		<body>	
			<h2 class="title"> Thank you for contacting Alpha <span style="color: #00cbff;"> Development! </span> </h2>
			<div class="body">
				<p>
					Let us further discuss your inquiries, by replying to this email. Currently, Alpha Development provides the following web development services: 
				</p>

				<ul>
					<li> designing your web pages </li> 
					<li> converting PSD Designs to HTML </li> 
					<li> developing your frontend application </li>
					<li> designing your backend logic </li> 
					<li> connecting your application to a database </li> 
					<li> setting up your application on a server </li>
					<li> building a fullstack application without you having to worry about anything else! </li>
				</ul>

				<p>
					We are looking forward to working with you! <span style="color: #00cbff;">Cheers</span>.
				</p>
			</div>
			<br />
			<hr />
			<h2 class="desc-title"> What is Alpha <span style="color: #0cbff">Development</span>? </h2>
			<p class="footer">
				Alpha Development is a Tacloban-based web development company, and has started its journey since May 2020. Currently, it is a one-man company, but it has its eyes set on being the first established web development company in the region. Alpha Development's promise to its clients is to provide quality yet pocket-friendly products. Alpha Development products are fueled by customer's creative powers, as whatever you can imagine, Alpha Development will provide.
			</p>
		</body>
	</html>
`;

module.exports = htmlContent;