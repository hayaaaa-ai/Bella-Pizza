"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, UserRound, X, Phone, Camera } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { contacts, restaurantConfig as r } from "@/data/restaurant-config";
import { useCart } from "@/components/cart/cart-provider";
export function Header() {
  const cart = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-inner container">
        <Link className="brand" href="/" aria-label="Bella Pizza, início">
          <img
            src="/images/bella-logo.jpg"
            alt="Logo Bella Pizza"
            width="60"
            height="60"
          />
          <span>
            Bella Pizza<small>JANUÁRIA · MG</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Principal">
          <Link href="/">Início</Link>
          <Link href="/cardapio">Cardápio</Link>
          <Link href="/#sobre">A Bella</Link>
          <Link href="/#localizacao">Localização</Link>
        </nav>
        <div className="header-actions">
          <Link className="icon-button" href="/conta" aria-label="Minha conta">
            <UserRound size={21} />
          </Link>
          <button
            className="icon-button cart-button"
            onClick={cart.openCart}
            aria-label={`Ver pedido, ${cart.count} itens`}
          >
            <ShoppingBag size={21} />
            {cart.count > 0 && (
              <span className="cart-count" aria-live="polite">
                {cart.count}
              </span>
            )}
          </button>
          <Link className="button primary header-cta" href="/cardapio">
            Pedir agora
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="icon-button menu-button"
                aria-label="Abrir menu"
              >
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent className="mobile-menu" showCloseButton={false}>
              <div className="panel-top">
                <SheetTitle>Bella Pizza</SheetTitle>
                <SheetClose asChild>
                  <button className="icon-button" aria-label="Fechar menu">
                    <X />
                  </button>
                </SheetClose>
              </div>
              <SheetDescription className="sr-only">
                Navegação e contatos da Bella Pizza em Januária.
              </SheetDescription>
              <nav aria-label="Menu mobile">
                {[
                  ["Início", "/"],
                  ["Cardápio", "/cardapio"],
                  ["A Bella", "/#sobre"],
                  ["Localização", "/#localizacao"],
                ].map(([label, url], i) => (
                  <Link onClick={() => setOpen(false)} key={url} href={url}>
                    <small>0{i + 1}</small>
                    {label}
                  </Link>
                ))}
              </nav>
              <Link
                className="button primary"
                onClick={() => setOpen(false)}
                href="/cardapio"
              >
                Pedir agora
              </Link>
              <div className="menu-contacts">
                <a href={contacts.phone}>
                  <Phone size={18} />
                  {r.phone}
                </a>
                <a
                  href={contacts.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Camera size={18} />@{r.instagram}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
