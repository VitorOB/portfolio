# BRIEFING — Portfólio Vitor Otávio: atualização v2

> **Aplicado e publicado em 26/11/2026** (commit 6dc1297). O briefing principal (BRIEFING-portfolio.md)
> já incorpora esta atualização e é a referência daqui em diante. Diferenças em relação ao texto abaixo:
>
> - **Identidade:** valeu a identidade "vitrine" (Archivo, azul `#2A36E8`), não a antiga (Space Grotesk + Inter, `#2348D8`).
>   Os números de "Como funciona" ficaram em círculos pretos, porque o azul é reservado para ação.
> - **Preços, subtítulo:** saiu "Preço de lançamento para os primeiros clientes." para não passar a ideia de quem está começando.
> - **Versão em inglês:** não mantém os preços em reais. É para clientes de fora: $290 / $390 / $29 por mês,
>   pagamento por cartão, PayPal ou transferência, domínio no nome do cliente (sem Pix, 12x nem .com.br).
>   O botão "Quero este" abre o e-mail (canal principal em inglês) com a mensagem do plano.
> - **Idioma:** quem está no Brasil sempre vê português; a escolha de idioma fica só no endereço (`?lang=`).

## 0. Contexto (leia primeiro)

Este briefing **atualiza o portfólio que já existe** nesta pasta. Não recrie o projeto do zero. Mantenha a identidade visual atual (minimal claro, Space Grotesk + Inter, azul `#2348D8`), a estrutura de `src/data/site.ts`, o seletor de idioma PT/EN e tudo o que não for citado aqui.

Objetivo: o dono de um pequeno negócio chega pelo link enviado no WhatsApp e precisa sair com quatro respostas sem perguntar nada:

- quanto custa;
- o que está incluso;
- como funciona e em quanto tempo;
- qual é o risco.

**Restrições (continuam valendo):**

- Não inventar números, depoimentos, clientes ou resultados.
- Não falar de tecnologia nem de IA.
- Não colocar foto pessoal nem cidade do Vitor. O atendimento é para todo o Brasil.

## 1. Resumo das mudanças

| Seção | O que muda |
|---|---|
| Menu | Novos itens: Preços e Dúvidas. |
| "O que eu faço" | Vira **"Preços"**, com valores e lista do que está incluso. |
| "Como funciona" | Passa de 3 para 4 passos, com prazo. |
| Novo: Garantia | Faixa curta logo depois de "Como funciona". |
| Novo: FAQ | Perguntas frequentes em acordeão, antes do contato. |
| Contato | Texto ajustado. |

Ordem final da página: Hero, Por que um site, Projetos, Como funciona, Garantia, Preços, Dúvidas, Contato, Rodapé.

## 2. Menu

Itens: Por que um site · Projetos · Como funciona · Preços · Dúvidas.

O botão **Quero meu site** continua igual. No celular, o menu mobile segue as mesmas regras de acessibilidade.

## 3. Como funciona (substitui a seção atual)

- Título (h2): **Como funciona**
- Subtítulo: *Do primeiro contato ao site no ar em até 7 dias.*
- `<ol>` com 4 passos, números grandes em azul, 4 colunas no desktop, 2 no tablet e 1 no celular:

1. **Você me conta sobre o negócio.** Pelo WhatsApp, você manda as informações, fotos e logo. Não precisa entender nada de site.
2. **Eu monto e escrevo os textos.** Crio o layout com a cara do seu negócio, pensado para o celular, com botão de WhatsApp.
3. **Você vê antes e pede ajustes.** Mostro o site pronto por link. São até 2 rodadas de ajustes inclusas.
4. **Site no ar no seu endereço.** Publico com o domínio .com.br no seu nome e o site começa a receber clientes.

## 4. Garantia (nova faixa)

- Faixa simples com borda fina e fundo `#FFFFFF`, com um ícone discreto de escudo ou check (Lucide) à esquerda.
- Título curto: **Você vê o site pronto antes de fechar.**
- Texto: *Monto uma prévia do seu site sem compromisso. Se não gostar, você não paga nada.*

## 5. Preços (substitui "O que eu faço")

- Título (h2): **Preços**
- Subtítulo: *Valor fechado, sem surpresa. Preço de lançamento para os primeiros clientes.*

Três cartões, lado a lado no desktop e empilhados no celular. O preço fica em destaque, em Space Grotesk.

| Cartão | Preço | Linha de apoio |
|---|---|---|
| **Site para o seu negócio** | R$ 497 | Pagamento único · Pix ou até 12x no cartão |
| **Landing page de vendas** | R$ 697 | Pagamento único · Pix ou até 12x no cartão |
| **Plano mensal** | R$ 49/mês | Sem fidelidade · cancele quando quiser |

Selo pequeno "Mais escolhido" no primeiro cartão, com borda azul de 2px.

O que está incluso em cada cartão (lista com ícone de check):

