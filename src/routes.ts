export const ROUTES = {
  HOME: { path: '/' },
  PRODUCTS: { path: '/products' },
  PRODUCT_DETAILS: {
    path: (id: string) => `/products/${id}`,
  },
};

// Odpowiednik klas, które RouterLink dodawał linkowi do bieżącej strony
export const exactActiveLinkAttrs = (path: string, currentPath: string) => {
  const normalize = (value: string) => value.replace(/(.)\/+$/, '$1');

  return normalize(path) === normalize(currentPath)
    ? { class: 'router-link-active router-link-exact-active', 'aria-current': 'page' as const }
    : {};
};
