<script setup lang="ts">
import type { JobPosting } from '@/types'
import JobItemGrid from '@/components/JobItem/components/JobItemGrid.vue'
import JobItemList from '@/components/JobItem/components/JobItemList.vue'
import JobItemTiny from '@/components/JobItem/components/JobItemTiny.vue'
import JobItemCompact from '@/components/JobItem/components/JobItemCompact.vue'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const props = defineProps<{
  job: JobPosting
  layout: 'grid' | 'list' | 'compact' | 'card-tiny'
  class?: string
}>()

const router = useRouter()
const isHighlighted = computed(() => Math.random() < 0.9)

const navigateToJobDetails = () => {
  router.push({
    name: 'job-details',
    params: {
      job: encodeURIComponent(JSON.stringify(props.job)),
    },
  })
}
</script>

<template>
  <JobItemGrid
    v-if="layout === 'grid'"
    :job="job"
    :class="props.class"
    :onClick="navigateToJobDetails"
    :is-highlighted="isHighlighted"
  />
  <JobItemList
    v-else-if="layout === 'list'"
    :job="job"
    :class="props.class"
    :onClick="navigateToJobDetails"
    :is-highlighted="isHighlighted"
  />
  <JobItemTiny
    v-else-if="layout === 'card-tiny'"
    :job="job"
    :class="props.class"
    :onClick="navigateToJobDetails"
    :is-highlighted="isHighlighted"
  />
  <JobItemCompact
    v-else
    :job="job"
    :class="props.class"
    :onClick="navigateToJobDetails"
    :is-highlighted="isHighlighted"
  />
</template>
