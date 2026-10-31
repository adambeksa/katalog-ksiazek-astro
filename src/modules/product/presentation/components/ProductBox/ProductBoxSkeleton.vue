<script setup lang="ts">
import Skeleton from '../../../../shared/ui/components/Skeleton/Skeleton.vue';
</script>

<template>
  <div class="product-box-skeleton">
    <Skeleton height="200px" width="100%" />
    <div class="product-box-skeleton__info">
      <Skeleton
        height="24px"
        width="70%"
        class="product-box-skeleton__mb-2"
      />
      <Skeleton
        height="16px"
        width="100%"
        class="product-box-skeleton__mb-1"
      />
      <Skeleton
        height="16px"
        width="90%"
        class="product-box-skeleton__mb-1"
      />
      <Skeleton
        height="16px"
        width="40%"
        class="product-box-skeleton__mb-3"
      />
      <Skeleton
        height="36px"
        width="100%"
        border-radius="5px"
        class="product-box-skeleton__mt-auto"
      />
    </div>
  </div>
</template>

<style scoped>
@import './ProductBoxSkeleton.scss';
</style>
