<script setup lang="ts">
const props = defineProps<{
    sortDirection: string
}>()

defineEmits<{
    'update:sortDirection': [value: string]
}>()
</script>

<template>
    <div class="mb-6 flex pl-2 pr-8 items-center justify-between">
        <h1 class="text-xl font-semibold text-gray-800 border-b pb-2">
            Job Postings
        </h1>
        <div class="flex items-center gap-2">
            <label
                for="sort"
                class="text-gray-700"
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
                class="p-2 border border-gray-300 rounded-md"
            >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
    </div>
</template>
