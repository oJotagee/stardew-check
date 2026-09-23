# Stardew Check — Centro Comunitário

Checklist dos conjuntos do Centro Comunitário de Stardew Valley (dados da [wiki PT](https://pt.stardewvalleywiki.com/Conjuntos)).

- Checkbox em cada item; o progresso fica salvo no `localStorage` do navegador
- Conjuntos com "escolha X de Y" contam como completos ao atingir X
- Filtro por estação e aba **O que falta** com todos os itens pendentes
- Ícones ficam em `public/icons` (baixados da wiki com `npm run icons`)

## Rodar local

```bash
npm install
npm run dev
```

## Deploy na Vercel

Suba o repositório no GitHub e importe na Vercel — ela detecta Vite sozinha
(build `npm run build`, saída `dist`). Ou pela CLI:

```bash
npx vercel --prod
```
