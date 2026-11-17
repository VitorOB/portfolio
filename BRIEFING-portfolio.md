# BRIEFING — Projeto 05: Portfólio Vitor Otávio — Sites para pequenos negócios

## 0. Contexto (leia primeiro)

Este é o site profissional de Vitor Otávio, que cria sites para pequenos negócios de todo o Brasil: salões, lojas, restaurantes, clínicas e prestadores de serviço.

O visitante principal **não é técnico**. É o dono de um pequeno negócio que chegou por uma mensagem no WhatsApp, no Instagram ou por e-mail. Em menos de 1 minuto, o site precisa:

1. Fazer esse dono sentir que está perdendo clientes por não ter um site.
2. Mostrar projetos bonitos e variados, que provem que Vitor sabe fazer.
3. Levar o visitante a chamar no WhatsApp.

**Restrições:**

- Não inventar números, depoimentos, clientes ou resultados. O único número permitido é o desempenho real medido nos projetos (ex.: "PageSpeed 98").
- Não falar de tecnologia nem de IA para o visitante. Ele compra o resultado, não a ferramenta.
- Fora do escopo: backend, formulário com envio, blog e painel administrativo.

## 1. Prioridades (em caso de conflito, siga esta ordem)

1. Clareza e conversão no celular.
2. Acessibilidade WCAG 2.2 AA.
3. Desempenho: Lighthouse mobile ≥ 95. Este site é a vitrine técnica de Vitor, então precisa ser o mais rápido de todos.
4. Facilidade de manutenção: adicionar um projeto novo deve ser só editar `src/data/site.ts` e colocar uma imagem.

## 2. Identidade visual

O site segue fielmente a direção aprovada: **minimal claro**, simples, objetivo e fácil de ler. Os projetos são os únicos elementos coloridos da página. A moldura do portfólio é neutra para que eles se destaquem.

### Paleta

| Uso | Cor |
|---|---|
| Fundo | `#FAFAF8` |
| Superfície dos cartões | `#FFFFFF`, com borda `#E4E4E0` |
| Linhas divisórias | `#DADAD6` |
| Texto principal | `#1A1A1A` |
| Texto secundário | `#555555` |
| Destaque (azul): botão principal, números e links | `#2348D8` |
| Bloco de contato | fundo `#1A1A1A`, texto `#FFFFFF`, texto secundário `#CFCFCF` |
| Selo de desempenho | `#1E6B3A` |

Verifique o contraste de toda combinação nova.

### Tipografia

- Títulos e logo: **Space Grotesk** (500 a 700), com letter-spacing levemente negativo nos títulos grandes.
- Texto: **Inter** (400 a 600).
- Hospede as fontes localmente com `@fontsource` (ou pelo Google Fonts com `preconnect`), usando só os pesos necessários.
- Escala de títulos: h1 com cerca de 64px no desktop e 40px no celular, usando `clamp()`.

### Direção

- Container com no máximo 1120px.
- Seções separadas por uma linha fina no topo.
- Muito espaço em branco.
- Botões em formato de pílula (border-radius 999px).
- Cartões com radius de 20px.
- Miniaturas dos projetos com radius de 14px.
- Sem sombras pesadas, sem gradientes e sem ícones decorativos em excesso.

### Animação

Mínima:

- Fade e leve subida (12px) nas seções ao entrar na tela, uma vez só.
- Zoom de 1.02 na miniatura do projeto no hover.
- Transições de 150–200 ms nos botões.

Use CSS com IntersectionObserver, sem biblioteca de animação. Respeite `prefers-reduced-motion`.

## 3. Estrutura e textos (one-page)

Use exatamente estes textos. Pode ajustar pontualmente se melhorar a leitura no celular.

### 3.1 Cabeçalho (sticky, discreto)

- Logo textual: **Vitor Otávio**.
- Menu: Por que um site · Projetos · Serviços · Como funciona.
- Botão preto em pílula: **Quero meu site**, que abre o WhatsApp.
- Menu mobile acessível: `aria-expanded`, Esc fecha, foco gerenciado.

### 3.2 Hero

