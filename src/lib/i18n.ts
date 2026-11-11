export type Locale = "en" | "fr";

export const LOCALES: Locale[] = ["en", "fr"];

type Feature = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
};

export type Copy = {
  meta: { title: string; description: string };
  nav: { features: string; modes: string; specs: string; preorder: string; switchTo: string };
  hero: {
    eyebrow: string;
    tagline: string;
    intro: string;
    cta: string;
    secondary: string;
    stats: { value: string; label: string }[];
  };
  manifesto: { line1: string; line2: string; body: string };
  features: Feature[];
  modes: {
    eyebrow: string;
    title: string;
    body: string;
    families: { key: string; name: string; desc: string; variants: string[] }[];
    gesture: string;
  };
  specs: { eyebrow: string; title: string; rows: { label: string; value: string }[] };
  preorder: {
    eyebrow: string;
    title: string;
    body: string;
    email: string;
    name: string;
    country: string;
    message: string;
    messagePlaceholder: string;
    optional: string;
    submit: string;
    sending: string;
    successTitle: string;
    successBody: string;
    already: string;
    errorInvalidEmail: string;
    errorGeneric: string;
    privacy: string;
  };
  footer: { rights: string; made: string };
};

const en: Copy = {
  meta: {
    title: "QESSEQ 16 — Advanced MIDI Sequencer by WipidiM",
    description:
      "QESSEQ 16 by WipidiM: a 16-track advanced MIDI sequencer with 48 lit pads, 8 encoders and built-in generators for basslines, leads and harmonies. Join the pre-order list.",
  },
  nav: {
    features: "Features",
    modes: "Modes",
    specs: "Specs",
    preorder: "Pre-order",
    switchTo: "FR",
  },
  hero: {
    eyebrow: "WipidiM · High Music Dive",
    tagline: "The advanced MIDI sequencer",
    intro:
      "Sixteen tracks, forty-eight lit pads, eight encoders and a brain that writes basslines, leads and harmonies with you. No menus to save, no computer required.",
    cta: "Join the pre-order list",
    secondary: "Explore the instrument",
    stats: [
      { value: "16", label: "tracks" },
      { value: "64", label: "steps per track" },
      { value: "48", label: "lit pads" },
      { value: "8", label: "encoders" },
    ],
  },
  manifesto: {
    line1: "Everything is live.",
    line2: "Dive in.",
    body: "One instrument, three ways to play: a keyboard, a 16-track sequencer, and a bank of MIDI knobs. Every change happens while the music runs.",
  },
  features: [
    {
      id: "sequence",
      eyebrow: "01 — Sequence",
      title: "Sixteen tracks. Each with its own time.",
      body: "One track per MIDI channel, up to 64 steps each. Run tracks at different lengths and speeds for polymeters and polyrhythms that never repeat the same way twice.",
      points: ["DRUM, MONO and POLY track types", "Gate, velocity, accent, glide, tie and probability per step", "Internal clock or external MIDI sync"],
    },
    {
      id: "generate",
      eyebrow: "02 — Generate",
      title: "Let it write the bassline.",
      body: "Built-in generators roll basslines, leads, arpeggios and harmonies that stay in your key and scale. Turn FILL, ACCENT and GLIDE until it grooves. Don't like it? Hold to undo.",
      points: ["Bass, Lead, Arp, Harm, Comp and Skank engines", "Classic random or Euclidean rhythms", "18 drum styles with live fill and motion"],
    },
    {
      id: "follow",
      eyebrow: "03 — Follow",
      title: "Chain tracks into harmony.",
      body: "Point one track at another and it listens. A lead follows your chords, a harmony track reads your bassline, a bass locks to the progression. Change one part and the others move with it.",
      points: ["Bass → Harm → Chords → Lead chains", "Follow, or freeze the chord of the moment", "Chord-tone and guide-tone mapping"],
    },
    {
      id: "play",
      eyebrow: "04 — Play",
      title: "A keyboard that knows the scale.",
      body: "Play notes or full chords on the pads. Only in-scale pads light up, so every press sounds right. Go deeper with the progression engine and its 18 genre grammars.",
      points: ["Scales, keys and octaves on the encoders", "Chords with latch", "Live record and overdub into the sequencer"],
    },
    {
      id: "control",
      eyebrow: "05 — Control",
      title: "Eight knobs. Your whole studio.",
      body: "Switch to encoder mode and the eight knobs become MIDI CC controllers, with banks for 36 CCs. Your DAW sends values back, so the knobs always match. Drive Ableton Live clips and devices too.",
      points: ["CC banks F1–F4", "Two-way value feedback", "Ableton Live clip and device control"],
    },
  ],
  modes: {
    eyebrow: "Three families · Twelve modes",
    title: "One pad picks the mode. The screen tells you where you are.",
    body: "Each family has four variants. The instrument remembers the last one you used.",
    families: [
      {
        key: "ENC",
        name: "Encoder",
        desc: "Knobs as MIDI controllers",
        variants: ["CC knobs & banks", "Shared sequencer controls", "Channel select", "Channel picker"],
      },
      {
        key: "SEQ",
        name: "Sequencer",
        desc: "Program, generate, chain",
        variants: ["Tracks & steps", "Effects & step row", "Track setup", "Timing, input & save"],
      },
      {
        key: "KEY",
        name: "Keyboard",
        desc: "Play notes and chords",
        variants: ["Chromatic keyboard", "Chords & latch", "Channel select", "Genre progression engine"],
      },
    ],
    gesture: "Tap · double-tap · hold — three gestures reach every variant.",
  },
  specs: {
    eyebrow: "Under the panel",
    title: "Specifications",
    rows: [
      { label: "Tracks", value: "16, one per MIDI channel" },
      { label: "Steps", value: "Up to 64 per track (4 × 16)" },
      { label: "Pads", value: "48 illuminated touch pads" },
      { label: "Encoders", value: "8 endless encoders" },
      { label: "Lighting", value: "Addressable RGB LEDs" },
      { label: "Display", value: "Built-in status screen" },
      { label: "MIDI", value: "USB-MIDI + 5-pin DIN input" },
      { label: "Clock", value: "Internal master or external MIDI sync" },
      { label: "Firmware", value: "Updatable over USB" },
    ],
  },
  preorder: {
    eyebrow: "Pre-order list",
    title: "Be first in line.",
    body: "The first QESSEQ 16 units are coming. Leave your email and we'll contact you as soon as pre-orders open.",
    email: "Email",
    name: "Name",
    country: "Country",
    message: "Anything to tell us?",
    messagePlaceholder: "Your setup, your music, your questions…",
    optional: "optional",
    submit: "Join the list",
    sending: "Sending…",
    successTitle: "You're on the list.",
    successBody: "Thanks for diving in. We'll email you as soon as pre-orders open.",
    already: "This email is already on the list — you're all set.",
    errorInvalidEmail: "Please enter a valid email address.",
    errorGeneric: "Something went wrong. Please try again.",
    privacy: "No payment now. We only use your email to contact you about the QESSEQ 16.",
  },
  footer: { rights: "All rights reserved.", made: "Designed for the deep end of music." },
};

