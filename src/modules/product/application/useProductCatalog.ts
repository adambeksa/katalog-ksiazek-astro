import { ref, computed, watch } from 'vue';
import axios from 'axios';
import { ProductFilterService } from '../domain/services/ProductFilterService';
import type { IProductFilters } from '../domain/interfaces/IProductFilters.interface';
import type { IProductListItem } from '../domain/interfaces/IProductListItem.interface';
import { t } from '@/i18n';

const productFilterService = new ProductFilterService();

// Filtry i strona zostają w sessionStorage, żeby po powrocie z karty książki
// katalog wyglądał tak jak przed wyjściem (w SPA trzymał to store Pinii)
const STATE_KEY = 'product-catalog';

const defaultFilters = (): IProductFilters => ({
  author: t('common.all'),
  epoch: t('common.all'),
  genre: t('common.all'),
  kind: t('common.all'),
});

const readSavedState = (): { filters: IProductFilters; page: number } | null => {
  try {
    const saved = sessionStorage.getItem(STATE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

export const useProductCatalog = () => {
  const saved = readSavedState();

  const products = ref<IProductListItem[]>([]);
  const isLoading = ref(true);
  const filters = ref<IProductFilters>(saved?.filters ?? defaultFilters());
  const page = ref(saved?.page ?? 1);
  const itemsPerPage = 20;

  const filterOptions = computed(() =>
    productFilterService.buildFilterOptions(products.value),
  );
  const filteredResult = computed(() =>
    productFilterService.filterAndPaginate(products.value, {
      filters: filters.value,
      page: page.value,
      limit: itemsPerPage,
    }),
  );
  const filteredProducts = computed(() => filteredResult.value.items);
  const totalPages = computed(() => Math.ceil(filteredResult.value.total / itemsPerPage));

  watch([filters, page], () => {
    try {
      sessionStorage.setItem(
        STATE_KEY,
        JSON.stringify({ filters: filters.value, page: page.value }),
      );
    } catch {
      // brak dostępu do sessionStorage - stan żyje tylko do przeładowania
    }
  });

  const loadAllProducts = async () => {
    isLoading.value = true;
    try {
      const res = await axios.get<IProductListItem[]>('/api/products');
      products.value = res.data;
    } catch (e) {
      console.error('Failed to load products:', e);
    } finally {
      isLoading.value = false;
    }
  };

  const setFilter = (key: keyof IProductFilters, value: string) => {
    filters.value = {
      ...filters.value,
      [key]: value,
    };
    page.value = 1;
  };

  const setPage = (newPage: number) => {
    page.value = newPage;
  };

  return {
    isLoading,
    filters,
    filterOptions,
    filteredProducts,
    page,
    totalPages,
    itemsPerPage,
    loadAllProducts,
    setFilter,
    setPage,
  };
};
