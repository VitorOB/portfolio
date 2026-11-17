# Portfólio — Vitor Otávio

Site one-page de apresentação: criação de sites profissionais.
React + TypeScript + Vite + Tailwind CSS v4. Sem backend.

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + build em dist/
npm run preview    # serve o build
npm run lint
```

## Antes de publicar: preencher `src/data/site.ts`

| Campo | O que colocar |
|---|---|
| `owner.whatsappNumber` | Só números, com DDI e DDD (ex.: `5531999999999`). Vazio = `wa.me/?text=...` (a pessoa escolhe o contato). |
| `owner.siteUrl` | Endereço final do portfólio, sem barra no fim. Usado no Open Graph, canonical e JSON-LD. |
| `owner.instagram` / `owner.email` | Opcionais. Vazios = links não aparecem no rodapé. |
| `showComingSoon` | `false` esconde todos os cartões "Em breve". |

## Idiomas (português e inglês)

- Textos das seções: `src/data/content.ts` (objetos `pt` e `en`, com o mesmo formato).
- Textos ligados aos dados (descrição e selo dos projetos, mensagem do WhatsApp, título e descrição do Google) ficam em `src/data/site.ts` como `{ pt: "...", en: "..." }`.
- Idioma inicial: `?lang=en` na URL → escolha salva no navegador → idioma do navegador (português = PT, qualquer outro = EN).
- Para mandar o link já em inglês a um cliente: `https://seu-site/?lang=en`.

## Adicionar um projeto novo

1. Em `src/data/site.ts`, inclua um item em `projects`:

   ```ts
   {
     slug: "studio-lirio",
     name: "Studio Lírio",
     description: { pt: "Salão de beleza · agendamento pelo WhatsApp", en: "Beauty salon · booking via WhatsApp" },
     url: "https://studio-lirio.vercel.app",
     image: "/projects/studio-lirio.webp",
     badge: { pt: "PageSpeed 97", en: "PageSpeed 97" }, // opcional — só números reais medidos
     status: "published",
   },
   ```

   Para um projeto ainda não pronto use `status: "coming-soon"` e, se quiser, `placeholderColor: "#F3E6E8"`.

2. Gere a miniatura: `npm run screenshots` (ou coloque manualmente um WebP 1200×750 em `public/projects/<slug>.webp`).

O cartão "O seu negócio aqui" é sempre o último, automaticamente.

## Miniaturas e imagem de compartilhamento

- `npm run screenshots` — abre cada projeto publicado com `url` a 1440×900, captura a primeira dobra, converte para WebP (1200px) e salva em `public/projects/<slug>.webp`. Se um site falhar, gera uma miniatura temporária em cor sólida e avisa no terminal.
  Na primeira vez numa máquina nova: `npx playwright install chromium`.
- `npm run og` — regenera `public/og.png` (1200×630).

## Deploy

Vercel, na raiz do repositório (framework Vite, comando `npm run build`, saída `dist`).
