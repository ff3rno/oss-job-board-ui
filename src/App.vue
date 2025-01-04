<script setup lang="ts">
import { RouterView } from 'vue-router'
import PageHeader from '@/components/PageHeader/PageHeader.vue'
import PageFooter from '@/components/PageFooter/PageFooter.vue'
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <PageHeader />

        <main class="flex-1 w-full">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <RouterView />
            </div>
        </main>

        <PageFooter />
    </div>
</template>
