<script setup lang="ts">
import BaseSelect from '@/components/shared/BaseSelect.vue'
import BaseButton from '@/components/shared/BaseButton.vue'
import BaseIcon from '@/components/shared/BaseIcon.vue'

const props = defineProps<{
    sortDirection: string
    sortKey: string
    jobCount: number
    layout: 'grid' | 'list'
}>()

defineEmits<{
    'update:sortDirection': [value: string]
    'update:sortKey': [value: string]
    'update:layout': [value: 'grid' | 'list']
}>()

const sortKeyOptions = [
    { value: 'title', label: 'Title' },
    { value: 'location', label: 'Location' },
    { value: 'salary', label: 'Salary Range' },
    { value: 'experienceLevel', label: 'Experience Level' },
    { value: 'datePosted', label: 'Date Posted' }
]

const sortDirectionOptions = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' }
]
</script>

<template>
    <div class="mb-8">
        <div class="flex items-center justify-between">
            <div class="space-y-1 mt-4">
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Postings</h1>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    Showing {{ jobCount }} jobs
                </p>
            </div>
            <div class="flex items-end gap-3">
                <BaseButton
                    variant="outline"
                    size="sm"
                    class="!p-2 mb-[1.75rem]"
                    @click="$emit('update:layout', layout === 'grid' ? 'list' : 'grid')"
                >
                    <BaseIcon :name="layout === 'grid' ? 'list' : 'grid'" />
                </BaseButton>
                <BaseSelect
                    id="sortKey"
                    :modelValue="sortKey"
                    :options="sortKeyOptions"
                    label="Sort by"
                    @update:modelValue="$emit('update:sortKey', $event)"
                />
                <BaseSelect
                    id="sortDirection"
                    :modelValue="sortDirection"
                    :options="sortDirectionOptions"
                    class="self-end"
                    @update:modelValue="$emit('update:sortDirection', $event)"
                />
            </div>
        </div>
        <div class="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 mt-6"></div>
    </div>
</template>
