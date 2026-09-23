# Stardew Check — Centro Comunitário

Checklist dos conjuntos do Centro Comunitário de Stardew Valley (dados da [wiki PT](https://pt.stardewvalleywiki.com/Conjuntos)).

- Checkbox em cada item; o progresso fica salvo no `localStorage` do navegador
- **Compartilhar progresso**: gera um link (`?fazenda=abc123`) e quem abrir vê e edita o mesmo progresso (sincroniza a cada 5s)
- Conjuntos com "escolha X de Y" contam como completos ao atingir X
- Filtro por estação e aba **O que falta** com todos os itens pendentes
- Ícones ficam em `public/icons` (baixados da wiki com `npm run icons`)

## Deploy na Vercel

1. Suba o repositório no GitHub e importe na Vercel (ela detecta Vite sozinha).
2. No projeto da Vercel: **Storage → Create Database → Neon** e conecte ao projeto.
   Isso cria a variável `DATABASE_URL` automaticamente.
3. Faça um novo deploy (**Deployments → Redeploy**) para a variável valer.

A tabela é criada sozinha na primeira chamada da API — não precisa rodar SQL.

## Rodar local

Só o front (o compartilhamento fica indisponível, o resto funciona):

```bash
npm run dev
```

Com a API e o banco (depois de conectar o Neon na Vercel):

```bash
npx vercel link
npx vercel env pull .env.local
npx vercel dev
```

## Estrutura

- `src/data.js` — conjuntos e itens
- `src/useProgress.js` — estado, localStorage e sincronização
- `api/progresso.js` — função serverless (GET/POST/DELETE) usando o Neon
