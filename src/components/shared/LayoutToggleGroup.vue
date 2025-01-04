<script setup lang="ts">
import BaseIcon from './BaseIcon.vue'
import type { IconName } from './BaseIcon.vue'

export type LayoutType = 'grid' | 'list' | 'compact'

export type LayoutOption = {
    value: LayoutType
    icon: IconName
    label: string
}

const props = defineProps<{
    modelValue: LayoutType
    options: LayoutOption[]
    class?: string
}>()

defineEmits<{
    'update:modelValue': [value: LayoutType]
}>()
</script>

<template>
    <div
        class="inline-flex rounded-lg shadow-sm"
        :class="props.class"
        role="group"
    >
        <button
            v-for="option in options"
            :key="option.value"
            type="button"
            :class="[
                'inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200',
                'focus:z-10 focus:ring-2 focus:ring-emerald-500 focus:outline-none',
                option.value === modelValue
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700',
                'border border-gray-300 dark:border-gray-600',
                'first:rounded-l-lg first:border-r-0',
                'last:rounded-r-lg last:border-l-0',
                'middle:border-r-0'
            ]"
            :title="option.label"
            @click="$emit('update:modelValue', option.value)"
        >
            <BaseIcon :name="option.icon as IconName" />
        </button>
    </div>
</template>
