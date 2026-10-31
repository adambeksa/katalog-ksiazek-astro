<script setup lang="ts">
import { t } from '@/i18n';
import { ROUTES } from '@/routes';
import type { IProductListItem } from '../../../domain/interfaces/IProductListItem.interface';

interface Props {
  product: IProductListItem;
}

defineProps<Props>();
</script>

<template>
  <div v-if="product" class="product-box">
    <img
      class="product-box__image"
      :src="product.image"
      :alt="product.name"
    />
    <div class="product-box__info">
      <h3 class="product-box__title">{{ product.name }}</h3>
      <div class="product-box__meta">
        <span class="product-box__author">{{ product.author }}</span>
        <span class="product-box__epoch">{{ product.epoch }}</span>
        <span class="product-box__kind">{{ product.kind }}</span>
        <span
          v-if="product.features.includes('audiobook')"
          class="product-box__audio"
          title="Audiobook"
        >
          Audiobook
        </span>
      </div>
      <a
        :href="ROUTES.PRODUCT_DETAILS.path(product.id)"
        class="product-box__link"
      >
        {{ t('products.box.viewDetails') }}
      </a>
    </div>
  </div>
</template>

<style scoped>
@import './ProductBox.scss';
</style>
