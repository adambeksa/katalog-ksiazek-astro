<script setup lang="ts">
import { t } from '@/i18n';
</script>

<!-- Nagłówek kolumn indeksu książek (ukryty na telefonie) -->
<template>
  <div class="product-listing__head" aria-hidden="true">
    <span>{{ t('products.listing.columns.number') }}</span>
    <span />
    <span>{{ t('products.listing.columns.title') }}</span>
    <span>{{ t('products.filters.author') }}</span>
    <span>{{ t('products.filters.epoch') }}</span>
    <span>{{ t('products.filters.kind') }}</span>
    <span>{{ t('products.listing.columns.audio') }}</span>
  </div>
</template>