- **Site para o seu negócio:**
  - Textos escritos para você
  - Layout com as cores do seu negócio
  - Versão para celular, tablet e computador
  - Botão de WhatsApp com mensagem pronta
  - Serviços, horários, endereço e mapa
  - Preparado para aparecer no Google
  - Imagem de compartilhamento para WhatsApp e redes
  - Domínio .com.br no seu nome, 1º ano incluso
  - 2 rodadas de ajustes
- **Landing page de vendas:**
  - Página focada em vender um produto, serviço ou promoção
  - Texto de vendas, oferta e perguntas frequentes
  - Animações leves
  - Botão de compra ou WhatsApp
  - Domínio .com.br no seu nome, 1º ano incluso
  - 2 rodadas de ajustes
- **Plano mensal:**
  - Hospedagem do site
  - Até 2 alterações por mês (texto, foto, horário, preço)
  - Suporte pelo WhatsApp em dias úteis
  - Renovação do domínio acompanhada

Botão em cada cartão: **Quero este**, que abre o WhatsApp com mensagem específica, por exemplo: "Olá, Vitor! Vi seu portfólio e quero saber mais sobre o Site para o meu negócio."

Nota abaixo dos cartões, em texto secundário: *Não inclui loja virtual, sistema de agendamento, área de login ou fotografia profissional. Se precisar, peça um orçamento.*

**Configuração:** todos os preços, listas e mensagens ficam em `src/data/site.ts`, em `pricing`, com o campo `showPricing: true | false` para esconder a seção inteira.

```ts
export const showPricing = true;

export const pricing = [
  {
    id: "site",
    name: "Site para o seu negócio",
    price: "R$ 497",
    note: "Pagamento único · Pix ou até 12x no cartão",
    highlight: true,
    features: ["Textos escritos para você", /* ... */],
    whatsappMessage: "Olá, Vitor! Vi seu portfólio e quero saber mais sobre o Site para o meu negócio.",
  },
  // landing, plano
];
```

## 6. Dúvidas (FAQ, nova seção)

- Título (h2): **Dúvidas frequentes**
- Acordeão acessível com `<details>`/`<summary>` ou botão com `aria-expanded`, uma pergunta aberta por vez, todas fechadas no início.
- Perguntas e respostas também ficam em `site.ts`, em `faq`.

1. **Preciso entender de site ou tecnologia?**
   Não. Você me manda as informações pelo WhatsApp e eu cuido de tudo: textos, layout, publicação e endereço.
2. **Em quanto tempo o site fica pronto?**
   Em até 7 dias depois que eu receber as informações e fotos do seu negócio.
3. **O domínio .com.br está incluso?**
   Sim. O primeiro ano já está no preço. Eu registro e configuro, e o domínio fica no seu nome e CPF/CNPJ, então é seu de verdade. A partir do 2º ano, a renovação (cerca de R$ 40 por ano) está inclusa no plano mensal ou você paga direto.
4. **Como posso pagar?**
   À vista no Pix, em duas partes (metade para começar e metade na aprovação) ou em até 12x no cartão. Tudo fica registrado em contrato.
5. **Sou obrigado a assinar o plano mensal?**
   Não. Ele é opcional e sem fidelidade. Se cancelar, você recebe os arquivos do site e eu ajudo a transferir.
6. **Já tenho Instagram. Por que preciso de um site?**
   O Instagram mostra seu dia a dia. O site é onde o cliente encontra tudo de uma vez quando pesquisa no Google: serviços, horários, endereço e contato.
7. **Posso mudar alguma coisa depois?**
   Pode. No plano mensal, até 2 alterações por mês estão inclusas. Mudanças maiores, como uma página nova, são orçadas à parte.
8. **Atende minha cidade?**
   Atendo negócios de todo o Brasil. Todo o processo é feito pelo WhatsApp.

## 7. Contato (ajuste de texto)

- Título: **Pronto para ser encontrado?**
- Texto: *Me conte sobre o seu negócio. Eu monto uma prévia sem compromisso.*
- Botão: **Falar no WhatsApp**.

## 8. Idioma (PT/EN)

- O portfólio já tem versão em inglês. Adicione as traduções de todos os textos novos no mesmo sistema de idiomas que já existe.
- Na versão em inglês, mantenha os preços em reais e escreva "Brazilian .com.br domain".

## 9. SEO

- Adicione JSON-LD `FAQPage` com as perguntas da seção 6, só na versão PT.
- Atualize a `meta description`, mencionando "sites prontos em até 7 dias".

## 10. Como trabalhar

1. Inspecione o projeto atual e liste os arquivos que vai mudar antes de começar.
2. Faça as mudanças seção por seção, seguindo a ordem final da página.
3. Mantenha Lighthouse mobile ≥ 95 e as regras de acessibilidade do briefing original: foco visível, alvos de toque de 44px, `prefers-reduced-motion`, sem rolagem horizontal em 320px.
4. Rode `tsc --noEmit`, lint e `npm run build`, e corrija o que aparecer.
5. Relatório final:
   - arquivos alterados;
   - o que conferir em `site.ts`;
   - o que não foi possível testar visualmente.

Não afirme que fez testes visuais se não os executou. O deploy continua automático pelo GitHub para o Cloudflare: basta fazer commit e push.
