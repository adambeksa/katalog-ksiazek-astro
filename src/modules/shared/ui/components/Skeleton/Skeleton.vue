<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';

interface Props {
  width?: string | number;
  height?: string | number;
  class?: string;
  borderRadius?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
});

const style = computed<CSSProperties>(() => ({
  width: props.width,
  height: props.height,
  borderRadius: props.borderRadius,
}));
</script>

<template>
  <div :class="['skeleton', props.class]" :style="style" />
</template>

<style scoped>
@import './Skeleton.scss';
</style>
