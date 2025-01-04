<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseButton from '@/components/shared/BaseButton.vue'
import JobDetailsCard from '@/components/JobDetails/JobDetailsCard.vue'
import type { JobPosting } from '@/types'

const route = useRoute()
const router = useRouter()

const job = computed(() =>
    route.params.job
        ? (JSON.parse(
              decodeURIComponent(route.params.job as string),
          ) as JobPosting)
        : null,
)

const handleBack = () => {
    router.push('/')
}
</script>

<template>
    <div
        v-if="job"
        class="py-8"
    >
        <div class="mb-6">
            <BaseButton
                variant="outline"
                icon="arrow-left"
                @click="handleBack"
            >
                Back to Jobs
            </BaseButton>
        </div>

        <JobDetailsCard :job="job" />
    </div>
</template>
