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

Direção **"vitrine"** (aprovada em 26/11/2026, substitui o "minimal claro" original). Fundo claro e neutro, com um capítulo escuro no meio para dar ritmo. A cor e a textura da página vêm dos projetos: miniaturas em molduras de navegador e pequenas ilustrações de interface. Tipografia condensada e grande dá a personalidade. O azul é reservado para ação.

Referência de acabamento e movimento: as skills de design engineering de Emil Kowalski (github.com/emilkowalski/skills).

### Paleta

| Uso | Cor |
|---|---|
| Fundo | `#F2F2F0` |
| Fundo de apoio (área das imagens nos cartões de serviço) | `#E8E8E4` |
| Superfície dos cartões | `#FFFFFF`, com anel interno `ink/7%` (sem borda) |
| Linhas divisórias | `#D6D6D1` |
| Texto principal | `#141414` |
| Texto secundário | `#5C5C59` |
| Seção escura ("Por que um site") | `#111214`, texto branco, secundário branco a 70% |
| Azul de ação: botões, links, foco, cartão "O seu negócio aqui", painel de contato | `#2A36E8` (hover `#1F29C2`) |
| Texto secundário sobre o azul | `#D8DBFF` |
| Rodapé | fundo `#141414`, texto branco |
| Selo de desempenho | `#1E6B3A` |
| Ponto "no ar" (ilustração) | `#34C759` |

Regra: o azul só aparece onde há ação. Números, ícones e destaques decorativos ficam em preto. Todas as combinações acima passam no contraste AA. Verifique qualquer combinação nova.

### Tipografia

Uma família só: **Archivo** variável, com eixo de largura (`@fontsource-variable/archivo/wdth.css`, ~90 KB latin, pré-carregada no build).

| Uso | Largura | Peso | Outros |
|---|---|---|---|
| Títulos (`.display`): h1, h2, logo | 70% | 740 | line-height 0.95, letter-spacing −0.01em |
| Subtítulos (`.h3`) | 88% | 640 | line-height 1.12 |
| Texto corrido | 100% | 400–600 | 17px, line-height 1.55 |

- Escala: h1 `clamp(2.875rem, 1rem + 4.6vw, 5.5rem)`, h2 `clamp(2.5rem, 1.7rem + 3.2vw, 4.5rem)`, h3 entre 1.625rem e 1.875rem.
- O texto de apoio ao lado dos títulos usa 1.25rem no desktop, para título e texto lerem como um conjunto.
- Sempre em caixa normal. Nada de rótulos em maiúsculas espaçadas.
- Linhas de texto com no máximo ~46 caracteres (`max-w-[44ch]` a `[46ch]`).

### Direção

- Container com no máximo 1320px (padding 20 / 32 / 48px).
- Seções com 80px de respiro no celular e 120px no desktop.
- **Abertura de seção:** título condensado à esquerda (6 colunas) e texto de apoio à direita (colunas 8–12), alinhados pelo topo.
- **Hero:** texto em 7 colunas e, ao lado, uma colagem de três projetos (Lume, Studio Lírio, Forno & Grão) em molduras de navegador, levemente inclinadas e sobrepostas. No celular a colagem vai para baixo dos botões.
- **Molduras de navegador** (`BrowserFrame`): barra fina com três pontos, raio de 12px e sombra em camadas suave. É o único lugar com sombra.
- **Cartões:** raio de 22px. O painel de contato tem raio de 28px. Botões em pílula.
- **Ilustrações de interface** ("Por que um site"): busca com resultado, miniatura de site, cartão de horários e conversa de pedido. Usam sempre os dados dos sites demonstrativos, nunca dados inventados de clientes reais.
- Sem gradientes decorativos e sem números em itens que não são sequência. Só "Como funciona" é numerado.

### Animação

Um momento coreografado na abertura e movimentos pequenos que respondem ao visitante. Tudo em CSS e com IntersectionObserver, sem biblioteca. Só `transform`, `opacity` e um `filter: blur` curto.

Curvas (tokens em `index.css`):

- `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`
- `--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1)`
- `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`

| Onde | O quê |
|---|---|
| Entrada do hero (uma vez) | Rótulo aparece. Cada frase do título sobe de dentro de uma máscara (1 s, 110 ms entre frases). Texto e botões sobem 10px. As três imagens entram por último (48px + scale 0.96), em cascata. |
| Hero ao rolar | Parallax leve: as imagens sobem em velocidades diferentes (0.06 / 0.12 / 0.2). O transform é escrito direto no elemento e só roda com o hero na tela. |
| Blocos ao entrar na tela (uma vez) | Fade + 24px + blur de 6px que some. Atrasos curtos e desiguais por item (`stagger`: raiz de i × 90 ms). |
| Como funciona | Uma linha liga os passos e se preenche em 1 s. Cada passo aparece quando a linha chega nele. No celular a linha é vertical. |
| Hover (só com mouse) | Miniatura do projeto com zoom de 1.03 em 700 ms. Imagens dos cartões sobem 8px. A seta "abrir" anda 2px na diagonal. O sublinhado do menu cresce da esquerda. |
| Botões | `scale(0.97)` ao clicar (160 ms). Cores mudam em 200 ms. |
| Cabeçalho | Transparente no topo, ganha fundo com desfoque e linha depois de rolar. |
| Menu do celular | Abre com fade e 6px em 200 ms. Fecha na hora. |

