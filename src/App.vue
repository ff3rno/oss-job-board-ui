<script setup lang="ts">
import { RouterView } from 'vue-router'
import PageHeader from '@/components/PageHeader/PageHeader.vue'
import PageFooter from '@/components/PageFooter/PageFooter.vue'
</script>

<template>
    <div class="flex flex-col h-screen">
        <PageHeader />

        <main class="flex-1 h-0">
            <RouterView />
        </main>

        <PageFooter />
    </div>
</template>