- Rótulo (azul, maiúsculas espaçadas): **SITES PARA PEQUENOS NEGÓCIOS**
- Título (h1): **Seu cliente procurou no Google. Encontrou você ou o concorrente?**
- Subtítulo: *Crio sites profissionais que passam confiança, abrem rápido no celular e levam o cliente direto para o seu WhatsApp. Para salões, lojas, restaurantes, clínicas e prestadores de serviço de todo o Brasil.*
- Botões: **Quero meu site** (azul, abre o WhatsApp) e **Ver projetos** (contorno, rola até os projetos).

### 3.3 Por que um site

- Título (h2): **Só o Instagram não é suficiente.**
- Texto: *Antes de comprar ou agendar, o cliente pesquisa. Se ele não encontra informação clara, vai para quem tem.*

Quatro cartões, cada um com número azul, título e texto:

1. **Seja encontrado.** Um site ajuda o seu negócio a aparecer quando alguém procura pelo que você oferece na sua região.
2. **Passe confiança.** Um site bem feito mostra que o seu negócio é sério antes mesmo da primeira conversa.
3. **Não dependa do algoritmo.** No Instagram, quem decide quem vê seus posts é a plataforma. No site, suas informações estão sempre lá.
4. **Menos perguntas, mais vendas.** Serviços, horários e endereço em um só lugar. O cliente chega no WhatsApp pronto para fechar.

Layout: 4 colunas no desktop, 2 no tablet e 1 no celular.

### 3.4 Projetos

- Título (h2): **Projetos**
- Texto: *Cada negócio tem um público diferente. Por isso, cada site tem uma identidade própria.*
- Nota pequena à direita: *Sites demonstrativos · clique para abrir*

Grade de 2 colunas no desktop e 1 no celular. Cada projeto publicado tem:

- Miniatura (print real do site, ver seção 5).
- Nome (h3).
- Linha "segmento · tipo de site".
- Selo verde de desempenho, quando existir.
- O cartão inteiro é um link que abre o site em nova aba (`target="_blank" rel="noopener"`), com aviso acessível de que abre em nova aba.

Projetos iniciais:

| Projeto | Descrição | Selo |
|---|---|---|
| Forno & Grão | Padaria · site institucional | PageSpeed 98 · Acessibilidade 100 |
| Tempero da Vila | Restaurante · pedidos pelo WhatsApp | — |
| Lume | Alta gastronomia · reservas | — |
| Salão de beleza | Serviços e agendamento pelo WhatsApp | status: em breve |
| Landing page | Página de vendas para um produto ou serviço | status: em breve |

Regras:

- Projetos com status **em breve** aparecem com uma miniatura em cor sólida suave, o nome em tipografia grande e o selo branco "Em breve". Não são clicáveis.
- O último cartão é sempre **"O seu negócio aqui"**: borda tracejada, texto "Pedir orçamento →", link para o WhatsApp. Abaixo dele: "Próximo projeto" e "Qualquer segmento, qualquer cidade".
- Inclua em `site.ts` a opção `showComingSoon: true | false`, para esconder os cartões "em breve" de uma vez.

### 3.5 O que eu faço

Título (h2): **O que eu faço**

Três cartões brancos:

- **Site institucional.** Serviços, história, horários, endereço e WhatsApp em uma página.
- **Landing page.** Uma página para vender um produto, um serviço ou uma promoção.
- **Plano mensal.** Hospedagem, ajustes e suporte, sem você se preocupar com nada.

Sem preços.

### 3.6 Como funciona

- Título (h2): **Como funciona**
- Lista ordenada (`<ol>`) com 3 passos e números grandes em azul:

1. **A gente conversa.** Pelo WhatsApp, você me conta sobre o seu negócio e o que precisa.
2. **Eu crio, você aprova.** Mostro o site antes de publicar e ajusto o que for preciso.
3. **Site no ar.** Publicado, rápido no celular e pronto para receber clientes.

### 3.7 Contato (bloco escuro com cantos arredondados)

- Título: **Pronto para ser encontrado?**
- Texto: *Me conte sobre o seu negócio. A conversa é sem compromisso.*
- Botão branco: **Falar no WhatsApp**.