Com `prefers-reduced-motion`: nenhum deslocamento, parallax, blur ou pulso. Fica só um fade curto, com tudo entrando junto.

## 3. Estrutura e textos (one-page)

Use exatamente estes textos. Pode ajustar pontualmente se melhorar a leitura no celular.

### 3.1 Cabeçalho (sticky, transparente no topo)

- Logo textual: **Vitor Otávio**.
- Menu: Por que um site · Projetos · Serviços · Como funciona.
- Botão preto em pílula: **Quero meu site**, que abre o contato principal do idioma.
- Menu mobile acessível: `aria-expanded`, Esc fecha, foco gerenciado.

### 3.2 Hero

- Rótulo (texto pequeno, cinza, caixa normal): **Criação de sites profissionais**
- Título (h1), uma frase por linha: **Seu cliente procurou no Google.** / **Encontrou você ou o concorrente?**
- Subtítulo: *Crio sites profissionais que passam confiança, abrem rápido no celular e levam o cliente direto para o seu WhatsApp. Para salões, lojas, restaurantes, clínicas e prestadores de serviço de todo o Brasil.*
- Botões: **Quero meu site** (azul, abre o contato) e **Ver projetos** (contorno, rola até os projetos).
- Ao lado (abaixo, no celular): colagem decorativa de três projetos em molduras de navegador (ver seção 2).

### 3.3 Por que um site (seção escura)

- Título (h2): **Só o Instagram não é suficiente.**
- Texto: *Antes de comprar ou agendar, o cliente pesquisa. Se ele não encontra informação clara, vai para quem tem.*

Quatro cartões sem número. Cada um tem uma ilustração de interface em cima e o título e o texto embaixo:

1. **Seja encontrado.** Um site ajuda o seu negócio a aparecer quando alguém procura pelo que você oferece na sua região.
2. **Passe confiança.** Um site bem feito mostra que o seu negócio é sério antes mesmo da primeira conversa.
3. **Não dependa do algoritmo.** No Instagram, quem decide quem vê seus posts é a plataforma. No site, suas informações estão sempre lá.
4. **Menos perguntas, mais vendas.** Serviços, horários e endereço em um só lugar. O cliente chega no WhatsApp pronto para fechar.

Ilustrações, na ordem: busca "padaria artesanal perto de mim" com o Forno & Grão no resultado; miniatura do Studio Lírio; cartão de horários e endereço do Studio Lírio com o ponto "Informações sempre no ar"; conversa de pedido no estilo WhatsApp. Os textos ficam em `content.ts` → `why.visual`.

Layout: grade de 12 colunas no desktop com cartões largos e estreitos alternados (7+5, 5+7) e 1 coluna no celular.

### 3.4 Projetos

- Título (h2): **Projetos**
- Texto: *Cada negócio tem um público diferente. Por isso, cada site tem uma identidade própria.*
- Nota pequena à direita: *Sites demonstrativos · clique para abrir*

Carrossel horizontal com encaixe (scroll-snap): 2 cartões por vez no desktop e 1 (com o próximo aparecendo) no celular. Passa sozinho a cada ~2,5 s e para com mouse em cima, foco, toque, seção fora da tela ou aba em segundo plano. Tem botões de pausar, anterior e próximo, mais uma barra fina de progresso. Com "reduzir movimento" ligado, começa pausado. Cada projeto publicado tem:

- Miniatura (print real do site, ver seção 5).
- Nome (h3) com uma seta de "abrir" à direita. O cartão não tem caixa: a miniatura (raio de 10px, anel interno) é a moldura e o nome fica embaixo como legenda.
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
- O último cartão é sempre **"O seu negócio aqui"**: miniatura em azul de ação com o texto grande em branco e "Pedir orçamento" com seta, link para o contato principal. Abaixo dele: "Próximo projeto" e "Qualquer segmento, qualquer cidade".
- Inclua em `site.ts` a opção `showComingSoon: true | false`, para esconder os cartões "em breve" de uma vez.

### 3.5 O que eu faço

Título (h2): **O que eu faço**

Três cartões brancos, cada um com a imagem do que entrega sobre um fundo `#E8E8E4`: miniatura do Forno & Grão (institucional), miniatura da Confeitaria Lucrativa (landing page) e uma lista com Hospedagem, Ajustes e Suporte (plano mensal).

- **Site institucional.** Serviços, história, horários, endereço e WhatsApp em uma página.
- **Landing page.** Uma página para vender um produto, um serviço ou uma promoção.
- **Plano mensal.** Hospedagem, ajustes e suporte, sem você se preocupar com nada.

Sem preços.

### 3.6 Como funciona

- Título (h2): **Como funciona**
- Lista ordenada (`<ol>`) com 3 passos. Os números ficam em círculos pretos, ligados por uma linha que se preenche (ver seção 2):

1. **A gente conversa.** Pelo WhatsApp, você me conta sobre o seu negócio e o que precisa.
2. **Eu crio, você aprova.** Mostro o site antes de publicar e ajusto o que for preciso.
3. **Site no ar.** Publicado, rápido no celular e pronto para receber clientes.

### 3.7 Contato (painel azul compacto, dentro do container)

- Título: **Pronto para ser encontrado?**
- Texto: *Me conte sobre o seu negócio. A conversa é sem compromisso.*
- Botão branco com texto azul: **Falar no WhatsApp** (em inglês: e-mail, com "ou chame no WhatsApp" ao lado).

### 3.8 Rodapé (faixa escura)

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
