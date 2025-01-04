<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <header class="bg-white shadow-md border-b pb-2 flex-shrink-0">
        <div class="w-full px-4 py-4 flex justify-between items-center">
            <div class="logo">
                <RouterLink
                    to="/"
                    class="text-2xl font-semibold text-gray-800 no-underline tracking-tight"
                >
                    OSSJobBoard
                </RouterLink>
            </div>
            <nav class="flex gap-6">
                <RouterLink
                    to="/"
                    class="text-gray-600 no-underline font-medium py-2 px-2 transition-colors hover:text-emerald-500 router-link-active:text-emerald-500 router-link-active:font-semibold"
                >
                    Home
                </RouterLink>
            </nav>
        </div>
    </header>
</template>
