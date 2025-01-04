<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import PageHeader from '@/components/PageHeader/PageHeader.vue'
import PageFooter from '@/components/PageFooter/PageFooter.vue'

const themeStore = useThemeStore()

onMounted(() => {
    themeStore.initializeTheme()
})
</script>

<template>
    <div class="flex flex-col min-h-screen bg-white dark:bg-gray-900">
        <PageHeader />

        <main class="flex-1 w-full">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <RouterView />
            </div>
        </main>

        <PageFooter />
    </div>
</template>
