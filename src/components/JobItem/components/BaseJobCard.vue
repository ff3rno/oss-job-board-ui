<script setup lang="ts">
const props = defineProps<{
  variant?: 'default' | 'compact'
  class?: string
  onClick?: () => void
}>()
</script>

<template>
  <div
    :class="[
      'transition-all duration-200 ease-in-out cursor-pointer',
      variant === 'compact'
        ? 'px-4 py-3 border-b last:border-b-0 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-indigo-200 dark:hover:border-indigo-800 relative group'
        : 'border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-gray-50 dark:hover:bg-gray-750',
      props.class,
    ]"
    @click="onClick"
  >
    <slot />
  </div>
</template>
