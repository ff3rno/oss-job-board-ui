<script setup lang="ts">
import { computed } from 'vue'
import { clsx } from 'clsx'
import BaseSelect from '@/components/shared/BaseSelect.vue'
import LayoutToggleGroup, {
  type LayoutType,
  type LayoutOption,
} from '@/components/shared/LayoutToggleGroup.vue'

const props = defineProps<{
  sortDirection: string
  sortKey: string
  layout: LayoutType
  title?: string
  class?: string
}>()

const sortOptions = [
  { value: 'datePosted', label: 'Date Posted' },
  { value: 'title', label: 'Title' },
  { value: 'location', label: 'Location' },
  { value: 'salary', label: 'Salary' },
  { value: 'experienceLevel', label: 'Experience Level' },
]

const layoutOptions: LayoutOption[] = [
  { value: 'grid', icon: 'grid', label: 'Grid View' },
  { value: 'list', icon: 'list', label: 'List View' },
  { value: 'compact', icon: 'compact', label: 'Compact View' },
]

defineEmits<{
  'update:sortDirection': [value: string]
  'update:sortKey': [value: string]
  'update:layout': [value: LayoutType]
}>()

const containerClasses = computed(() =>
  clsx(
    'flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-2',
    props.class,
  ),
)
</script>

<template>
  <div :class="containerClasses">
    <h2 v-if="title" class="text-2xl font-semibold text-gray-900 dark:text-gray-300 mb-4 sm:mb-0 shrink">{{ title }}</h2>

    <LayoutToggleGroup
      :model-value="layout"
      :options="layoutOptions"
      @update:model-value="$emit('update:layout', $event)"
      class="grow"
    />

    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <BaseSelect
        :model-value="sortKey"
        :options="sortOptions"
        class="w-48"
        @update:model-value="$emit('update:sortKey', $event)"
      />

      <BaseSelect
        :model-value="sortDirection"
        :options="[
          { value: 'asc', label: 'Ascending' },
          { value: 'desc', label: 'Descending' },
        ]"
        class="w-36"
        @update:model-value="$emit('update:sortDirection', $event)"
      />
    </div>
  </div>
</template>
