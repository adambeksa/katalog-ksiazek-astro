<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { t } from '@/i18n';
import type { IProduct } from '@/modules/product/domain/interfaces/IProduct.interface';
import DownloadModal from '@/modules/product/presentation/components/DownloadModal/DownloadModal.vue';

interface Props {
  product: IProduct;
}

const props = defineProps<Props>();

const isMounted = ref(false);
const showDownloadModal = ref(false);
const showAudioModal = ref(false);

const hasAudio = computed(() =>
  props.product.audioFormats && Object.keys(props.product.audioFormats).length > 0
);

// Teleport dopiero po hydratacji - w HTML z serwera modali i tak nie ma
onMounted(() => {
  isMounted.value = true;
});

const handleDownload = () => {
  showDownloadModal.value = true;
};

const handleAudioDownload = () => {
  showAudioModal.value = true;
};
</script>

<!-- Wyspa karty książki (client:load) - przyciski otwierające modale pobierania -->
<template>
  <div class="product-card-page__actions">
    <button
      class="product-card-page__read-button"
      @click="handleDownload"
    >
      {{ t('productCard.readBook') }}
    </button>

    <button
      v-if="hasAudio"
      class="product-card-page__audio-button"
      @click="handleAudioDownload"
    >
      {{ t('productCard.listenAudiobook') }}
    </button>
  </div>

  <!-- Modale trafiają na koniec .product-card-page, tak jak w wersji SPA -->
  <Teleport v-if="isMounted" to=".product-card-page">
    <DownloadModal
      v-if="showDownloadModal"
      :product="product"
      @close="showDownloadModal = false"
    />

    <DownloadModal
      v-if="showAudioModal"
      :product="product"
      :title="t('downloadModal.audiobookTitle')"
      :formats="product.audioFormats"
      @close="showAudioModal = false"
    />
  </Teleport>
</template>
