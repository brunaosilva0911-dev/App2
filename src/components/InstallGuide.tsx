import { useState, type ReactNode } from "react";
import { IconClose, IconPlay } from "./Icons";

type Tab = "app" | "site" | "apk";

const tabs: { key: Tab; label: string }[] = [
  { key: "app", label: "📱 Instalar no celular" },
  { key: "site", label: "🌐 Publicar o site" },
  { key: "apk", label: "🤖 Gerar o APK" },
];

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="relative pl-11">
      <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/15 text-sm font-black text-sky-300 ring-1 ring-sky-400/40">
        {n}
      </span>
      <h4 className="mb-1 pt-1 text-sm font-bold text-white">{title}</h4>
      <div className="space-y-2 text-[13px] leading-relaxed text-white/60">
        {children}
      </div>
    </li>
  );
}

function Code({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="group relative">
      <pre className="overflow-x-auto rounded-lg border border-white/10 bg-black/60 p-3 text-[12px] leading-relaxed text-sky-200">
        <code>{children}</code>
      </pre>
      <button
        onClick={() => {
          navigator.clipboard?.writeText(children);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="absolute right-2 top-2 rounded bg-white/10 px-2 py-1 text-[10px] font-bold uppercase text-white/70 opacity-0 transition group-hover:opacity-100 hover:bg-white/20"
      >
        {copied ? "copiado" : "copiar"}
      </button>
    </div>
  );
}

export function InstallGuide({
  onClose,
  canInstall,
  installed,
  onInstall,
}: {
  onClose: () => void;
  canInstall: boolean;
  installed: boolean;
  onInstall: () => void;
}) {
  const [tab, setTab] = useState<Tab>("app");

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 p-4 backdrop-blur-sm">
      <div className="mx-auto my-4 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#11141d] shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-white/10 p-6 pb-5">
          <div>
            <h3 className="text-xl font-black text-white">
              Transforme em app ou site
            </h3>
            <p className="mt-1 text-xs text-white/50">
              Três caminhos, todos 100% gratuitos.
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <IconClose className="h-4 w-4" />
          </button>
        </header>

        <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-white/10 px-6 py-3">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
                tab === t.key
                  ? "bg-white text-black"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-6">
          {tab === "app" && (
            <>
              <div className="mb-6 rounded-xl border border-sky-400/30 bg-sky-500/10 p-4">
                <p className="mb-3 text-sm font-semibold text-white">
                  Este site já é um PWA — ele instala como aplicativo, com ícone
                  na tela inicial e tela cheia, sem loja.
                </p>
                {installed ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-2 text-xs font-bold text-emerald-300">
                    ✓ App já instalado neste dispositivo
                  </span>
                ) : (
                  <button
                    onClick={onInstall}
                    disabled={!canInstall}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-black uppercase tracking-wide text-black transition hover:bg-white/85 disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/40"
                  >
                    <IconPlay className="h-3 w-3" />
                    {canInstall
                      ? "Instalar agora"
                      : "Disponível após publicar em HTTPS"}
                  </button>
                )}
              </div>

              <ol className="space-y-6">
                <Step n={1} title="Android (Chrome)">
                  Abra o site publicado → menu <b>⋮</b> →{" "}
                  <b>“Instalar app”</b> ou <b>“Adicionar à tela inicial”</b>. O
                  ícone aparece na gaveta de apps e abre em tela cheia, sem barra
                  do navegador.
                </Step>
                <Step n={2} title="iPhone (Safari)">
                  Botão <b>Compartilhar</b> → <b>“Adicionar à Tela de Início”</b>.
                </Step>
                <Step n={3} title="Computador (Chrome/Edge)">
                  Ícone de instalação na barra de endereço → <b>Instalar</b>. Vira
                  uma janela própria, igual a um programa.
                </Step>
                <Step n={4} title="Funciona offline">
                  O service worker guarda a interface e as logos em cache: o app
                  abre mesmo sem internet (os vídeos, claro, precisam de conexão).
                </Step>
              </ol>
            </>
          )}

          {tab === "site" && (
            <ol className="space-y-6">
              <li className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-[13px] text-white/75">
                <b className="text-emerald-300">✓ Pronto para a Vercel.</b> O
                arquivo <code>vercel.json</code> já está no projeto com build,
                rewrites e headers do PWA configurados. É só importar o
                repositório e clicar em Deploy.
              </li>
              <Step n={1} title="Envie o projeto para o GitHub">
                <Code>{`git init
git add .
git commit -m "BrasilTV+"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/brasiltv.git
git push -u origin main`}</Code>
              </Step>
              <Step n={2} title="Importe na Vercel">
                Acesse <b>vercel.com/new</b> → entre com o GitHub →{" "}
                <b>Import</b> no repositório → <b>Deploy</b>. Os campos já vêm
                preenchidos: Framework <b>Vite</b>, build{" "}
                <code>npm run build</code>, output <code>dist</code>. Em ~40s
                sua URL HTTPS está no ar e todo <i>push</i> republica sozinho.
              </Step>
              <Step n={3} title="Ou use o terminal (Vercel CLI)">
                <Code>{`npm i -g vercel
vercel login
vercel --prod`}</Code>
                Também funciona sem Git: a CLI envia a pasta atual direto.
              </Step>
              <Step n={4} title="Alternativa sem conta: Netlify Drop">
                Rode <code>npm run build</code>, acesse{" "}
                <b>app.netlify.com/drop</b> e arraste a pasta <b>dist</b>. URL
                HTTPS na hora, sem cadastro.
              </Step>
              <Step n={5} title="Domínio próprio (opcional)">
                Compre um domínio (~R$ 40/ano em registro.br) e adicione em{" "}
                <i>Project → Settings → Domains</i> na Vercel. O HTTPS é emitido
                sozinho — e o HTTPS é obrigatório para o app instalar.
              </Step>
              <Step n={6} title="Ligue suas APIs ao vivo">
                No site, clique na <b>engrenagem</b> e cole as URLs das suas APIs
                de canais e eventos. Se o navegador bloquear por CORS, publique
                um proxy grátis no Cloudflare Workers:
                <Code>{`export default {
  async fetch(req) {
    const alvo = "https://SUA-API/canais.json";
    const r = await fetch(alvo);
    return new Response(await r.text(), {
      headers: {
        "content-type": "application/json",
        "access-control-allow-origin": "*"
      }
    });
  }
}`}</Code>
              </Step>
            </ol>
          )}

          {tab === "apk" && (
            <ol className="space-y-6">
              <Step n={1} title="Caminho sem programar: PWABuilder">
                Publique o site (aba anterior) → abra <b>pwabuilder.com</b> →
                cole a URL → <b>Package for Stores</b> → <b>Android</b> →
                baixe o <b>.apk / .aab</b> assinado. Gratuito e usa o manifest
                que já está neste projeto.
              </Step>
              <Step n={2} title="Caminho com Capacitor (app híbrido real)">
                <Code>{`npm i @capacitor/core @capacitor/android
npx cap init "BrasilTV+" com.seunome.brasiltv --web-dir=dist
npm run build
npx cap add android
npx cap sync
npx cap open android`}</Code>
                O Android Studio abre o projeto nativo.
              </Step>
              <Step n={3} title="Permissões no AndroidManifest.xml">
                <Code>{`<uses-permission android:name="android.permission.INTERNET" />
<application android:usesCleartextTraffic="true" ... >`}</Code>
                Sem isso o player de alguns canais não carrega.
              </Step>
              <Step n={4} title="Compile o APK">
                No Android Studio: <b>Build → Build Bundle(s) / APK(s) → Build
                APK(s)</b>. O arquivo sai em{" "}
                <code>android/app/build/outputs/apk/</code>. Para a versão
                final: <b>Build → Generate Signed Bundle / APK</b> e crie um
                keystore (guarde-o: sem ele você não consegue atualizar o app).
              </Step>
              <Step n={5} title="Distribua de graça">
                GitHub Releases, link direto, Telegram ou Aptoide. A Play Store
                cobra US$ 25 (taxa única) e costuma remover apps que
                retransmitem canais de terceiros sem licença — prefira conteúdo
                próprio ou sinais abertos/livres.
              </Step>
            </ol>
          )}
        </div>

        <footer className="border-t border-white/10 px-6 py-4 text-[11px] text-white/40">
          Dica: o mesmo código roda como site, PWA e APK — você mantém um único
          projeto.
        </footer>
      </div>
    </div>
  );
}
