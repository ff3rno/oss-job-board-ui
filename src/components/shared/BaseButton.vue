<script setup lang="ts">
import BaseIcon from './BaseIcon.vue'
import type { IconName } from './BaseIcon.vue'

type ButtonVariant = 'primary' | 'secondary' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface Props {
    variant?: ButtonVariant
    size?: ButtonSize
    icon?: IconName
    iconPosition?: 'left' | 'right'
    block?: boolean
    class?: string
    type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    size: 'md',
    iconPosition: 'left',
    block: false,
    type: 'button'
})

const variantClasses = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'bg-emerald-500 text-white hover:bg-emerald-600',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
}

const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
}
</script>

<template>
    <button
        :type="type"
        :class="[
            'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 gap-2',
            variantClasses[variant],
            sizeClasses[size],
            block ? 'w-full' : '',
            props.class
        ]"
    >
        <BaseIcon
            v-if="icon && iconPosition === 'left'"
            :name="icon"
        />
        <slot />
        <BaseIcon
            v-if="icon && iconPosition === 'right'"
            :name="icon"
        />
    </button>
</template>
