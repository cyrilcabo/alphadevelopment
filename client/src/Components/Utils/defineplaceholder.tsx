const definePlaceholder = (index: number):string => {
	switch (index) {
		case 0:
			return "Hi! I need a website for my business. I want to have a dedicated platform, solely for business transactions. Can you help?";
		case 1:
			return "Hi! My business is rapidly expanding, and it's becoming a hassle to manually transact with my clients. I need an e-commerce platform. Can you make me one?";
		case 2:
			return "Hi! I'm starting with my business, but I don't really know where to go from here. Can you provide me some solutions that would make life easier?";
		case 3: 
			return "Hi! I have just created a website with HTML5, CSS3 and Javascript, but I really want some real functionalities. Can you help me build the backend for it?"
		case 4:
			return "Hi! I'm currently struggling with a programming project in school, and deadline's coming fast. I need an expert to go through my code. Can you lend a hand?";
		case 5:
			return "Hi! I noticed that you have some great coding skills! I have an ongoing project, do you want to collaborate with me?";
		default: return "";
	}
}

export default definePlaceholder;