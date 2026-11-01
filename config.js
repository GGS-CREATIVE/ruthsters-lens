/* Réglages Ruthsters Lens : seul fichier à modifier pour brancher l'agenda et les contacts. */
window.RL_CONFIG = {
  // Nom d'utilisateur Cal.com de Ruth (cal.com/<username>). Vide = pas d'agenda, la demande part en message.
  calUsername: "ruth-sampasa-1dngrd",

  // Lien (slug) de chaque type de séance créé dans Cal.com : cal.com/<username>/<slug>
  calEvents: {
    portrait: "portrait",
    birthday: "anniversaire-creatif",
    duo: "duo-petit-groupe",
    large: "grand-groupe",
    maternitySolo: "maternite-solo",
    maternityFamily: "maternite-famille",
    event: "petit-evenement"
  },

  // Couleur des boutons dans l'agenda Cal.com
  calBrand: "#111111",

  // Contacts pour les demandes de devis (mariage) ou si l'agenda n'est pas branché
  whatsapp: "",            // format international sans + ni espaces, ex. 32470123456
  email: "",
  instagram: "ruthsters_lens",

  // Compte pour l'acompte de 50 % (virement sous 24 h)
  iban: "BE26 0638 4220 1929",

  // Photos de la page d'accueil, dans assets/ (laisser vide pour ne rien afficher)
  gallery: [
    { src: "assets/creatif-jaune.jpg", alt: "Shooting créatif, tenue jaune" },
    { src: "assets/portrait-noir.jpg", alt: "Portrait en robe noire" },
    { src: "assets/maternite-solo.jpg", alt: "Séance maternité solo" },
    { src: "assets/couple.jpg", alt: "Séance couple" },
    { src: "assets/anniversaire.jpg", alt: "Shooting anniversaire 23 ans" },
    { src: "assets/roses.jpg", alt: "Shooting créatif aux roses rouges" },
    { src: "assets/maternite-famille.jpg", alt: "Séance maternité en famille" },
    { src: "assets/groupe.jpg", alt: "Shooting de groupe entre amies", wide: true },
    { src: "assets/diplome.jpg", alt: "Shooting de remise de diplôme" },
    { src: "assets/portrait-blanc.jpg", alt: "Portrait en robe blanche" },
    { src: "assets/maternite-couple.jpg", alt: "Séance maternité en couple" }
  ]
};
