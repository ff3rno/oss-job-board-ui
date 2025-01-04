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
            variant === 'pill' ? 'rounded-full bg-indigo-50 text-indigo-700' : 'bg-gray-50 text-gray-700',
            props.class
        ]"
    >
        <BaseIcon
            v-if="icon"
            :name="icon"
            class="text-gray-500"
        />
        <span class="text-sm font-medium">
            <slot />
        </span>
    </div>
</template>
