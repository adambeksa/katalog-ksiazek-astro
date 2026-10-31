<script setup lang="ts">
import { onMounted } from 'vue';
import { t } from '@/i18n';
import { useProductCatalog } from '@/modules/product/application/useProductCatalog';
import type { IProductFilters } from '@/modules/product/domain/interfaces/IProductFilters.interface';
import ProductBox from '@/modules/product/presentation/components/ProductBox/ProductBox.vue';
import ProductFilters from '@/modules/product/presentation/components/ProductFilters/ProductFilters.vue';
import ProductListingSkeleton from './ProductListingSkeleton.vue';
import ProductListingHead from './ProductListingHead.vue';

const {
  isLoading,
  filteredProducts: products,
  filters,
  filterOptions,
  page,
  totalPages,
  itemsPerPage,
  loadAllProducts,
  setFilter,
  setPage,
} = useProductCatalog();

onMounted(() => {
  loadAllProducts();
});

const handleFilterChange = (key: keyof IProductFilters, value: string) => {
  setFilter(key, value);
};

const previousPage = () => {
  if (page.value > 1) {
    setPage(page.value - 1);
  }
};

const nextPage = () => {
  if (page.value < totalPages.value) {
    setPage(page.value + 1);
  }
};
</script>

<!-- Wyspa katalogu (client:only) - filtry i paginacja działają w przeglądarce -->
<template>
  <ProductListingSkeleton v-if="isLoading" />

  <template v-else>
    <ProductFilters
      :filters="filters"
      :filter-options="filterOptions"
      @filter-change="handleFilterChange"
    />

    <ProductListingHead />
    <div
      class="product-listing__grid"
      :style="{ counterReset: `book ${(page - 1) * itemsPerPage}` }"
    >
      <ProductBox
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>

    <div v-if="products.length === 0" class="product-listing__empty">
      <p>{{ t('products.listing.empty') }}</p>
    </div>

    <div v-else class="pagination">
      <button
        :disabled="page === 1"
        class="pagination__button"
        @click="previousPage"
      >
        {{ t('products.pagination.previous') }}
      </button>
      <span class="pagination__info">
        {{ t('products.pagination.pageInfo', { page, total: totalPages }) }}
      </span>
      <button
        :disabled="page === totalPages"
        class="pagination__button"
        @click="nextPage"
      >
        {{ t('products.pagination.next') }}
      </button>
    </div>
  </template>
</template>
