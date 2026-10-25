# BrasilTV+ — Como virar site e app (grátis)

O mesmo código vira **site**, **PWA instalável** e **APK Android**. Escolha o caminho.

---

## 0. Gerar os arquivos

```bash
npm install
npm run build
```

Resultado na pasta `dist/`:

| Arquivo | O que é |
|---|---|
| `index.html` | O site inteiro (HTML + CSS + JS em um único arquivo) |
| `manifest.webmanifest` | Define nome, ícone e cores do app instalado |
| `sw.js` | Service worker — cache e funcionamento offline |
| `icon-512.png` | Ícone do app |

Para testar local: `npm run preview` → abre em `http://localhost:4173`.

---

## 1. Publicar como SITE (3 opções gratuitas)

### A) Netlify Drop — 1 minuto, sem conta
1. Acesse **app.netlify.com/drop**
2. Arraste a pasta `dist` para a janela
3. Pronto: URL HTTPS gratuita e permanente

### B) Vercel + GitHub — atualiza sozinho a cada push
```bash
git init
git add .
git commit -m "BrasilTV+"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/brasiltv.git
git push -u origin main
```
Em **vercel.com** → *Add New Project* → importe o repositório:
- Framework: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

### C) GitHub Pages
1. Suba o repositório
2. *Settings → Pages → Build from branch*
3. Envie o conteúdo de `dist` para a branch `gh-pages`

> Todos emitem HTTPS automático — **obrigatório** para o app ser instalável.

---

## 2. Instalar como APP (PWA) — sem loja, sem APK

Depois de publicar:

| Plataforma | Como instalar |
|---|---|
| Android / Chrome | Menu ⋮ → **Instalar app** |
| iPhone / Safari | Compartilhar → **Adicionar à Tela de Início** |
| Windows / Mac | Ícone de instalar na barra de endereço |

O site também mostra um botão **“Instalar”** automaticamente (banner no topo e item na barra lateral).

Depois de instalado: ícone próprio, tela cheia, sem barra do navegador e abre offline.

---

## 3. Gerar o APK Android

### Caminho 1 — PWABuilder (sem programar)
1. Publique o site
2. Acesse **pwabuilder.com** e cole a URL
3. *Package for Stores* → **Android** → baixe `.apk` (teste) e `.aab` (loja)

### Caminho 2 — Capacitor (app híbrido real)
```bash
npm i @capacitor/core @capacitor/android
npx cap init "BrasilTV+" com.seunome.brasiltv --web-dir=dist
npm run build
npx cap add android
npx cap sync
npx cap open android
```

Em `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<application android:usesCleartextTraffic="true" android:hardwareAccelerated="true" ...>
```

No Android Studio: **Build → Build Bundle(s)/APK(s) → Build APK(s)**
→ arquivo em `android/app/build/outputs/apk/debug/app-debug.apk`

Versão final assinada: **Build → Generate Signed Bundle/APK** → crie um keystore e **guarde-o** (sem ele você não consegue publicar atualizações).

### Distribuição gratuita
- GitHub Releases, link direto, Telegram, Aptoide
- Play Store: taxa única de US$ 25 (não é grátis)

---

## 4. Ligar as suas APIs ao vivo

No site, clique na **engrenagem** e informe:
- **API de canais** → JSON com `{ categories: [], channels: [] }`
- **API de eventos** → JSON array no formato da agenda esportiva

Se o navegador bloquear por **CORS**, crie um proxy grátis no Cloudflare Workers:

```js
export default {
  async fetch(request) {
    const alvo = "https://SUA-API/canais.json";
    const r = await fetch(alvo, { headers: { "User-Agent": "Mozilla/5.0" } });
    return new Response(await r.text(), {
      headers: {
        "content-type": "application/json",
        "access-control-allow-origin": "*",
      },
    });
  },
};
```
Use a URL do Worker no campo de configuração.

> No app Android (WebView/nativo) o CORS **não** se aplica — é outra vantagem do APK.

---

## 5. Onde editar o conteúdo

| Quero mudar | Arquivo |
|---|---|
| Lista de canais e categorias | `src/data/channels.ts` |
| Agenda de eventos | `src/data/events.ts` |
| Nome, cores e ícone do app | `index.html`, `public/manifest.webmanifest` |
| Layout da home / carrosséis | `src/App.tsx` |
| Player | `src/components/Player.tsx` |

---

## ⚖️ Aviso legal
Retransmitir canais pagos sem autorização é ilegal no Brasil (Lei 9.610/98 e art. 184 do Código Penal). Use a estrutura para conteúdo próprio, canais abertos ou listas IPTV licenciadas.
