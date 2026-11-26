/**
 * Configuração central do site.
 * Para adicionar um projeto: inclua um item em `projects` e coloque a miniatura
 * em public/projects/<slug>.webp (ou rode `npm run screenshots`). Veja o README.
 *
 * Textos com { pt, en } aparecem em português ou inglês conforme o idioma escolhido.
 * Os textos das seções ficam em src/data/content.ts.
 */

export type Lang = "pt" | "en";
export type Localized = Record<Lang, string>;
export type ContactChannel = "whatsapp" | "email";

export const owner = {
  name: "Vitor Otávio",
  /** Só números, com código do país e DDD (ex.: 5531999999999). Preencher antes de publicar. */
  whatsappNumber: "5531993628211",
  /** Mensagem que já vem escrita ao abrir o WhatsApp, no idioma da página. */
  whatsappMessage: {
    pt: "Olá, Vitor! Vi seu portfólio e quero saber mais sobre um site para o meu negócio.",
    en: "Hi Vitor! I saw your portfolio and I'd like to know more about a website for my business.",
  } satisfies Localized,
  /** URL completa do perfil (ex.: https://instagram.com/usuario). Vazio = link escondido. */
  instagram: "",
  /** E-mail de contato. Vazio = link escondido e a versão em inglês usa o WhatsApp. */
  email: "vitor.otavio15@gmail.com",
  /** Assunto e texto que já vêm escritos ao abrir o e-mail, no idioma da página. */
  emailSubject: {
    pt: "Quero um site para o meu negócio",
    en: "Website for my business",
  } satisfies Localized,
  emailBody: {
    pt: "Olá, Vitor! Vi seu portfólio e quero saber mais sobre um site para o meu negócio.\n\nMeu negócio: \nO que eu preciso: ",
    en: "Hi Vitor! I saw your portfolio and I'd like to know more about a website for my business.\n\nMy business: \nWhat I need: ",
  } satisfies Localized,
  /**
   * Canal de contato principal de cada idioma (botões "Quero meu site", "Pedir orçamento" etc.).
   * "email" só vale se `email` estiver preenchido; senão cai para o WhatsApp.
   */
  primaryContact: { pt: "whatsapp", en: "email" } satisfies Record<Lang, ContactChannel>,
  /** Endereço público deste portfólio, sem barra no final (ex.: https://portfolio.vitorotavio.workers.dev). Usado no Open Graph, nos links de idioma e no JSON-LD. */
  siteUrl: "https://portfolio.vitorotavio.workers.dev",
};

export const seo = {
  title: {
    pt: "Vitor Otávio — Criação de sites profissionais",
    en: "Vitor Otávio — Professional website design",
  } satisfies Localized,
  description: {
    pt: "Sites profissionais prontos em até 7 dias: passam confiança, abrem rápido no celular e levam o cliente direto para o seu WhatsApp. Preço fechado e prévia sem compromisso.",
    en: "Professional websites ready in up to 7 days: they build trust, load fast on mobile and turn visitors into customers. Fixed price and a no-commitment preview.",
  } satisfies Localized,
};

/** false = esconde de uma vez todos os cartões "Em breve". */
export const showComingSoon = true;

export type ProjectStatus = "published" | "coming-soon";

export interface Project {
  slug: string;
  name: string;
  /** Linha "segmento · tipo de site". */
  description: Localized;
  /** Link do site publicado. Vazio = cartão não clicável. */
  url: string;
  /** Caminho da miniatura dentro de /public (1200×750, WebP). */
  image: string;
  /** Selo verde de desempenho. Só números reais medidos. */
  badge?: Localized;
  /** true = o site do projeto tem versão em inglês; na versão em inglês do portfólio o link abre com ?lang=en. */
  hasEnglish?: boolean;
  status: ProjectStatus;
  /** Cor de fundo da miniatura dos projetos "em breve" (suave). */
  placeholderColor?: string;
}

