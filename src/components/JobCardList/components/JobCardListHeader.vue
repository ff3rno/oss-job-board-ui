<script setup lang="ts">
const props = defineProps<{
    sortDirection: string
    jobCount: number
}>()

defineEmits<{
    'update:sortDirection': [value: string]
}>()
</script>

<template>
    <div class="mb-8">
        <div class="flex items-center justify-between">
            <div class="space-y-1">
                <h1 class="text-2xl font-bold text-gray-900">Postings</h1>
                <p class="text-sm text-gray-600">
                    Showing {{ jobCount }} jobs
                </p>
            </div>
            <div class="flex items-center gap-3">
                <label
                    for="sort"
                    class="text-sm font-medium text-gray-700"
                >
                    Sort by:
                </label>
                <select
                    id="sort"
                    :value="sortDirection"
                    @change="
                        $emit(
                            'update:sortDirection',
                            ($event.target as HTMLSelectElement).value,
                        )
                    "
                    class="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
        </div>
        <div class="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 mt-6"></div>
    </div>
</template>
