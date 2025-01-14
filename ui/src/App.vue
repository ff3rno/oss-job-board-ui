<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import PageHeader from '@/components/PageHeader.vue'
import PageFooter from '@/components/PageFooter.vue'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initializeTheme()
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900">
    <PageHeader />

    <main class="flex-1 w-full py-2">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <RouterView />
      </div>
    </main>

    <PageFooter />
  </div>
</template>
