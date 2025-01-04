<script setup lang="ts">
import BaseIcon from './BaseIcon.vue'
import type { IconName } from './BaseIcon.vue'

const props = defineProps<{
    icon?: IconName
    variant?: 'default' | 'pill'
    class?: string
}>()
</script>

<template>
    <div
        :class="[
            'flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap',
            variant === 'pill'
                ? 'rounded-full bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
            props.class
        ]"
    >
        <BaseIcon
            v-if="icon"
            :name="icon"
            class="text-gray-500 dark:text-gray-400"
        />
        <span class="text-sm font-medium">
            <slot />
        </span>
    </div>
</template>
