# BrasilTV+ 📺

Interface de streaming estilo Disney+ para canais de TV ao vivo e agenda esportiva.
React + Vite + Tailwind CSS. Funciona como **site**, **PWA instalável** e base para **APK Android**.

![status](https://img.shields.io/badge/build-passing-brightgreen) ![pwa](https://img.shields.io/badge/PWA-ready-blue) ![vercel](https://img.shields.io/badge/deploy-Vercel-black)

---

## 🚀 Deploy na Vercel

O projeto já está configurado (`vercel.json`). Escolha **A** ou **B**.

### A) Pelo site da Vercel (recomendado)

1. **Suba o código para o GitHub:**
   ```bash
   git init
   git add .
   git commit -m "BrasilTV+"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/brasiltv.git
   git push -u origin main
   ```

2. Acesse **[vercel.com/new](https://vercel.com/new)** → faça login com o GitHub → **Import** no repositório.

3. A Vercel detecta tudo sozinha (graças ao `vercel.json`):

   | Campo | Valor |
   |---|---|
   | Framework Preset | **Vite** |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |
   | Node.js Version | 20.x |

4. Clique em **Deploy**. Em ~40 segundos você recebe:
   `https://brasiltv.vercel.app` ✅ (HTTPS automático e gratuito)

> A partir daí, **todo `git push` publica automaticamente**.

### B) Pelo terminal (Vercel CLI)

```bash
npm i -g vercel
vercel login
vercel --prod
```
Responda: *Set up and deploy?* **Y** · *Which scope?* sua conta · *Link to existing project?* **N** · *Project name?* `brasiltv` · *Directory?* `./`

---

## ✅ O que já está configurado

- **`vercel.json`** — framework, build, SPA rewrites e headers
- **Service worker** com `Cache-Control: must-revalidate` (atualizações chegam na hora, sem cache preso)
- **`manifest.webmanifest`** servido com o content-type correto
- **`Referrer-Policy: no-referrer`** — ajuda os players embed a carregarem
- **`Permissions-Policy`** liberando autoplay, fullscreen e picture-in-picture
- **`.gitignore`** cobrindo `node_modules`, `dist`, `.vercel`, keystores e pastas do Android
- **`.nvmrc`** fixando o Node 20
- **`robots.txt`** com indexação desativada por padrão

---

## 🔧 Depois do deploy

### 1. Instalar como app
Abra a URL no celular → Chrome → menu **⋮** → **Instalar app**.
O próprio site mostra um banner com o botão **Instalar**.

### 2. Conectar suas APIs ao vivo
Clique na **engrenagem** (barra lateral) e cole as URLs:
- API de canais → JSON `{ categories: [], channels: [] }`
- API de eventos → JSON array da agenda esportiva

Se der erro de **CORS**, publique um proxy grátis no Cloudflare Workers:
```js
export default {
  async fetch() {
    const r = await fetch("https://SUA-API/canais.json");
    return new Response(await r.text(), {
      headers: {
        "content-type": "application/json",
        "access-control-allow-origin": "*",
      },
    });
  },
};
```

### 3. Domínio próprio
Vercel → *Project → Settings → Domains* → adicione seu domínio e aponte o DNS. SSL é emitido sozinho.

---

## 💻 Rodar localmente

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
npm run preview  # testa o build (PWA só funciona aqui ou em HTTPS)
```

---

## 📁 Estrutura

```
src/
├── App.tsx                  # páginas: Início, Canais, Esportes, Minha Lista, Busca
├── data/
│   ├── channels.ts          # catálogo de canais + categorias
│   └── events.ts            # agenda esportiva
├── lib/
│   ├── store.ts             # fetch das APIs, favoritos, histórico
│   └── pwa.ts               # service worker + prompt de instalação
└── components/
    ├── Hero.tsx             # banner rotativo
    ├── Row.tsx              # carrossel horizontal
    ├── ChannelCard.tsx      # card 16:9 com hover
    ├── EventCard.tsx        # card de jogo
    ├── Player.tsx           # player modal multi-fonte
    ├── Nav.tsx              # sidebar + nav mobile
    ├── InstallGuide.tsx     # guia de instalação/deploy
    └── SettingsModal.tsx    # configuração das APIs
public/
├── manifest.webmanifest
├── sw.js
├── icon-512.png
└── robots.txt
```

| Quero mudar | Arquivo |
|---|---|
| Canais e categorias | `src/data/channels.ts` |
| Eventos esportivos | `src/data/events.ts` |
| Nome / ícone / cores | `index.html` e `public/manifest.webmanifest` |
| Layout da home | `src/App.tsx` |

---

## 🤖 Gerar APK Android

Veja o passo a passo completo em **[DEPLOY.md](./DEPLOY.md)** ou clique em **"Instalar app"** dentro do site.
Resumo: publique na Vercel → `pwabuilder.com` → cole a URL → *Package for Stores* → Android.

---

## ⚖️ Aviso legal

Retransmitir canais pagos sem autorização é ilegal no Brasil (Lei 9.610/98 e art. 184 do Código Penal).
Este projeto é uma **interface**: use com conteúdo próprio, canais abertos ou listas IPTV licenciadas.
