<script setup lang="ts">
import ProductBoxSkeleton from '@/modules/product/presentation/components/ProductBox/ProductBoxSkeleton.vue';
import ProductFiltersSkeleton from '@/modules/product/presentation/components/ProductFilters/ProductFiltersSkeleton.vue';
import ProductListingHead from './ProductListingHead.vue';
</script>

<!-- Okruszki renderuje strona Astro, szkielet zaczyna się od filtrów -->
<template>
  <ProductFiltersSkeleton />

  <ProductListingHead />
  <div class="product-listing__grid">
    <ProductBoxSkeleton v-for="i in 9" :key="i" />
  </div>
</template>