### 3.8 Rodapé

- "© 2026 Vitor Otávio" à esquerda.
- "Sites para pequenos negócios de todo o Brasil" à direita.
- Opcional: links para Instagram e e-mail, se preenchidos em `site.ts`. Se o campo estiver vazio, o link não aparece.

## 4. Configuração centralizada (`src/data/site.ts`)

```ts
export const owner = {
  name: "Vitor Otávio",
  whatsappNumber: "",  // 5531999999999 — preencher antes de publicar
  whatsappMessage: "Olá, Vitor! Vi seu portfólio e quero saber mais sobre um site para o meu negócio.",
  instagram: "",
  email: "",
};

export const showComingSoon = true;

export const projects = [
  {
    slug: "forno-e-grao",
    name: "Forno & Grão",
    description: "Padaria · site institucional",
    url: "",  // link da Vercel
    image: "/projects/forno-e-grao.webp",
    badge: "PageSpeed 98 · Acessibilidade 100",
    status: "published",
  },
  // ...demais projetos; status: "published" | "coming-soon"
];
```

Regras:

- Todo botão de WhatsApp usa `https://wa.me/<número>?text=<mensagem codificada>`.
- Se `whatsappNumber` estiver vazio, use `https://wa.me/?text=...`.
- Se a `url` de um projeto publicado estiver vazia, o cartão não é clicável e aparece um aviso no console em modo de desenvolvimento.
- Documente no README como adicionar um projeto novo.

## 5. Miniaturas dos projetos

As miniaturas devem ser **prints reais** dos sites publicados, não ilustrações.

- Se as URLs estiverem preenchidas e houver Playwright disponível (ou se puder instalar como dependência de desenvolvimento), crie um script `npm run screenshots`. Ele captura a primeira dobra de cada projeto publicado a 1440×900, converte para WebP (largura de 1200px) e salva em `public/projects/<slug>.webp`.
- Se não for possível, use uma miniatura temporária em cor sólida com o nome do projeto e informe no relatório final.
- `alt` de cada miniatura: "Página inicial do site [nome]".
- `loading="lazy"`, com `width` e `height` definidos.

## 6. SEO

- `title`: "Vitor Otávio — Sites para pequenos negócios".
- `meta description`: uma frase com a proposta do hero.
- Open Graph com uma imagem de compartilhamento 1200×630 (`public/og.png`): fundo `#FAFAF8`, nome, frase curta e um detalhe em azul. Pode ser gerada por script ou SVG convertido.
- Favicon em SVG com "VO" sobre fundo `#1A1A1A`.
- JSON-LD do tipo `ProfessionalService`, só com os dados preenchidos.
- `lang="pt-BR"`.

## 7. Acessibilidade

- HTML semântico, um único `h1` e hierarquia correta de títulos.
- Link "Pular para o conteúdo".
- Navegação completa por teclado com foco visível (anel azul de 2px com offset).
- Alvos de toque de pelo menos 44px.
- Zoom de 200% e telas de 320px sem rolagem horizontal.
- Links que abrem em nova aba avisam isso de forma acessível.
- `prefers-reduced-motion` respeitado.

## 8. Stack e publicação

- React, TypeScript, Vite, Tailwind CSS e Lucide React (só se precisar de algum ícone).
- Nenhuma outra dependência de produção.
- Deploy na Vercel, na raiz.
- Repositório no GitHub chamado `portfolio`.

Estrutura:

```
src/components, src/sections, src/data/site.ts, public/projects
```

## 9. Como trabalhar

1. Inspecione a pasta. Se já houver projeto, não sobrescreva sem necessidade.
2. Apresente o plano em poucas linhas: componentes e como as miniaturas serão geradas.
3. Implemente seção por seção com os textos acima.
4. Rode `tsc --noEmit`, lint e `npm run build`, e corrija o que aparecer.
5. Relatório final:
   - Arquivos criados.
   - Como rodar localmente.
   - O que preencher em `site.ts` (WhatsApp, URLs dos projetos).
   - Como gerar as miniaturas.
   - O que não foi possível testar visualmente.

Não afirme que fez testes visuais se não os executou.
