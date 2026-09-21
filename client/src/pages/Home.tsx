import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { formatMoney } from "@/lib/format";
import { trpc } from "@/lib/trpc";
import type { Product } from "@shared/commerce/types";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Grid2X2,
  Heart,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useRoute } from "wouter";

const creatorSpotlights = [
  { name: "Mina Alvarez", role: "Brand designer", initials: "MA", color: "bg-cyan-300", quote: "PixelShelf helps my good ideas get to the finish line." },
  { name: "Jules Okafor", role: "Creative strategist", initials: "JO", color: "bg-violet-300", quote: "The little details are already thought through. Magic." },
  { name: "Rae Chen", role: "Notion architect", initials: "RC", color: "bg-fuchsia-300", quote: "A marketplace that feels like browsing a brilliant studio." },
];

function StoreHeader({ onCart }: { onCart: () => void }) {
  const { itemCount } = useCart();
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#241343]/95 text-white backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 to-violet-400 text-[#241343] shadow-glow">
            <Grid2X2 className="size-5" strokeWidth={2.5} />
          </span>
          <span className="font-[Space_Grotesk] text-xl font-bold tracking-tight">PixelShelf<span className="text-cyan-300">.</span></span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-white/70 md:flex">
          <a href="#catalog" className="transition-colors hover:text-white">Browse all</a>
          <a href="#categories" className="transition-colors hover:text-white">Collections</a>
          <a href="#creators" className="transition-colors hover:text-white">Creators</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#catalog" className="hidden rounded-full px-4 py-2 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:block">For creators</a>
          <Button aria-label="Open cart" onClick={onCart} className="relative h-11 rounded-full bg-white px-4 text-[#241343] hover:bg-cyan-100">
            <ShoppingBag className="mr-2 size-4" />
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 && <span className="ml-2 grid size-5 place-items-center rounded-full bg-[#6d28d9] text-xs font-bold text-white">{itemCount}</span>}
          </Button>
        </div>
      </div>
    </header>
  );
}

