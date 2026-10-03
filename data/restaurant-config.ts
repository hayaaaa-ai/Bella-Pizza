import type { RestaurantConfig } from "@/types/domain";
export const restaurantConfig: RestaurantConfig = {
  id: "bella-pizza-januaria",
  name: "Bella Pizza",
  city: "Januária",
  state: "MG",
  address: "Praça Emílio de Matos, 15",
  phone: "(38) 3621-6003",
  secondaryPhone: "(38) 99245-2727",
  instagram: "bellapizzajanuaria",
  whatsapp: null,
  demo: true,
};
export const contacts = {
  phone: "tel:+553836216003",
  secondaryPhone: "tel:+5538992452727",
  instagram: "https://www.instagram.com/bellapizzajanuaria/",
  maps:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Bella Pizza, Praça Emílio de Matos, 15, Januária MG"),
};