export const projects: Project[] = [
  {
    slug: "forno-e-grao",
    name: "Forno & Grão",
    description: { pt: "Padaria · site institucional", en: "Bakery · business website" },
    url: "https://forno-e-grao.vercel.app",
    image: "/projects/forno-e-grao.webp",
    badge: { pt: "PageSpeed 98 · Acessibilidade 100", en: "PageSpeed 98 · Accessibility 100" },
    hasEnglish: true,
    status: "published",
  },
  {
    slug: "tempero-da-vila",
    name: "Tempero da Vila",
    description: { pt: "Restaurante · pedidos pelo WhatsApp", en: "Restaurant · orders via WhatsApp" },
    url: "https://tempero-da-vila-tau.vercel.app",
    image: "/projects/tempero-da-vila.webp",
    hasEnglish: true,
    status: "published",
  },
  {
    slug: "lume",
    name: "Lume",
    description: { pt: "Alta gastronomia · reservas", en: "Fine dining · reservations" },
    url: "https://lume-cozinha-de-autor.vercel.app",
    image: "/projects/lume.webp",
    hasEnglish: true,
    status: "published",
  },
  {
    slug: "studio-lirio",
    name: "Studio Lírio",
    description: {
      pt: "Salão de beleza · agendamento pelo WhatsApp",
      en: "Beauty salon · booking via WhatsApp",
    },
    url: "https://studio-lirio.vercel.app",
    image: "/projects/studio-lirio.webp",
    hasEnglish: true,
    status: "published",
  },
  {
    slug: "confeitaria-lucrativa",
    name: "Confeitaria Lucrativa",
    description: { pt: "Curso online · landing page de vendas", en: "Online course · sales landing page" },
    url: "https://confeitaria-lucrativa-five.vercel.app",
    image: "/projects/confeitaria-lucrativa.webp",
    hasEnglish: true,
    status: "published",
  },
  {
    slug: "ana-lira-beauty",
    name: "Ana Lira Beauty",
    description: {
      pt: "Maquiadora de noivas · site one page",
      en: "Bridal makeup artist · one-page website",
    },
    url: "https://ana-lira-beauty.vercel.app",
    image: "/projects/ana-lira-beauty.webp",
    hasEnglish: true,
    status: "published",
  },
  // Exemplo de projeto ainda não pronto (aparece com selo "Em breve" se showComingSoon = true):
  // { slug: "clinica", name: "Clínica", description: { pt: "Saúde · agendamento", en: "Healthcare · booking" },
  //   url: "", image: "", status: "coming-soon", placeholderColor: "#E6ECF5" },
];

/* ------------------------------------------------------------------ */
/* Preços (seção "Preços")                                              */
/* ------------------------------------------------------------------ */

/** false = esconde a seção de preços inteira (e o item "Preços" do menu). */
export const showPricing = true;

export interface PricingPlan {
  id: string;
  name: Localized;
  /**
   * Valor como aparece na tela: em reais no português e em dólar no inglês (clientes de fora).
   * Entre "R$" e o número há um espaço inseparável (não quebra a linha no meio do preço).
   */
  price: Localized;
  /** Linha de apoio abaixo do preço. */
  note: Localized;
  /** true = cartão em destaque (borda azul e selo `highlightLabel`). */
  highlight?: boolean;
  features: Record<Lang, string[]>;
  /** Mensagem que já vem escrita ao tocar em "Quero este" (WhatsApp em PT, e-mail em EN). */
  message: Localized;
}

/** Texto do selo do cartão em destaque. */
export const highlightLabel: Localized = { pt: "Mais escolhido", en: "Most popular" };

