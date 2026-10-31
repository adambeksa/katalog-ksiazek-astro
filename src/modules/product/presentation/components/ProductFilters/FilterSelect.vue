<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface Props {
  label: string;
  value: string;
  options: string[];
}

interface Emits {
  (e: 'update:value', value: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isOpen = ref(false);
const searchQuery = ref('');
const containerRef = ref<HTMLDivElement | null>(null);

const filteredOptions = computed(() =>
  props.options.filter((option) =>
    option.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const handleClickOutside = (event: MouseEvent) => {
  if (
    containerRef.value &&
    !containerRef.value.contains(event.target as Node)
  ) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});

const handleToggle = () => {
  isOpen.value = !isOpen.value;
  if (!isOpen.value) searchQuery.value = '';
};

const handleSelect = (option: string) => {
  emit('update:value', option);
  isOpen.value = false;
};
</script>

<template>
  <div ref="containerRef" class="filter-select">
    <label class="filter-select__label">{{ label }}</label>
    <div
      :class="['filter-select__toggle', { active: isOpen }]"
      @click="handleToggle"
    >
      <span class="filter-select__value">{{ value }}</span>
      <span class="filter-select__arrow">▼</span>
    </div>

    <div v-if="isOpen" class="filter-select__dropdown">
      <div v-if="options.length > 5" class="filter-select__search-wrapper">
        <input
          v-model="searchQuery"
          type="text"
          class="filter-select__search"
          placeholder="Szukaj..."
          autofocus
        />
      </div>
      <ul class="filter-select__options">
        <template v-if="filteredOptions.length > 0">
          <li
            v-for="option in filteredOptions"
            :key="option"
            :class="['filter-select__item', { selected: option === value }]"
            @click="handleSelect(option)"
          >
            {{ option }}
          </li>
        </template>
        <li v-else class="filter-select__no-results">Brak wyników</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
@import './FilterSelect.scss';
</style>
