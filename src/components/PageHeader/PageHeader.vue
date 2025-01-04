<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <header class="bg-gray-50 border-b py-4 flex-shrink-0">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div class="flex justify-between items-center">
                <div class="text-2xl font-semibold text-gray-600 tracking-tight">
                    <RouterLink to="/" class="no-underline">
                        OSSJobBoard
                    </RouterLink>
                </div>
                <nav>
                    <RouterLink
                        to="/"
                        class="text-gray-600 no-underline font-medium transition-colors hover:text-emerald-500 router-link-active:text-emerald-500 router-link-active:font-semibold"
                    >
                        Home
                    </RouterLink>
                </nav>
            </div>
        </div>
    </header>
</template>
