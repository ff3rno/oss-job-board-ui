<script setup lang="ts">
import type { JobPosting } from '@/types'
import JobItemGrid from './components/JobItemGrid.vue'
import JobItemList from './components/JobItemList.vue'
import JobItemTiny from './components/JobItemTiny.vue'
import JobItemCompact from './components/JobItemCompact.vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
    job: JobPosting
    layout: 'grid' | 'list' | 'compact' | 'card-tiny'
    class?: string
}>()

const router = useRouter()

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
    />
    <JobItemList
        v-else-if="layout === 'list'"
        :job="job"
        :class="props.class"
        :onClick="navigateToJobDetails"
    />
    <JobItemTiny
        v-else-if="layout === 'card-tiny'"
        :job="job"
        :class="props.class"
        :onClick="navigateToJobDetails"
    />
    <JobItemCompact
        v-else
        :job="job"
        :class="props.class"
        :onClick="navigateToJobDetails"
    />
</template>
