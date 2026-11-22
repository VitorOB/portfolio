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
    pt: "Sites profissionais que passam confiança, abrem rápido no celular e levam o cliente direto para o seu WhatsApp. Para negócios de qualquer segmento.",
    en: "Professional websites that build trust, load fast on mobile and turn visitors into customers. For businesses in any industry.",
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
    // Sem versão em inglês: no portfólio em inglês, o link abre o site em português.
    status: "published",
  },
  // Exemplo de projeto ainda não pronto (aparece com selo "Em breve" se showComingSoon = true):
  // { slug: "clinica", name: "Clínica", description: { pt: "Saúde · agendamento", en: "Healthcare · booking" },
  //   url: "", image: "", status: "coming-soon", placeholderColor: "#E6ECF5" },
];