const fr: Copy = {
  meta: {
    title: "QESSEQ 16 — Séquenceur MIDI avancé par WipidiM",
    description:
      "QESSEQ 16 par WipidiM : un séquenceur MIDI avancé 16 pistes avec 48 pads lumineux, 8 encodeurs et des générateurs de basses, leads et harmonies. Inscrivez-vous à la liste de précommande.",
  },
  nav: {
    features: "Fonctions",
    modes: "Modes",
    specs: "Caractéristiques",
    preorder: "Précommande",
    switchTo: "EN",
  },
  hero: {
    eyebrow: "WipidiM · High Music Dive",
    tagline: "Le séquenceur MIDI avancé",
    intro:
      "Seize pistes, quarante-huit pads lumineux, huit encodeurs et un cerveau qui écrit basses, leads et harmonies avec vous. Aucun menu à sauvegarder, aucun ordinateur nécessaire.",
    cta: "Rejoindre la liste de précommande",
    secondary: "Découvrir l'instrument",
    stats: [
      { value: "16", label: "pistes" },
      { value: "64", label: "pas par piste" },
      { value: "48", label: "pads lumineux" },
      { value: "8", label: "encodeurs" },
    ],
  },
  manifesto: {
    line1: "Tout est en direct.",
    line2: "Plongez.",
    body: "Un instrument, trois façons de jouer : un clavier, un séquenceur 16 pistes et une banque de potentiomètres MIDI. Chaque réglage se fait pendant que la musique tourne.",
  },
  features: [
    {
      id: "sequence",
      eyebrow: "01 — Séquencer",
      title: "Seize pistes. Chacune son propre temps.",
      body: "Une piste par canal MIDI, jusqu'à 64 pas chacune. Faites tourner les pistes à des longueurs et vitesses différentes pour des polymétries et polyrythmies qui ne se répètent jamais de la même façon.",
      points: ["Pistes DRUM, MONO et POLY", "Gate, vélocité, accent, glide, liaison et probabilité par pas", "Horloge interne ou synchro MIDI externe"],
    },
    {
      id: "generate",
      eyebrow: "02 — Générer",
      title: "Laissez-le écrire la ligne de basse.",
      body: "Les générateurs intégrés créent basses, leads, arpèges et harmonies qui restent dans votre tonalité et votre gamme. Tournez FILL, ACCENT et GLIDE jusqu'à trouver le groove. Pas convaincu ? Maintenez pour annuler.",
      points: ["Moteurs Bass, Lead, Arp, Harm, Comp et Skank", "Rythmes aléatoires classiques ou euclidiens", "18 styles de batterie avec fill et mouvement en direct"],
    },
    {
      id: "follow",
      eyebrow: "03 — Suivre",
      title: "Enchaînez les pistes en harmonie.",
      body: "Pointez une piste vers une autre et elle l'écoute. Un lead suit vos accords, une piste d'harmonie lit votre basse, une basse se cale sur la progression. Changez une partie, les autres suivent.",
      points: ["Chaînes Basse → Harm → Accords → Lead", "Suivre, ou figer l'accord du moment", "Mapping sur notes d'accord et notes guides"],
    },
    {
      id: "play",
      eyebrow: "04 — Jouer",
      title: "Un clavier qui connaît la gamme.",
      body: "Jouez des notes ou des accords complets sur les pads. Seuls les pads de la gamme s'allument : chaque note sonne juste. Allez plus loin avec le moteur de progressions et ses 18 grammaires de genres.",
      points: ["Gammes, tonalités et octaves sur les encodeurs", "Accords avec latch", "Enregistrement et overdub en direct dans le séquenceur"],
    },
    {
      id: "control",
      eyebrow: "05 — Contrôler",
      title: "Huit encodeurs. Tout votre studio.",
      body: "En mode encodeur, les huit potentiomètres deviennent des contrôleurs MIDI CC, avec des banques pour 36 CC. Votre DAW renvoie les valeurs : les encodeurs restent toujours synchronisés. Pilotez aussi les clips et devices d'Ableton Live.",
      points: ["Banques CC F1–F4", "Retour de valeurs bidirectionnel", "Contrôle des clips et devices Ableton Live"],
    },
  ],
  modes: {
    eyebrow: "Trois familles · Douze modes",
    title: "Un pad choisit le mode. L'écran vous dit où vous êtes.",
    body: "Chaque famille a quatre variantes. L'instrument se souvient de la dernière utilisée.",
    families: [
      {
        key: "ENC",
        name: "Encodeur",
        desc: "Potentiomètres en contrôleurs MIDI",
        variants: ["Encodeurs CC & banques", "Contrôles séquenceur partagés", "Choix du canal", "Sélecteur de canal"],
      },
      {
        key: "SEQ",
        name: "Séquenceur",
        desc: "Programmer, générer, enchaîner",
        variants: ["Pistes & pas", "Effets & rangée de pas", "Réglage des pistes", "Timing, entrée & sauvegarde"],
      },
      {
        key: "KEY",
        name: "Clavier",
        desc: "Jouer notes et accords",
        variants: ["Clavier chromatique", "Accords & latch", "Choix du canal", "Moteur de progressions par genre"],
      },
    ],
    gesture: "Tap · double-tap · maintien — trois gestes pour atteindre chaque variante.",
  },
  specs: {
    eyebrow: "Sous le capot",
    title: "Caractéristiques",
    rows: [
      { label: "Pistes", value: "16, une par canal MIDI" },
      { label: "Pas", value: "Jusqu'à 64 par piste (4 × 16)" },
      { label: "Pads", value: "48 pads tactiles lumineux" },
      { label: "Encodeurs", value: "8 encodeurs sans fin" },
      { label: "Éclairage", value: "LED RGB adressables" },
      { label: "Écran", value: "Écran d'état intégré" },
      { label: "MIDI", value: "USB-MIDI + entrée DIN 5 broches" },
      { label: "Horloge", value: "Maître interne ou synchro MIDI externe" },
      { label: "Firmware", value: "Mise à jour par USB" },
    ],
  },
  preorder: {
    eyebrow: "Liste de précommande",
    title: "Soyez les premiers.",
    body: "Les premiers QESSEQ 16 arrivent. Laissez votre email, nous vous contacterons dès l'ouverture des précommandes.",
    email: "Email",
    name: "Nom",
    country: "Pays",
    message: "Quelque chose à nous dire ?",
    messagePlaceholder: "Votre setup, votre musique, vos questions…",
    optional: "facultatif",
    submit: "M'inscrire",
    sending: "Envoi…",
    successTitle: "Vous êtes sur la liste.",
    successBody: "Merci de plonger avec nous. Nous vous écrirons dès l'ouverture des précommandes.",
    already: "Cet email est déjà sur la liste — tout est en ordre.",
    errorInvalidEmail: "Merci d'entrer une adresse email valide.",
    errorGeneric: "Une erreur est survenue. Merci de réessayer.",
    privacy: "Aucun paiement maintenant. Votre email sert uniquement à vous contacter au sujet du QESSEQ 16.",
  },
  footer: { rights: "Tous droits réservés.", made: "Conçu pour les profondeurs de la musique." },
};

export const COPY: Record<Locale, Copy> = { en, fr };
