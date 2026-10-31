<script setup lang="ts">
import FilterSelect from './FilterSelect.vue';
import type { IProductFilters } from '../../../domain/interfaces/IProductFilters.interface';
import type { IFilterOptions } from '../../../domain/interfaces/IFilterOptions.interface';

interface Props {
  filters: IProductFilters;
  filterOptions: IFilterOptions;
}

interface Emits {
  (e: 'filter-change', key: keyof IProductFilters, value: string): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const handleFilterChange = (key: keyof IProductFilters, value: string) => {
  emit('filter-change', key, value);
};
</script>

<template>
  <div class="product-filters">
    <FilterSelect
      label="Autor:"
      :value="filters.author || ''"
      :options="filterOptions.authors"
      @update:value="(val) => handleFilterChange('author', val)"
    />

    <FilterSelect
      label="Epoka:"
      :value="filters.epoch || ''"
      :options="filterOptions.epochs"
      @update:value="(val) => handleFilterChange('epoch', val)"
    />

    <FilterSelect
      label="Gatunek:"
      :value="filters.genre || ''"
      :options="filterOptions.genres"
      @update:value="(val) => handleFilterChange('genre', val)"
    />

    <FilterSelect
      label="Rodzaj:"
      :value="filters.kind || ''"
      :options="filterOptions.kinds"
      @update:value="(val) => handleFilterChange('kind', val)"
    />
  </div>
</template>

<style scoped>
@import './ProductFilters.scss';
</style>
