import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Package, BarChart3, Boxes, Store, Truck, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Stockly — Simple Inventory Management System" },
      { name: "description", content: "Track products, stock, brands, categories, stores and suppliers. Free inventory management made in India." },
    ],
  }),
});

function Feature({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-brand text-white">
              <Boxes className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold tracking-tight">Stockly</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Link to="/auth"><Button variant="ghost" size="sm">Sign in</Button></Link>
            <Link to="/auth"><Button size="sm">Get started</Button></Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-soft opacity-70" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-white/80 px-3 py-1 text-xs font-medium text-primary">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              Made in India · Built for small businesses
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
              Manage your <span className="text-primary">inventory</span> the simple way
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
              Stockly helps you track products, stock levels, brands, categories, suppliers and stores — all in one clean dashboard powered by a fast backend API.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/auth"><Button size="lg" className="gap-2">Start free <ArrowRight className="h-4 w-4" /></Button></Link>
              <a href="#features"><Button size="lg" variant="outline">See features</Button></a>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> No credit card</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Secure by default</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Realtime updates</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Everything you need to run your inventory</h2>
          <p className="mt-2 text-muted-foreground">A complete backend for products, stock, and your whole business.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Feature icon={Package} title="Products & Stock" desc="Add products with SKU, price, cost and stock quantity. Get low-stock alerts automatically." />
          <Feature icon={Boxes} title="Brands & Categories" desc="Organize your catalogue with brands and categories for quick filtering." />
          <Feature icon={Truck} title="Suppliers" desc="Keep supplier contacts, addresses and phone numbers ready when you need to reorder." />
          <Feature icon={Store} title="Multiple Stores" desc="Track inventory across different stores and locations." />
          <Feature icon={BarChart3} title="Live Dashboard" desc="See total products, stock value and low-stock items at a glance." />
          <Feature icon={ShieldCheck} title="Secure Backend" desc="Row-level security ensures each business only sees their own data." />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 pb-24">
        <div className="rounded-3xl gradient-brand p-10 text-center text-white shadow-lg">
          <h2 className="text-2xl font-bold md:text-3xl">Ready to organize your inventory?</h2>
          <p className="mt-2 text-white/85">Create your free account in seconds.</p>
          <div className="mt-6">
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="gap-2">Get started free <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Stockly. Crafted in India by Ms. Akshara B, a Sophomore.</p>
          <p>Simple Inventory Management System</p>
        </div>
      </footer>
    </div>
  );
}
