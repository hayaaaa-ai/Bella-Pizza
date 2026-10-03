import type { MenuCategory, MenuItem } from "@/types/domain";
// Entire catalogue is illustrative. Replace via MenuRepository; never present these values as official Bella prices.
export const categories: MenuCategory[] = [
  { id: "pizzas", name: "Pizzas", description: "Salgadas" },
  { id: "especiais", name: "Especiais", description: "Seleções de exemplo" },
  { id: "doces", name: "Doces", description: "Pizzas doces de exemplo" },
];
const variants = [
  { id: "media", name: "Média · exemplo", price: 3990 },
  { id: "grande", name: "Grande · exemplo", price: 5490 },
];
const options = [
  { id: "borda-queijo", name: "Borda de queijo · exemplo", price: 800 },
];
export const menuItems: MenuItem[] = [
  {
    id: "mucarela",
    restaurantId: "bella-pizza-januaria",
    categoryId: "pizzas",
    name: "Muçarela",
    description: "Molho de tomate, muçarela e um toque de orégano.",
    imageKey: "hero",
    available: true,
    isDemo: true,
    variants,
    options,
    featured: true,
  },
  {
    id: "calabresa",
    restaurantId: "bella-pizza-januaria",
    categoryId: "pizzas",
    name: "Calabresa",
    description: "Muçarela, calabresa em fatias e cebola.",
    imageKey: "slice",
    available: true,
    isDemo: true,
    variants: [
      { id: "media", name: "Média · exemplo", price: 4290 },
      { id: "grande", name: "Grande · exemplo", price: 5790 },
    ],
    options,
    featured: true,
  },
  {
    id: "queijos",
    restaurantId: "bella-pizza-januaria",
    categoryId: "especiais",
    name: "Seleção de queijos",
    description: "Uma combinação de queijos sobre molho de tomate.",
    imageKey: "serve",
    available: true,
    isDemo: true,
    variants: [
      { id: "media", name: "Média · exemplo", price: 4490 },
      { id: "grande", name: "Grande · exemplo", price: 5990 },
    ],
    options,
    featured: true,
  },
  {
    id: "doce",
    restaurantId: "bella-pizza-januaria",
    categoryId: "doces",
    name: "Pizza doce",
    description: "O espaço reservado para os sabores doces do cardápio.",
    imageKey: "",
    available: false,
    isDemo: true,
    variants: [{ id: "media", name: "Média · exemplo", price: 3990 }],
    options: [],
  },
];
