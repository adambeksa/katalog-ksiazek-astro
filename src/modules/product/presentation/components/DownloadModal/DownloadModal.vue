<script setup lang="ts">
import { ref, computed } from 'vue';
import { t } from '@/i18n';
import type { IProduct } from '../../../domain/interfaces/IProduct.interface';

interface Props {
  product: IProduct;
  title?: string;
  formats?: any;
}

interface Emits {
  (e: 'close'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const selectedFormat = ref<{ key: string; files: any[] } | null>(null);

const formatsToDisplay = computed(() => 
  props.formats || (props.product && props.product.formats)
);

const availableFormats = computed(() => {
  if (!formatsToDisplay.value) return [];
  
  return Object.entries(formatsToDisplay.value).filter(([, val]) => {
    if (Array.isArray(val)) return val.length > 0;
    return !!val;
  });
});

const handleFormatClick = (key: string, val: any, e: Event) => {
  if (Array.isArray(val)) {
    e.preventDefault();
    selectedFormat.value = { key, files: val };
  }
};

const handleBack = () => {
  selectedFormat.value = null;
};

const handleClose = () => {
  emit('close');
};
</script>

<template>
  <div v-if="formatsToDisplay" class="download-modal" @click="handleClose">
    <div
      class="download-modal__content"
      @click.stop
    >
      <button class="download-modal__close" @click="handleClose">
        &times;
      </button>

      <template v-if="!selectedFormat">
        <h2>{{ title || t('downloadModal.title') }}</h2>
        <p>
          {{ t('downloadModal.book') }} <strong>{{ product.name }}</strong>
        </p>

        <div class="download-modal__formats-list">
          <template v-if="availableFormats.length > 0">
            <a
              v-for="[key, val] in availableFormats"
              :key="key"
              :href="Array.isArray(val) ? '#' : (val as string)"
              :target="Array.isArray(val) ? undefined : '_blank'"
              :rel="Array.isArray(val) ? undefined : 'noopener noreferrer'"
              class="download-modal__format-link"
              @click="(e) => handleFormatClick(key, val, e)"
            >
              {{ t('downloadModal.download', { format: key.toUpperCase() }) }}
            </a>
          </template>
          <p v-else class="download-modal__no-formats">
            {{ t('downloadModal.noFormats') }}
          </p>
        </div>
      </template>

      <template v-else>
        <div class="download-modal__header-actions">
          <button
            class="download-modal__back-button"
            @click="handleBack"
          >
            {{ t('downloadModal.back') }}
          </button>
          <h2>{{ t('downloadModal.format', { format: selectedFormat.key.toUpperCase() }) }}</h2>
        </div>
        <p>{{ t('downloadModal.selectFile') }}</p>
        <div class="download-modal__files-list">
          <a
            v-for="(file, index) in selectedFormat.files"
            :key="index"
            :href="file.url"
            target="_blank"
            rel="noopener noreferrer"
            class="download-modal__file-link"
          >
            <span class="download-modal__file-name">{{ file.name }}</span>
          </a>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
@import './DownloadModal.scss';
</style>
