/** Textos das seções em português e inglês. A versão em português é a referência de formato. */
import type { Lang } from "./site";

const pt = {
  skipLink: "Pular para o conteúdo",
  newTab: "(abre em nova aba)",
  newTabWhatsApp: "(abre o WhatsApp em nova aba)",
  opensEmail: "(abre o seu aplicativo de e-mail)",
  nav: {
    label: "Principal",
    items: [
      { id: "por-que", label: "Por que um site" },
      { id: "projetos", label: "Projetos" },
      { id: "como-funciona", label: "Como funciona" },
      { id: "precos", label: "Preços" },
      { id: "duvidas", label: "Dúvidas" },
    ],
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
  },
  /** Botão de idioma: mostra o idioma de destino. */
  langSwitch: { short: "EN", label: "View in English", target: "en" as Lang },
  cta: "Quero meu site",
  hero: {
    eyebrow: "Criação de sites profissionais",
    /** Uma frase por linha: cada uma entra separada na abertura da página. */
    title: ["Seu cliente procurou no Google.", "Encontrou você ou o concorrente?"],
    text: "Crio sites profissionais que passam confiança, abrem rápido no celular e levam o cliente direto para o seu WhatsApp. Para negócios de qualquer segmento.",
    secondary: "Ver projetos",
  },
  why: {
    title: "Só o Instagram não é suficiente.",
    text: "Antes de comprar ou agendar, o cliente pesquisa. Se ele não encontra informação clara, vai para quem tem.",
    items: [
      {
        title: "Seja encontrado.",
        text: "Um site ajuda o seu negócio a aparecer quando alguém procura pelo que você oferece na sua região.",
      },
      {
        title: "Passe confiança.",
        text: "Um site bem feito mostra que o seu negócio é sério antes mesmo da primeira conversa.",
      },
      {
        title: "Não dependa do algoritmo.",
        text: "No Instagram, quem decide quem vê seus posts é a plataforma. No site, suas informações estão sempre lá.",
      },
      {
        title: "Menos perguntas, mais vendas.",
        text: "Serviços, horários e endereço em um só lugar. O cliente chega no WhatsApp pronto para fechar.",
      },
    ],
    /** Textos das pequenas ilustrações de cada motivo (exemplos com os sites demonstrativos). */
    visual: {
      query: "padaria artesanal perto de mim",
      resultTitle: "Forno & Grão · Padaria artesanal",
      resultText: "Pães de fermentação natural, doces de vitrine e café especial.",
      infoTitle: "Studio Lírio",
      infoRows: [
        ["Horário", "Ter a sáb · 9h às 19h"],
        ["Endereço", "Rua das Magnólias, 120"],
        ["Agendamento", "Pelo WhatsApp"],
      ] as [string, string][],
      infoStatus: "Informações sempre no ar",
      chatIn: "Oi! Vi o cardápio no site. Quero 2 marmitas de frango para as 12h.",
      chatOut: "Perfeito, anotado! Fica pronto às 11h50.",
    },
  },
  projects: {
    title: "Projetos",
    text: "Cada negócio tem um público diferente. Por isso, cada site tem uma identidade própria.",
    note: "Sites demonstrativos · clique para abrir",
    listLabel: "Lista de projetos",
    prev: "Projetos anteriores",
    next: "Próximos projetos",
    pause: "Pausar a passagem automática",
    play: "Retomar a passagem automática",
    comingSoon: "Em breve",
    thumbAlt: (name: string) => `Página inicial do site ${name}`,
    yourBusiness: "O seu negócio aqui",
    quote: "Pedir orçamento",
    nextTitle: "Próximo projeto",
    nextText: "Qualquer segmento, qualquer lugar",
  },
  how: {
    title: "Como funciona",
    text: "Do primeiro contato ao site no ar em até 7 dias.",
    items: [
      {
        title: "Você me conta sobre o negócio.",
        text: "Pelo WhatsApp, você manda as informações, fotos e logo. Não precisa entender nada de site.",
      },
      {
        title: "Eu monto e escrevo os textos.",
        text: "Crio o layout com a cara do seu negócio, pensado para o celular, com botão de WhatsApp.",
      },
      {
        title: "Você vê antes e pede ajustes.",
        text: "Mostro o site pronto por link. São até 2 rodadas de ajustes inclusas.",
      },
      {
        title: "Site no ar no seu endereço.",
        text: "Publico com o domínio .com.br no seu nome e o site começa a receber clientes.",
      },
    ],
  },
  guarantee: {
    title: "Você vê o site pronto antes de fechar.",
    text: "Monto uma prévia do seu site sem compromisso. Se não gostar, você não paga nada.",
  },
  pricing: {
    title: "Preços",
    text: "Valor fechado, sem surpresa.",
    includes: "O que está incluso",
    button: "Quero este",
    note: "Não inclui loja virtual, sistema de agendamento, área de login ou fotografia profissional. Se precisar, peça um orçamento.",
  },
  faq: {
    title: "Dúvidas frequentes",
  },
  contact: {
    title: "Pronto para ser encontrado?",
    text: "Me conte sobre o seu negócio. Eu monto uma prévia sem compromisso.",
    buttonWhatsApp: "Falar no WhatsApp",
    buttonEmail: "Enviar um e-mail",
    orWhatsApp: "ou chame no WhatsApp",
  },
  footer: {
    tagline: "Sites profissionais para qualquer segmento",
    email: "E-mail",
  },
};

