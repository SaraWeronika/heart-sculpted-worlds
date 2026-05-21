import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import appCss from "../styles.css?url";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const CustomCursor = lazy(() => import("@/components/CustomCursor").then((m) => ({ default: m.CustomCursor })));
const SmoothScroll = lazy(() => import("@/components/SmoothScroll").then((m) => ({ default: m.SmoothScroll })));
const AudioController = lazy(() => import("@/components/AudioController").then((m) => ({ default: m.AudioController })));
const Chatbot = lazy(() => import("@/components/Chatbot").then((m) => ({ default: m.Chatbot })));

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="text-display text-[8rem] leading-none text-primary italic">404</div>
        <p className="text-display text-2xl mt-2">Questa pagina non batte.</p>
        <p className="mt-3 text-sm text-ivory/55">Forse stai cercando un'altra forma.</p>
        <Link to="/" className="btn-ghost mt-8 inline-flex">Torna all'atelier</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="text-display text-3xl">Un'imperfezione inattesa.</div>
        <p className="mt-3 text-sm text-ivory/60">Riprova — a volte basta un nuovo battito.</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="btn-solid mt-8">Riprova</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Cuoriforma — Atelier di stampa 3D di lusso" },
      { name: "description", content: "Cuoriforma: oggetti scultorei stampati in 3D. Home decor, bomboniere, vestiti, accessori. Realizzati a mano in Italia." },
      { name: "author", content: "Cuoriforma Studio" },
      { property: "og:title", content: "Cuoriforma — Atelier di stampa 3D di lusso" },
      { property: "og:description", content: "Forme organiche, materia viva, dettagli che restano. Cuoriforma è un'esperienza prima di un brand." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0B0B0D" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="grain vignette min-h-screen">
        <Navigation />
        <main>
          <Outlet />
        </main>
        <Footer />
        <Suspense fallback={null}>
          <SmoothScroll />
          <CustomCursor />
          <AudioController />
          <Chatbot />
        </Suspense>
      </div>
    </QueryClientProvider>
  );
}
