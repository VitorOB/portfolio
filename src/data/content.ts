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
      { id: "servicos", label: "Serviços" },
      { id: "como-funciona", label: "Como funciona" },
    ],
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
  },
  /** Botão de idioma: mostra o idioma de destino. */
  langSwitch: { short: "EN", label: "View in English", target: "en" as Lang },
  cta: "Quero meu site",
  hero: {
    eyebrow: "Criação de sites profissionais",
    title: "Seu cliente procurou no Google. Encontrou você ou o concorrente?",
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
  services: {
    title: "O que eu faço",
    items: [
      { title: "Site institucional.", text: "Serviços, história, horários, endereço e WhatsApp em uma página." },
      { title: "Landing page.", text: "Uma página para vender um produto, um serviço ou uma promoção." },
      { title: "Plano mensal.", text: "Hospedagem, ajustes e suporte, sem você se preocupar com nada." },
    ],
  },
  how: {
    title: "Como funciona",
    items: [
      { title: "A gente conversa.", text: "Pelo WhatsApp, você me conta sobre o seu negócio e o que precisa." },
      { title: "Eu crio, você aprova.", text: "Mostro o site antes de publicar e ajusto o que for preciso." },
      { title: "Site no ar.", text: "Publicado, rápido no celular e pronto para receber clientes." },
    ],
  },
  contact: {
    title: "Pronto para ser encontrado?",
    text: "Me conte sobre o seu negócio. A conversa é sem compromisso.",
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
      { id: "servicos", label: "Services" },
      { id: "como-funciona", label: "How it works" },
    ],
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  langSwitch: { short: "PT", label: "Ver em português", target: "pt" },
  cta: "Get my website",
  hero: {
    eyebrow: "Professional website design",
    title: "Your customer searched on Google. Did they find you or your competitor?",
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
  services: {
    title: "What I do",
    items: [
      { title: "Business website.", text: "Services, story, hours, location and contact details on a single page." },
      { title: "Landing page.", text: "A page built to sell a product, a service or a promotion." },
      { title: "Monthly plan.", text: "Hosting, updates and support, so you don't have to worry about a thing." },
    ],
  },
  how: {
    title: "How it works",
    items: [
      { title: "We talk.", text: "By email, you tell me about your business and what you need." },
      { title: "I build, you approve.", text: "I show you the website before it goes live and adjust whatever is needed." },
      { title: "Your site goes live.", text: "Published, fast on mobile and ready to welcome customers." },
    ],
  },
  contact: {
    title: "Ready to be found?",
    text: "Tell me about your business. No strings attached.",
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
