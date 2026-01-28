export default {
	nav: {
		home: 'Accueil',
		about: 'À propos',
		skills: 'Compétences',
		projects: 'Projets',
		contact: 'Contact'
	},

	home: {
		greeting: 'Salut, je suis',
		name: 'Aissa Benfodda',
		title: 'Développeur logiciel',
		subtitle: "Passionné par la création d'expériences web innovantes",
		cta: 'Voir mon travail',
		contactButton: 'Me contacter',
		downloadCV: 'Télécharger CV'
	},

	about: {
		title: 'À propos de moi',
		name: 'Aissa Benfodda',
		location: 'Montréal, QC, Canada',
		locationLabel: 'Localisation',
		description:
			"Développeur logiciel avec plus de 4 ans d'expérience en TypeScript, Node.js et C++. Expert dans la création de pipelines de données, systèmes WebRTC et infrastructure Azure tout en optimisant les architectures full-stack héritées.",
		yearsExperience: "Années d'expérience",
		projectsCompleted: 'Projets terminés',
		technologies: 'Technologies'
	},

	skills: {
		title: 'Mes principales compétences:',
		subtitle: "Technologies que j'utilise",
		programming: 'Programmation',
		tech: 'Tech',
		others: 'Autres',
		french: 'Français',
		english: 'Anglais',
		networking: 'Réseaux'
	},

	projects: {
		title: 'Mes projets',
		subtitle: "Travaux récents que j'ai réalisés",
		viewProject: 'Voir le projet',
		viewCode: 'Voir le code',
		technologies: 'Technologies',
		workExperience: 'Expérience professionnelle',
		whatMastered: "Ce que j'ai maîtrisé :",
		projectsList: [
			{
				id: 0,
				title: 'Oasis Path',
				type: 'Emploi',
				date: 'Sep 2025 – Présent (Temps plein)',
				skills: [
					"Système d'agrégation de données : Conception et développement d'une plateforme web personnalisée pour la collecte et la centralisation automatisées de données d'entreprise provenant de plusieurs sources publiques",
					"Web Scraping automatisé : Conception de moteurs de scraping robustes pour extraire et normaliser les informations d'entreprise, assurant une haute précision des données et des pipelines de traitement efficaces",
					'Optimisation du flux de travail : Réduction du temps de recherche manuelle de 80 % en automatisant le pipeline de collecte de données, augmentant considérablement le volume et la vitesse de sensibilisation des entreprises'
				]
			},
			{
				id: 1,
				title: 'Visions of Independence',
				type: 'Emploi',
				date: 'Déc 2022 – Août 2025 (Temps plein)',
				skills: [
					"Communications en temps réel : Conception d'un système de partage d'écran personnalisé utilisant WebRTC, spécifiquement optimisé pour les sessions de support client à faible bande passante",
					"Infrastructure cloud : Gestion du déploiement, de la mise à l'échelle et du renforcement des services internes sur Azure, en utilisant NGINX et des configurations de pare-feu personnalisées",
					"Architecture et conception : Direction de la transition architecturale des outils de support hérités vers un système moderne et centralisé, améliorant les temps de réponse de l'équipe interne"
				],
				links: [{ type: 'url' as const, url: 'https://visionsofindependence.org' }],
				mediaTitle: 'Site web :'
			},
			{
				id: 2,
				title: 'MyFloraboard',
				type: 'Startup SaaS',
				date: 'Mai 2022 – Déc 2022 (Temps plein), Déc 2022 – Juil 2023 (Temps partiel)',
				skills: [
					"Lancement SaaS de bout en bout : Direction du développement et du déploiement complet d'une plateforme de gestion de projets botaniques, de la construction initiale à l'évolution et à la maintenance à long terme des fonctionnalités",
					"Pipeline de données piloté par l'IA : Conception d'un pipeline de traitement de données pour nettoyer et normaliser de grands ensembles de données de plantes, en utilisant l'API OpenAI pour l'enrichissement automatisé des métadonnées",
					"Propriété full-stack : Architecture de l'ensemble de la pile technique, y compris le frontend, le backend et l'infrastructure (Azure/NGINX), tout en implémentant des moteurs d'export PDF personnalisés"
				],
				links: [{ type: 'url' as const, url: 'https://myfloraboard.com' }],
				mediaTitle: 'Site web :'
			},
			{
				id: 3,
				title: 'Pillar Science',
				type: 'Emploi',
				date: 'Jan 2022 – Avr 2022 (Temps plein)',
				skills: [
					"Modernisation héritée : Refactorisation de modules hérités complexes pour améliorer la maintenabilité du code et les performances du système, réduisant la dette technique au sein d'une plateforme de gestion de données scientifiques",
					"Ingénierie des fonctionnalités : Développement et intégration de nouvelles fonctionnalités de base, travaillant sur l'ensemble de la pile pour répondre aux exigences rigoureuses de gestion des données des chercheurs scientifiques",
					'Stabilité du système : Architecture et implémentation de suites de tests automatisés pour garantir une haute fiabilité et prévenir les régressions lors de la livraison rapide de fonctionnalités',
					"Collaboration agile : Contribution à un environnement d'équipe à haute vélocité grâce à une participation active à la planification des sprints, aux revues architecturales et aux évaluations de la qualité du code par les pairs"
				],
				mediaTitle: 'Image du projet :',
				links: [{ type: 'url' as const, url: 'https://pillarscience.com' }]
			},
			{
				id: 4,
				title: 'Plateforme de tutorat médical',
				type: 'Freelance',
				date: 'Mar 2020 – Juin 2020',
				skills: [
					"Plateforme de tutorat médical : Développement d'un système de partage de vidéos personnalisé avec organisation hiérarchique et interface utilisateur interactive. Conception d'un système de commentaires relationnel pour faciliter les discussions académiques structurées",
					"Application de tutorat d'études : Construction d'une plateforme full-stack à partir de zéro, incluant l'architecture de base de données et la conception Figma. Intégration d'outils de collaboration en temps réel pour l'engagement étudiant-tuteur"
				],
				links: []
			},
			{
				id: 5,
				title: 'Mentor technique et tuteur',
				type: 'Bénévolat',
				date: 'Sept 2019 – Août 2024 (Occasionnel)',
				skills: [
					'Simplification de concepts informatiques complexes pour des publics divers tout en guidant des pairs à travers le débogage, les revues de code et le dépannage architectural pour favoriser les pratiques de code propre et la logique optimisée dans les projets'
				]
			},
			{
				id: 6,
				title: 'Dragon Ball Z Online RPG (2D)',
				type: 'Projet de jeu indépendant',
				date: 'Janvier 2016 - Novembre 2017',
				skills: [
					"Création d'un RPG Dragon Ball en temps réel en 2D en personnalisant un moteur multijoueur avec synchronisation d'état basée sur les sockets, physique de combat complexe et logique de transformation pour une communauté dédiée de testeurs alpha"
				],
				links: [{ type: 'url' as const, url: 'https://www.youtube.com/watch?v=5cvOEAzVG1w' }],
				video: 'https://www.youtube.com/embed/5cvOEAzVG1w?vq=hd1080',
				mediaTitle: 'Vidéo du projet :'
			}
		]
	},

	contact: {
		title: 'Contactez-moi',
		subtitle: 'Au plaisir de vous entendre!',
		description: 'Trouvez mes coordonnées sur ma carte de visite ci-dessous.',
		downloadCV: 'Télécharger CV',
		sendEmail: 'Envoyer un email',
		name: 'Nom',
		email: 'Email',
		message: 'Message',
		send: 'Envoyer le message',
		sending: 'Envoi en cours...',
		success: 'Message envoyé avec succès!',
		error: "Échec de l'envoi du message. Veuillez réessayer.",
		namePlaceholder: 'Votre nom',
		emailPlaceholder: 'votre.email@exemple.com',
		messagePlaceholder: 'Votre message...'
	},

	footer: {
		rights: 'Tous droits réservés',
		madeWith: 'Fait avec',
		and: 'et'
	},

	common: {
		loading: 'Chargement...',
		learnMore: 'En savoir plus',
		close: 'Fermer',
		back: 'Retour'
	}
};
