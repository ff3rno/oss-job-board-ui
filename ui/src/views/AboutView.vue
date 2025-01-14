<script setup lang="ts">
import BaseButton from '@/components/shared/BaseButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="py-8">
    <div class="mb-6">
      <BaseButton
        variant="outline"
        icon="arrow-left"
        @click="handleBack"
      >
        Back to Jobs
      </BaseButton>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        About OSS Job Board
      </h1>

      <div class="prose dark:prose-invert max-w-none">
        <p class="text-gray-600 dark:text-gray-300">
          Welcome to OSS Job Board, a platform dedicated to connecting talented
          developers with exciting opportunities in the open-source software
          community.
        </p>
      </div>
    </div>
  </div>
</template>
