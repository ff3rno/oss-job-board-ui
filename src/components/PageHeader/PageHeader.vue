<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import ThemeToggle from '@/components/shared/ThemeToggle.vue'
import BaseButton from '@/components/shared/BaseButton.vue'
import { navigationLinks } from '@/router'

const router = useRouter()

const handlePostJob = () => {
  router.push({ name: 'post' })
}
</script>

<template>
  <header
    class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 py-4 flex-shrink-0"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-8">
          <RouterLink
            to="/"
            class="group flex items-center space-x-2 no-underline"
          >
            <div
              class="bg-emerald-500 dark:bg-emerald-600 text-white p-2 rounded-lg shadow-sm group-hover:bg-emerald-600 dark:group-hover:bg-emerald-700 transition-all duration-200 hover:scale-105"
            >
              <span class="text-lg font-bold">OSS</span>
            </div>
            <div
              class="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent group-hover:to-emerald-500 transition-all duration-200"
            >
              Jobs
            </div>
          </RouterLink>

          <nav class="hidden md:flex items-center space-x-6">
            <RouterLink
              v-for="link in navigationLinks"
              :key="link.path"
              :to="link.path"
              class="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
              :class="{
                'text-emerald-600 dark:text-emerald-400':
                  $route.path === link.path,
              }"
            >
              {{ link.name }}
            </RouterLink>
          </nav>
        </div>

        <div class="flex items-center gap-4">
          <ThemeToggle />
          <BaseButton
            variant="primary"
            @click="handlePostJob"
          >
            Post a Job
          </BaseButton>
        </div>
      </div>
    </div>
  </header>
</template>
