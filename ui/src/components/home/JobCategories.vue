<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseIcon from '@/components/shared/BaseIcon/BaseIcon.vue'
import type { IconName } from '@/components/shared/BaseIcon/BaseIcon.vue'

const categories = [
  { id: 1, name: 'Software Development', icon: 'code' as IconName, count: 450 },
  { id: 2, name: 'DevOps & Infrastructure', icon: 'server' as IconName, count: 230 },
  { id: 3, name: 'Product & Design', icon: 'pen-tool' as IconName, count: 180 },
  { id: 4, name: 'Data Science', icon: 'database' as IconName, count: 120 },
  { id: 5, name: 'Project Management', icon: 'clipboard' as IconName, count: 95 },
  { id: 6, name: 'Marketing & Sales', icon: 'trending-up' as IconName, count: 85 }
]

const router = useRouter()

const navigateToCategory = (category: string) => {
  router.push({
    name: 'browse',
    query: { category }
  })
}
</script>

<template>
  <section>
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Popular Categories</h2>
      <p class="mt-2 text-lg text-gray-600 dark:text-gray-300">
        Browse jobs by category and find your perfect role
      </p>
    </div>

    <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <button
        v-for="category in categories"
        :key="category.id"
        class="group flex items-center gap-4 rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition hover:border-primary-500 dark:hover:border-primary-400 hover:shadow-lg"
        @click="navigateToCategory(category.name)"
      >
        <div class="rounded-full bg-primary-50 dark:bg-primary-900/30 p-4 text-primary-600 dark:text-primary-400 transition group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50">
          <BaseIcon :name="category.icon" class="h-6 w-6" />
        </div>
        <div class="text-left">
          <h3 class="font-semibold text-gray-900 dark:text-white">{{ category.name }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ category.count }}+ open positions</p>
        </div>
      </button>
    </div>
  </section>
</template>
