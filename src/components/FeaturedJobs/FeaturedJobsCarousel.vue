<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import JobItem from '@/components/JobItem/JobItem.vue'
import type { JobPosting } from '@/types'

const props = defineProps<{
    jobs: JobPosting[]
    class?: string
}>()

const currentIndex = ref(0)
const autoScrollInterval = ref<number | null>(null)
const SCROLL_INTERVAL = 5000 // 5 seconds

const visibleJobs = computed(() => {
    const jobs = [...props.jobs]
    const total = jobs.length
    if (total === 0) return []

    // Show current and next 2 jobs
    const indices = [
        currentIndex.value,
        (currentIndex.value + 1) % total,
        (currentIndex.value + 2) % total,
    ]

    return indices.map((i) => ({
        job: jobs[i],
        index: i,
    }))
})

const startAutoScroll = () => {
    stopAutoScroll()
    autoScrollInterval.value = window.setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % props.jobs.length
    }, SCROLL_INTERVAL)
}

const stopAutoScroll = () => {
    if (autoScrollInterval.value) {
        clearInterval(autoScrollInterval.value)
        autoScrollInterval.value = null
    }
}

onMounted(() => {
    startAutoScroll()
})

onUnmounted(() => {
    stopAutoScroll()
})
</script>

<template>
    <div
        :class="['overflow-hidden', props.class]"
        @mouseenter="stopAutoScroll"
        @mouseleave="startAutoScroll"
    >
        <div class="flex transition-transform duration-500 ease-in-out gap-4">
            <div
                v-for="{ job, index } in visibleJobs"
                :key="job.id"
                class="w-full min-w-[300px] flex-1"
                :class="{
                    'opacity-50': index !== currentIndex,
                    'scale-95': index !== currentIndex,
                }"
            >
                <JobItem
                    :job="job"
                    layout="card-tiny"
                    class="h-full transition-all duration-500"
                />
            </div>
        </div>
    </div>
</template>
