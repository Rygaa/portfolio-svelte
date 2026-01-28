export default {
	nav: {
		home: 'Home',
		about: 'About',
		skills: 'Skills',
		projects: 'Projects',
		contact: 'Contact'
	},

	home: {
		greeting: "Hi, I'm",
		name: 'Aissa Benfodda',
		title: 'Software Developer',
		subtitle: 'Passionate about creating innovative web experiences',
		cta: 'View My Work',
		contactButton: 'Get In Touch',
		downloadCV: 'Download CV'
	},

	about: {
		title: 'About me',
		name: 'Aissa Benfodda',
		location: 'Montreal, QC, Canada',
		locationLabel: 'Location',
		description:
			"Software Developer with 4+ years' experience in TypeScript, Node.js, and C++. Expert in building data pipelines, WebRTC systems, and Azure infrastructure while optimizing legacy full-stack architectures.",
		yearsExperience: 'Years Experience',
		projectsCompleted: 'Projects Completed',
		technologies: 'Technologies'
	},

	skills: {
		title: 'My Main Skills:',
		subtitle: 'Technologies I work with',
		programming: 'Programming',
		tech: 'Tech',
		others: 'Others',
		french: 'French',
		english: 'English',
		networking: 'Networking'
	},

	projects: {
		title: 'My Projects',
		subtitle: "Recent work I've done",
		viewProject: 'View Project',
		viewCode: 'View Code',
		technologies: 'Technologies',
		workExperience: 'Work Experience',
		whatMastered: 'What I have mastered:',
		projectsList: [
			{
				id: 0,
				title: 'Oasis Path',
				type: 'Employment',
				date: 'Sep 2025 – Present (Full-time)',
				skills: [
					'Data Aggregation System: Architected and developed a custom web-based platform for the automated collection and centralization of corporate data from multiple public sources',
					'Automated Web Scraping: Engineered robust scraping engines to extract and normalize company information, ensuring high data accuracy and efficient processing pipelines',
					'Workflow Optimization: Reduced manual research time by 80% by automating the data collection pipeline, significantly increasing the volume and speed of company outreach'
				]
			},
			{
				id: 1,
				title: 'Visions of Independence',
				type: 'Employment',
				date: 'Dec 2022 – Aug 2025 (Full-time)',
				skills: [
					'Real-Time Communications: Engineered a custom screen-sharing system using WebRTC, specifically optimized for low-bandwidth client support sessions',
					'Cloud Infrastructure: Managed the deployment, scaling, and hardening of internal services on Azure, utilizing NGINX and custom firewall configurations',
					'Architecture & Design: Led the architectural transition of legacy support tools into a modern, centralized system, improving internal team response times'
				],
				links: [{ type: 'url' as const, url: 'https://visionsofindependence.org' }],
				mediaTitle: 'Website:'
			},
			{
				id: 2,
				title: 'MyFloraboard',
				type: 'SaaS Startup',
				date: 'May 2022 – Dec 2022 (Full-time), Dec 2022 – Jul 2023 (Part-time)',
				skills: [
					'End-to-End SaaS Launch: Led the full-cycle development and deployment of a botanical project management platform, transitioning from initial build to long-term feature evolution and maintenance',
					'AI-Driven Data Pipeline: Engineered a data processing pipeline to clean and normalize large plant datasets, utilizing the OpenAI API for automated metadata enrichment',
					'Full-Stack Ownership: Architected the entire technical stack, including frontend, backend, and infrastructure (Azure/NGINX), while implementing custom PDF export engines'
				],
				links: [{ type: 'url' as const, url: 'https://myfloraboard.com' }],
				mediaTitle: 'Website:'
			},
			{
				id: 3,
				title: 'Pillar Science',
				type: 'Employment',
				date: 'Jan 2022 – Apr 2022 (Full-time)',
				skills: [
					'Legacy Modernization: Refactored complex legacy modules to improve code maintainability and system performance, reducing technical debt within a scientific data management platform',
					'Feature Engineering: Developed and integrated new core features, working across the full stack to meet the rigorous data handling requirements of scientific researchers',
					'System Stability: Architected and implemented automated test suites to ensure high reliability and prevent regressions during rapid feature delivery',
					'Agile Collaboration: Contributed to a high-velocity team environment through active participation in sprint planning, architectural reviews, and peer code quality assessments'
				],
				mediaTitle: "Project's Picture:",
				links: [{ type: 'url' as const, url: 'https://pillarscience.com' }]
			},
			{
				id: 4,
				title: 'Medical Tutoring Platform',
				type: 'Freelance',
				date: 'Mar 2020 – Jun 2020',
				skills: [
					'Medical Tutoring Platform: Developed a custom video-sharing system with hierarchical organization and interactive UI. Engineered a relational commenting system to facilitate structured academic discussions',
					'Study Tutoring Application: Built a full-stack platform from scratch, including database architecture and Figma design. Integrated real-time collaboration tools for student-tutor engagement'
				],
				links: []
			},
			{
				id: 5,
				title: 'Technical Mentor & Tutor',
				type: 'Volunteering',
				date: 'Sept 2019 – Aug 2024 (Occasional)',
				skills: [
					'Simplified complex CS concepts for diverse audiences while guiding peers through debugging, code reviews, and architectural troubleshooting to foster clean code practices and optimized logic across projects'
				]
			},
			{
				id: 6,
				title: 'Dragon Ball Z Online RPG (2D)',
				type: 'Independent Game Project',
				date: 'January 2016 - November 2017',
				skills: [
					'Crafted a real-time 2D Dragon Ball RPG by customizing a multiplayer engine with socket-based state synchronization, complex combat physics, and transformation logic for a dedicated alpha-tester community'
				],
				links: [{ type: 'url' as const, url: 'https://www.youtube.com/watch?v=5cvOEAzVG1w' }],
				video: 'https://www.youtube.com/embed/5cvOEAzVG1w?vq=hd1080',
				mediaTitle: "Project's Video:"
			}
		]
	},

	contact: {
		title: 'Contact Me',
		subtitle: 'Looking forward to hearing from you!',
		description: 'Find my contact information on my business card below.',
		downloadCV: 'Download CV',
		sendEmail: 'Send Email',
		name: 'Name',
		email: 'Email',
		message: 'Message',
		send: 'Send Message',
		sending: 'Sending...',
		success: 'Message sent successfully!',
		error: 'Failed to send message. Please try again.',
		namePlaceholder: 'Your name',
		emailPlaceholder: 'your.email@example.com',
		messagePlaceholder: 'Your message...'
	},

	footer: {
		rights: 'All rights reserved',
		madeWith: 'Made with',
		and: 'and'
	},

	common: {
		loading: 'Loading...',
		learnMore: 'Learn More',
		close: 'Close',
		back: 'Back'
	}
};