export const pricing: PricingPlan[] = [
  {
    id: "site",
    name: { pt: "Site para o seu negócio", en: "Business website" },
    price: { pt: "R$ 497", en: "$290" },
    note: {
      pt: "Pagamento único · Pix ou até 12x no cartão",
      en: "One-time payment · card, PayPal or bank transfer",
    },
    highlight: true,
    features: {
      pt: [
        "Textos escritos para você",
        "Layout com as cores do seu negócio",
        "Versão para celular, tablet e computador",
        "Botão de WhatsApp com mensagem pronta",
        "Serviços, horários, endereço e mapa",
        "Preparado para aparecer no Google",
        "Imagem de compartilhamento para WhatsApp e redes",
        "Domínio .com.br no seu nome, 1º ano incluso",
        "2 rodadas de ajustes",
      ],
      en: [
        "Copy written for you",
        "Layout in your brand colors",
        "Works on phone, tablet and desktop",
        "Contact buttons (WhatsApp, phone or email)",
        "Services, hours, address and map",
        "Ready to show up on Google",
        "Share image for WhatsApp and social media",
        "Domain in your name, 1st year included",
        "2 rounds of revisions",
      ],
    },
    message: {
      pt: "Olá, Vitor! Vi seu portfólio e quero saber mais sobre o Site para o meu negócio.",
      en: "Hi Vitor! I saw your portfolio and I'd like to know more about the Business website.",
    },
  },
  {
    id: "landing",
    name: { pt: "Landing page de vendas", en: "Sales landing page" },
    price: { pt: "R$ 697", en: "$390" },
    note: {
      pt: "Pagamento único · Pix ou até 12x no cartão",
      en: "One-time payment · card, PayPal or bank transfer",
    },
    features: {
      pt: [
        "Página focada em vender um produto, serviço ou promoção",
        "Texto de vendas, oferta e perguntas frequentes",
        "Animações leves",
        "Botão de compra ou WhatsApp",
        "Domínio .com.br no seu nome, 1º ano incluso",
        "2 rodadas de ajustes",
      ],
      en: [
        "A page built to sell a product, service or promotion",
        "Sales copy, offer and FAQ",
        "Subtle animations",
        "Buy or contact button",
        "Domain in your name, 1st year included",
        "2 rounds of revisions",
      ],
    },
    message: {
      pt: "Olá, Vitor! Vi seu portfólio e quero saber mais sobre a Landing page de vendas.",
      en: "Hi Vitor! I saw your portfolio and I'd like to know more about the Sales landing page.",
    },
  },
  {
    id: "plano",
    name: { pt: "Plano mensal", en: "Monthly plan" },
    price: { pt: "R$ 49/mês", en: "$29/month" },
    note: { pt: "Sem fidelidade · cancele quando quiser", en: "No commitment · cancel anytime" },
    features: {
      pt: [
        "Hospedagem do site",
        "Até 2 alterações por mês (texto, foto, horário, preço)",
        "Suporte pelo WhatsApp em dias úteis",
        "Renovação do domínio acompanhada",
      ],
      en: [
        "Website hosting",
        "Up to 2 changes a month (text, photo, hours, prices)",
        "Email or WhatsApp support on business days",
        "Domain renewal taken care of",
      ],
    },
    message: {
      pt: "Olá, Vitor! Vi seu portfólio e quero saber mais sobre o Plano mensal.",
      en: "Hi Vitor! I saw your portfolio and I'd like to know more about the Monthly plan.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Dúvidas frequentes (seção "Dúvidas" e JSON-LD FAQPage em português)  */
/* ------------------------------------------------------------------ */

export const faq: { question: Localized; answer: Localized }[] = [
  {
    question: { pt: "Preciso entender de site ou tecnologia?", en: "Do I need to know anything about websites or tech?" },
    answer: {
      pt: "Não. Você me manda as informações pelo WhatsApp e eu cuido de tudo: textos, layout, publicação e endereço.",
      en: "No. You send me your information and I take care of everything: copy, layout, publishing and domain.",
    },
  },
  {
    question: { pt: "Em quanto tempo o site fica pronto?", en: "How long does it take?" },
    answer: {
      pt: "Em até 7 dias depois que eu receber as informações e fotos do seu negócio.",
      en: "Up to 7 days after I receive your business information and photos.",
    },
  },
  {
    question: { pt: "O domínio .com.br está incluso?", en: "Is the domain included?" },
    answer: {
      pt: "Sim. O primeiro ano já está no preço. Eu registro e configuro, e o domínio fica no seu nome e CPF/CNPJ, então é seu de verdade. A partir do 2º ano, a renovação (cerca de R$ 40 por ano) está inclusa no plano mensal ou você paga direto.",
      en: "Yes. The first year is included in the price, with a .com or your country's ending. I register and set it up in your name, so it's truly yours. From the 2nd year on, the renewal (about $15 to $25 a year) is included in the monthly plan, or you pay it directly.",
    },
  },
  {
    question: { pt: "Como posso pagar?", en: "How can I pay?" },
    answer: {
      pt: "À vista no Pix, em duas partes (metade para começar e metade na aprovação) ou em até 12x no cartão. Tudo fica registrado em contrato.",
      en: "By card, PayPal or international bank transfer, in full or in two parts (half to start and half on approval). Prices are in US dollars, and everything is set out in a contract.",
    },
  },
  {
    question: { pt: "Sou obrigado a assinar o plano mensal?", en: "Do I have to sign up for the monthly plan?" },
    answer: {
      pt: "Não. Ele é opcional e sem fidelidade. Se cancelar, você recebe os arquivos do site e eu ajudo a transferir.",
      en: "No. It's optional, with no commitment. If you cancel, you get the website files and I help you move it.",
    },
  },
  {
    question: { pt: "Já tenho Instagram. Por que preciso de um site?", en: "I already have Instagram. Why do I need a website?" },
    answer: {
      pt: "O Instagram mostra seu dia a dia. O site é onde o cliente encontra tudo de uma vez quando pesquisa no Google: serviços, horários, endereço e contato.",
      en: "Instagram shows your day-to-day. Your website is where customers find everything at once when they search on Google: services, hours, address and contact.",
    },
  },
  {
    question: { pt: "Posso mudar alguma coisa depois?", en: "Can I change things later?" },
    answer: {
      pt: "Pode. No plano mensal, até 2 alterações por mês estão inclusas. Mudanças maiores, como uma página nova, são orçadas à parte.",
      en: "Yes. The monthly plan includes up to 2 changes a month. Bigger changes, like a new page, are quoted separately.",
    },
  },
  {
    question: { pt: "Atende minha cidade?", en: "Do you work with businesses where I am?" },
    answer: {
      pt: "Atendo negócios de todo o Brasil. Todo o processo é feito pelo WhatsApp.",
      en: "Yes, wherever you are. The whole process happens online, by email or WhatsApp.",
    },
  },
];