function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];
  return (
    <Link href={`/product/${product.handle}`} className="group block">
      <article className="overflow-hidden rounded-[1.65rem] border border-[#e9e4f4] bg-white shadow-soft transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_24px_70px_rgba(62,28,125,.16)]">
        <div className="relative aspect-[1.05] overflow-hidden bg-[#f0edff]">
          {image ? <img src={image.url} alt={image.altText ?? product.title} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" /> : <div className="size-full bg-[radial-gradient(circle_at_30%_30%,#9df7ff,transparent_35%),linear-gradient(135deg,#7c3aed,#23104d)]" />}
          <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#6d28d9] backdrop-blur">{product.productType ?? "Digital asset"}</div>
          <button aria-label={`Save ${product.title}`} onClick={event => event.preventDefault()} className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/90 text-[#6d28d9] opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
            <Heart className="size-4" />
          </button>
        </div>
        <div className="p-5">
          <div className="mb-3 flex items-start justify-between gap-3">
            <h3 className="font-[Space_Grotesk] text-lg font-bold leading-tight text-[#241343]">{product.title}</h3>
            <span className="shrink-0 rounded-full bg-[#f0edff] px-2.5 py-1 text-sm font-bold text-[#6d28d9]">{formatMoney(product.priceRange.min)}</span>
          </div>
          <p className="line-clamp-2 text-sm leading-6 text-[#77718b]">{product.description}</p>
          <div className="mt-5 flex items-center justify-between text-xs font-semibold text-[#9a94ab]">
            <span className="flex items-center gap-1 text-[#f59e0b]"><Star className="size-3.5 fill-current" /> 4.9</span>
            <span className="flex items-center gap-1 text-[#6d28d9] transition-transform group-hover:translate-x-1">View details <ArrowRight className="size-3.5" /></span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function CartDrawer() {
  const { cart, isOpen, loading, closeCart, updateQuantity, removeItem, proceedToCheckout } = useCart();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-[#1b0e30]/50 backdrop-blur-sm" onClick={closeCart}>
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white p-6 shadow-2xl" onClick={event => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[#eeeaf6] pb-5">
          <div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#6d28d9]">Your shelf</p><h2 className="mt-1 font-[Space_Grotesk] text-2xl font-bold text-[#241343]">Cart <span className="text-[#9a94ab]">({cart?.itemCount ?? 0})</span></h2></div>
          <button aria-label="Close cart" onClick={closeCart} className="grid size-10 place-items-center rounded-full bg-[#f4f1fa] text-[#6d28d9]"><X className="size-5" /></button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto py-6">
          {!cart?.items.length ? (
            <div className="grid h-full place-items-center text-center"><div><div className="mx-auto grid size-16 place-items-center rounded-2xl bg-[#f0edff] text-[#6d28d9]"><ShoppingBag className="size-7" /></div><h3 className="mt-5 font-[Space_Grotesk] text-xl font-bold text-[#241343]">Your cart is waiting</h3><p className="mt-2 text-sm text-[#77718b]">Add a digital good and it will show up here.</p></div></div>
          ) : cart.items.map(item => (
            <div key={item.lineId} className="flex gap-3 rounded-2xl bg-[#fbfaff] p-3">
              <div className="size-20 shrink-0 overflow-hidden rounded-xl bg-[#f0edff]">{item.image && <img src={item.image.url} alt={item.productTitle} className="size-full object-cover" />}</div>
              <div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><h3 className="truncate font-semibold text-[#241343]">{item.productTitle}</h3><button aria-label={`Remove ${item.productTitle}`} onClick={() => removeItem(item.lineId)} className="text-[#9a94ab] hover:text-[#e5484d]"><X className="size-4" /></button></div><p className="mt-1 text-sm font-bold text-[#6d28d9]">{formatMoney(item.lineTotal)}</p><div className="mt-2 flex items-center gap-2"><button aria-label="Decrease quantity" onClick={() => updateQuantity(item.lineId, item.quantity - 1)} className="grid size-7 place-items-center rounded-full border border-[#e9e4f4] text-[#6d28d9]"><Minus className="size-3" /></button><span className="w-4 text-center text-sm font-bold">{item.quantity}</span><button aria-label="Increase quantity" onClick={() => updateQuantity(item.lineId, item.quantity + 1)} className="grid size-7 place-items-center rounded-full border border-[#e9e4f4] text-[#6d28d9]"><Plus className="size-3" /></button></div></div>
            </div>
          ))}
        </div>
        {cart?.items.length ? <div className="border-t border-[#eeeaf6] pt-5"><div className="flex items-center justify-between text-sm text-[#77718b]"><span>Subtotal</span><span className="text-lg font-bold text-[#241343]">{formatMoney(cart.subtotal)}</span></div><p className="mt-2 text-xs leading-5 text-[#9a94ab]">Instant download access is delivered after checkout.</p><Button onClick={proceedToCheckout} disabled={loading} className="mt-5 h-12 w-full rounded-full bg-[#6d28d9] font-bold text-white hover:bg-[#5b21b6]">{loading ? "Opening checkout…" : "Checkout with Shopify"}<ArrowRight className="ml-2 size-4" /></Button></div> : null}
      </aside>
    </div>
  );
}

function ProductDetail({ handle, onCart }: { handle: string; onCart: () => void }) {
  const { data: product, isLoading, error } = trpc.commerce.products.byHandle.useQuery({ handle }, { enabled: Boolean(handle) });
  const { addItem, loading } = useCart();
  if (isLoading) return <div className="min-h-screen bg-[#fbfbff]"><StoreHeader onCart={onCart} /><div className="container py-24 text-center text-[#77718b]">Loading your digital good…</div></div>;
  if (error || !product) return <div className="min-h-screen bg-[#fbfbff]"><StoreHeader onCart={onCart} /><div className="container py-24 text-center"><p className="text-sm font-bold uppercase tracking-[.2em] text-[#6d28d9]">Shelf not found</p><h1 className="mt-3 font-[Space_Grotesk] text-4xl font-bold text-[#241343]">That download wandered off.</h1><Link href="/" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#6d28d9]"><ArrowLeft className="size-4" /> Back to the shelf</Link></div></div>;
  const variant = product.variants[0];
  const image = product.images[0];
  return <div className="min-h-screen bg-[#fbfbff]"><StoreHeader onCart={onCart} /><main className="container py-10 md:py-16"><Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#77718b] transition-colors hover:text-[#6d28d9]"><ArrowLeft className="size-4" /> Back to all assets</Link><div className="mt-10 grid items-start gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16"><div className="overflow-hidden rounded-[2rem] bg-[#f0edff] shadow-soft"><div className="aspect-square">{image ? <img src={image.url} alt={image.altText ?? product.title} className="size-full object-cover" /> : <div className="size-full bg-[linear-gradient(135deg,#7c3aed,#22d3ee)]" />}</div></div><div className="pt-2"><div className="flex flex-wrap gap-2">{product.tags.slice(0, 3).map(tag => <span key={tag} className="rounded-full bg-[#d9fbff] px-3 py-1.5 text-xs font-bold text-[#0e6873]">{tag}</span>)}</div><h1 className="mt-5 max-w-xl font-[Space_Grotesk] text-4xl font-bold tracking-tight text-[#241343] md:text-6xl">{product.title}</h1><div className="mt-5 flex items-center gap-4"><span className="font-[Space_Grotesk] text-2xl font-bold text-[#6d28d9]">{formatMoney(variant?.price ?? product.priceRange.min)}</span><span className="flex items-center gap-1 text-sm font-semibold text-[#f59e0b]"><Star className="size-4 fill-current" /> 4.9 <span className="text-[#9a94ab]">(36 reviews)</span></span></div><div className="prose prose-sm mt-8 max-w-xl text-[#77718b]" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} /><div className="mt-8 grid gap-3 sm:grid-cols-2"><Button onClick={() => variant && addItem(variant.id)} disabled={!variant?.availableForSale || loading} className="h-14 rounded-full bg-[#6d28d9] text-base font-bold text-white shadow-[0_12px_25px_rgba(109,40,217,.25)] hover:bg-[#5b21b6]">{loading ? "Adding…" : "Add to cart"}<ShoppingBag className="ml-2 size-5" /></Button><Button variant="outline" onClick={() => variant && addItem(variant.id)} disabled={!variant?.availableForSale || loading} className="h-14 rounded-full border-[#d7d0e9] bg-white text-base font-bold text-[#6d28d9] hover:bg-[#f7f4ff]">Buy now <Zap className="ml-2 size-4 fill-current" /></Button></div><div className="mt-7 grid grid-cols-3 gap-3 border-t border-[#e9e4f4] pt-6 text-xs font-semibold text-[#77718b]"><span className="flex items-center gap-2"><Download className="size-4 text-[#6d28d9]" /> Instant access</span><span className="flex items-center gap-2"><Check className="size-4 text-[#6d28d9]" /> Lifetime use</span><span className="flex items-center gap-2"><Sparkles className="size-4 text-[#6d28d9]" /> Creator-made</span></div></div></div></main><CartDrawer /></div>;
}

export default function Home() {
  const [, routeParams] = useRoute<{ handle: string }>("/product/:handle");
  const [heroQuery, setHeroQuery] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [creatorIndex, setCreatorIndex] = useState(0);
  const { openCart } = useCart();
  const { data: products = [], isLoading } = trpc.commerce.products.list.useQuery({ first: 24 }, { enabled: !routeParams?.handle });
  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map(product => product.productType).filter(Boolean) as string[]))], [products]);
  const filteredProducts = useMemo(() => products.filter(product => {
    const haystack = [product.title, product.description, product.productType ?? "", product.vendor ?? "", ...product.tags].join(" ").toLowerCase();
    return haystack.includes(query.toLowerCase()) && (category === "All" || product.productType === category);
  }), [products, query, category]);

  if (routeParams?.handle) return <ProductDetail handle={routeParams.handle} onCart={openCart} />;

  const spotlight = creatorSpotlights[creatorIndex];
  return <div className="min-h-screen overflow-x-hidden bg-[#fbfbff] text-[#241343]"><StoreHeader onCart={openCart} /><main>
    <section className="grain relative overflow-hidden bg-[#241343] text-white"><div className="aurora-grid absolute inset-0 opacity-30" /><div className="absolute -right-24 -top-32 size-[32rem] rounded-full bg-[#7c3aed]/40 blur-3xl" /><div className="absolute -bottom-48 left-1/3 size-[28rem] rounded-full bg-cyan-300/20 blur-3xl" /><div className="container relative grid min-h-[620px] items-center gap-12 py-20 lg:grid-cols-[1.1fr_.9fr] lg:py-28"><div className="max-w-2xl"><div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-200/30 bg-cyan-200/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-cyan-200"><Sparkles className="size-4" /> The good stuff, curated</div><h1 className="text-balance font-[Space_Grotesk] text-5xl font-bold leading-[.98] tracking-[-.05em] sm:text-7xl">Make room for <span className="text-cyan-300">better</span> ideas.</h1><p className="mt-7 max-w-lg text-lg leading-8 text-white/70">Digital assets for the moments when a blank canvas needs a little extra spark. Templates, tools, and resources made by people who get it.</p><form onSubmit={event => { event.preventDefault(); setQuery(heroQuery); document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-10 flex max-w-xl items-center gap-2 rounded-2xl bg-white p-2 shadow-2xl"><Search className="ml-3 size-5 shrink-0 text-[#6d28d9]" /><Input value={heroQuery} onChange={event => setHeroQuery(event.target.value)} placeholder="Search templates, tools, resources…" className="h-12 border-0 bg-transparent text-[#241343] shadow-none focus-visible:ring-0" /><Button type="submit" className="h-12 rounded-xl bg-[#6d28d9] px-5 font-bold text-white hover:bg-[#5b21b6]">Search</Button></form><div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-white/55"><span>Try:</span>{["Branding", "Notion", "Social media"].map(item => <button key={item} onClick={() => { setHeroQuery(item); setQuery(item); document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" }); }} className="rounded-full border border-white/15 px-3 py-1.5 transition-colors hover:border-cyan-200/50 hover:text-cyan-200">{item}</button>)}</div></div><div className="relative hidden min-h-[420px] lg:block"><div className="absolute right-4 top-8 w-[min(29rem,90%)] rotate-6 rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-sm"><div className="aspect-[.95] overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-cyan-200 to-violet-400">{products[0]?.images[0] ? <img src={products[0].images[0].url} alt="" className="size-full object-cover" /> : <div className="grid size-full place-items-center text-[#241343]"><Grid2X2 className="size-24" /></div>}</div></div><div className="absolute bottom-0 left-0 w-48 -rotate-6 rounded-2xl bg-cyan-300 p-5 text-[#241343] shadow-2xl"><p className="text-xs font-bold uppercase tracking-[.2em]">PixelShelf pick</p><p className="mt-2 font-[Space_Grotesk] text-2xl font-bold leading-tight">Small tools.<br />Big energy.</p></div><div className="absolute right-0 top-1/2 grid size-24 place-items-center rounded-full bg-white text-center text-xs font-bold text-[#6d28d9] shadow-xl"><span>made for<br />momentum</span></div></div></div></section>
    <section id="categories" className="container py-14"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[.18em] text-[#6d28d9]">Explore the shelf</p><h2 className="mt-2 font-[Space_Grotesk] text-3xl font-bold tracking-tight text-[#241343] md:text-4xl">Find your next shortcut.</h2></div><p className="max-w-sm text-sm leading-6 text-[#77718b]">A thoughtful edit of digital goods that make good work feel lighter.</p></div><div className="mt-8 flex gap-2 overflow-x-auto pb-2">{categories.map(item => <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition-all ${category === item ? "bg-[#6d28d9] text-white shadow-[0_8px_20px_rgba(109,40,217,.2)]" : "bg-white text-[#77718b] ring-1 ring-[#e9e4f4] hover:bg-[#f5f1ff] hover:text-[#6d28d9]"}`}>{item}</button>)}</div></section>
    <section id="catalog" className="container pb-24"><div className="mb-6 flex items-center justify-between"><p className="text-sm font-semibold text-[#9a94ab]">{isLoading ? "Curating your shelf…" : `${filteredProducts.length} ${filteredProducts.length === 1 ? "asset" : "assets"} to explore`}</p>{query && <button onClick={() => { setQuery(""); setHeroQuery(""); }} className="text-sm font-bold text-[#6d28d9]">Clear search</button>}</div>{isLoading ? <div className="grid gap-6 sm:grid-cols-2"><div className="h-96 animate-pulse rounded-[1.65rem] bg-[#f0edff]" /><div className="h-96 animate-pulse rounded-[1.65rem] bg-[#f0edff]" /></div> : filteredProducts.length ? <div className="grid gap-6 sm:grid-cols-2">{filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}</div> : <div className="rounded-[1.65rem] border border-dashed border-[#dcd5ee] bg-white px-6 py-20 text-center"><div className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#f0edff] text-[#6d28d9]"><Search className="size-6" /></div><h3 className="mt-5 font-[Space_Grotesk] text-xl font-bold">No exact match yet.</h3><p className="mt-2 text-sm text-[#77718b]">Try a broader search or reset the filters to see the full shelf.</p><button onClick={() => { setQuery(""); setCategory("All"); }} className="mt-5 text-sm font-bold text-[#6d28d9]">Show everything</button></div>}</section>
    <section id="creators" className="border-y border-[#eeeaf6] bg-white"><div className="container grid gap-12 py-20 lg:grid-cols-[.85fr_1.15fr] lg:items-center"><div><div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#d9fbff] px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-[#0e6873]"><Sparkles className="size-4" /> Creator spotlight</div><h2 className="max-w-md font-[Space_Grotesk] text-4xl font-bold leading-tight tracking-tight text-[#241343]">Good work has a point of view.</h2><p className="mt-5 max-w-md leading-7 text-[#77718b]">Meet the independent makers behind the resources. People with a strong eye, a generous process, and something useful to share.</p><Link href="/#catalog" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#6d28d9]">Browse their work <ArrowRight className="size-4" /></Link></div><div className="relative overflow-hidden rounded-[2rem] bg-[#241343] p-8 text-white shadow-soft md:p-12"><div className="absolute right-0 top-0 size-56 rounded-full bg-[#7c3aed]/40 blur-3xl" /><div className="relative"><div className="flex items-center justify-between"><div className="flex items-center gap-4"><div className={`grid size-14 place-items-center rounded-2xl ${spotlight.color} font-[Space_Grotesk] font-bold text-[#241343]`}>{spotlight.initials}</div><div><p className="font-[Space_Grotesk] text-xl font-bold">{spotlight.name}</p><p className="text-sm text-white/60">{spotlight.role}</p></div></div><div className="flex gap-2"><button aria-label="Previous creator" onClick={() => setCreatorIndex((creatorIndex - 1 + creatorSpotlights.length) % creatorSpotlights.length)} className="grid size-10 place-items-center rounded-full border border-white/20 text-white/70 hover:bg-white/10"><ChevronLeft className="size-4" /></button><button aria-label="Next creator" onClick={() => setCreatorIndex((creatorIndex + 1) % creatorSpotlights.length)} className="grid size-10 place-items-center rounded-full border border-white/20 text-white/70 hover:bg-white/10"><ChevronRight className="size-4" /></button></div></div><div className="mt-16 max-w-lg"><div className="flex gap-1 text-cyan-300">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-current" />)}</div><blockquote className="mt-5 font-[Space_Grotesk] text-2xl font-semibold leading-snug md:text-3xl">“{spotlight.quote}”</blockquote></div><div className="mt-12 flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-white/45"><span className="size-2 rounded-full bg-cyan-300" /> Independent makers, always</div></div></div></div></section>
    <section className="container py-20"><div className="rounded-[2rem] bg-gradient-to-br from-[#e8e2ff] to-[#d9fbff] p-8 md:p-12"><div className="grid items-center gap-8 md:grid-cols-[1fr_auto]"><div><p className="text-sm font-bold uppercase tracking-[.18em] text-[#6d28d9]">For the curious</p><h2 className="mt-2 max-w-xl font-[Space_Grotesk] text-3xl font-bold tracking-tight text-[#241343] md:text-4xl">Your best work is probably one good resource away.</h2></div><a href="#catalog" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#241343] px-6 text-sm font-bold text-white transition-transform hover:-translate-y-0.5">Explore the shelf <ArrowRight className="size-4" /></a></div></div></section>
  </main><footer className="border-t border-[#eeeaf6] bg-white"><div className="container flex flex-col items-center justify-between gap-4 py-8 text-sm text-[#9a94ab] sm:flex-row"><Link href="/" className="font-[Space_Grotesk] font-bold text-[#241343]">PixelShelf<span className="text-[#6d28d9]">.</span></Link><p>Thoughtfully made digital goods for forward motion.</p><div className="flex items-center gap-4"><span>© 2026 PixelShelf</span><span className="hidden sm:inline">·</span><span>Powered by Shopify</span></div></div></footer><CartDrawer /></div>;
}
