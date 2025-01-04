<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <header class="bg-gradient-to-r from-emerald-50 to-gray-50 border-b shadow-sm py-5 flex-shrink-0">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div class="flex items-center">
                <RouterLink to="/" class="group flex items-center space-x-2 no-underline">
                    <div class="bg-emerald-500 text-white p-2 rounded-lg shadow-sm group-hover:bg-emerald-600 transition-colors">
                        <span class="text-lg font-bold">OSS</span>
                    </div>
                    <div class="text-2xl font-bold text-gray-700 tracking-tight group-hover:text-emerald-600 transition-colors">
                        Jobs
                    </div>
                </RouterLink>
            </div>
        </div>
    </header>
</template>
