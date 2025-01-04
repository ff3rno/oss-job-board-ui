<script setup lang="ts">
import JobListHeader from '@/components/JobList/components/JobListHeader.vue'
import InfiniteJobList from '@/components/JobList/components/InfiniteJobList.vue'
import { computed, ref } from 'vue'
import { type LayoutType } from '@/components/shared/LayoutToggleGroup.vue'
import type { JobPosting } from '@/types'

const props = defineProps<{
  jobs: JobPosting[]
  sortDirection: string
  sortKey: string
  pageSize: number
  class?: string
}>()

const layout = ref<LayoutType>('list')

const sortedJobs = computed(() => {
  return [...props.jobs].sort((a, b) => {
    let compareResult = 0

    switch (props.sortKey) {
      case 'title':
        compareResult = a.title.localeCompare(b.title)
        break
      case 'location':
        compareResult = a.location.localeCompare(b.location)
        break
      case 'salary':
        compareResult =
          a.salary.min + a.salary.max - (b.salary.min + b.salary.max)
        break
      case 'experienceLevel':
        compareResult = a.experienceLevel.localeCompare(b.experienceLevel)
        break
      case 'datePosted':
        compareResult =
          new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime()
        break
      default:
        compareResult = 0
    }

    return props.sortDirection === 'asc' ? compareResult : -compareResult
  })
})

defineEmits<{
  'update:sortDirection': [value: string]
  'update:sortKey': [value: string]
}>()
</script>

<template>
  <main :class="['flex-1', props.class]">
    <JobListHeader
      :sort-direction="sortDirection"
      :sort-key="sortKey"
      :layout="layout"
      @update:sort-direction="$emit('update:sortDirection', $event)"
      @update:sort-key="$emit('update:sortKey', $event)"
      @update:layout="layout = $event"
    />

    <InfiniteJobList
      :jobs="sortedJobs"
      :layout="layout"
      :page-size="pageSize"
      class="h-[calc(100vh-16rem)] mt-4"
    />
  </main>
</template>