export type Content = typeof pt;

const en: Content = {
  skipLink: "Skip to content",
  newTab: "(opens in a new tab)",
  newTabWhatsApp: "(opens WhatsApp in a new tab)",
  opensEmail: "(opens your email app)",
  nav: {
    label: "Main",
    items: [
      { id: "por-que", label: "Why a website" },
      { id: "projetos", label: "Projects" },
      { id: "como-funciona", label: "How it works" },
      { id: "precos", label: "Pricing" },
      { id: "duvidas", label: "FAQ" },
    ],
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  langSwitch: { short: "PT", label: "Ver em português", target: "pt" },
  cta: "Get my website",
  hero: {
    eyebrow: "Professional website design",
    title: ["Your customer searched on Google.", "Did they find you or your competitor?"],
    text: "I build professional websites that build trust, load fast on mobile and turn visitors into customers. For businesses in any industry.",
    secondary: "See projects",
  },
  why: {
    title: "Instagram alone isn't enough.",
    text: "Before buying or booking, customers do their research. If they can't find clear information, they go to someone who has it.",
    items: [
      {
        title: "Get found.",
        text: "A website helps your business show up when people search for what you offer in your area.",
      },
      {
        title: "Build trust.",
        text: "A well-made website shows your business is serious before the first conversation even starts.",
      },
      {
        title: "Don't depend on the algorithm.",
        text: "On Instagram, the platform decides who sees your posts. On your website, your information is always there.",
      },
      {
        title: "Fewer questions, more sales.",
        text: "Services, hours and address in one place. Customers reach out ready to buy.",
      },
    ],
    visual: {
      query: "artisan bakery near me",
      resultTitle: "Forno & Grão · Artisan bakery",
      resultText: "Sourdough bread, pastries and specialty coffee.",
      infoTitle: "Studio Lírio",
      infoRows: [
        ["Hours", "Tue to Sat · 9am to 7pm"],
        ["Address", "Rua das Magnólias, 120"],
        ["Booking", "Via WhatsApp"],
      ],
      infoStatus: "Information always online",
      chatIn: "Hi! I saw the menu on your website. I'd like 2 chicken lunch boxes for noon.",
      chatOut: "Perfect, noted! It'll be ready at 11:50.",
    },
  },
  projects: {
    title: "Projects",
    text: "Every business has a different audience. That's why every website has its own identity.",
    note: "Demo websites · click to open",
    listLabel: "Project list",
    prev: "Previous projects",
    next: "Next projects",
    pause: "Pause automatic scrolling",
    play: "Resume automatic scrolling",
    comingSoon: "Coming soon",
    thumbAlt: (name: string) => `Homepage of the ${name} website`,
    yourBusiness: "Your business here",
    quote: "Get a quote",
    nextTitle: "Next project",
    nextText: "Any industry, anywhere",
  },
  how: {
    title: "How it works",
    text: "From first contact to a live website in up to 7 days.",
    items: [
      {
        title: "You tell me about your business.",
        text: "By email or WhatsApp, you send your information, photos and logo. No website know-how needed.",
      },
      {
        title: "I build it and write the copy.",
        text: "I design a layout that fits your business, made for mobile, with clear contact buttons.",
      },
      {
        title: "You see it first and ask for changes.",
        text: "I send you the finished website as a link. Up to 2 rounds of revisions are included.",
      },
      {
        title: "Live on your own domain.",
        text: "I publish it on a domain registered in your name, and it starts welcoming customers.",
      },
    ],
  },
  guarantee: {
    title: "You see your finished website before you commit.",
    text: "I build a no-commitment preview of your website. If you don't like it, you don't pay anything.",
  },
  pricing: {
    title: "Pricing",
    text: "Fixed price, no surprises.",
    includes: "What's included",
    button: "I want this",
    note: "Doesn't include an online store, booking system, login area or professional photography. If you need any of these, ask for a quote.",
  },
  faq: {
    title: "Frequently asked questions",
  },
  contact: {
    title: "Ready to be found?",
    text: "Tell me about your business. I'll build a no-commitment preview.",
    buttonWhatsApp: "Chat on WhatsApp",
    buttonEmail: "Email me",
    orWhatsApp: "or chat on WhatsApp",
  },
  footer: {
    tagline: "Professional websites for any industry",
    email: "Email",
  },
};

export const content: Record<Lang, Content> = { pt, en };
