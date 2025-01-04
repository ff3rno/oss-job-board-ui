<script setup lang="ts">
import { RouterView } from 'vue-router'
import PageHeader from '@/components/PageHeader/PageHeader.vue'
</script>

<template>
    <div class="flex flex-col h-screen">
        <PageHeader />

        <main class="flex-1 h-0">
            <RouterView />
        </main>

        <footer class="bg-gray-50 border-t py-8 flex-shrink-0">
            <div class="container mx-auto px-4 text-center text-gray-600">
                <p class="mb-2">
                    &copy; 2025 OSSJobBoard. All rights reserved.
                </p>
                <p>Made with ❤️ in Vienna, Austria</p>
            </div>
        </footer>
    </div>
</template>
