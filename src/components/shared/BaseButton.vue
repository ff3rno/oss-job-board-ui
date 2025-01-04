<script setup lang="ts">
import BaseIcon from '@/components/shared/BaseIcon/BaseIcon.vue'
import type { IconName } from '@/components/shared/BaseIcon/BaseIcon.vue'

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
  round?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  iconPosition: 'left',
  block: false,
  type: 'button',
  round: false,
})

const variantClasses = {
  primary:
    'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600',
  secondary:
    'bg-emerald-500 text-white hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700',
  outline:
    'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700',
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}
</script>

<template>
  <button
    :type="type"
    :class="
      [
        ...new Set([
          'inline-flex',
          'items-center',
          'justify-center',
          'font-medium',
          'transition-colors',
          'duration-200',
          'gap-2',
          ...variantClasses[variant].split(' '),
          ...sizeClasses[size].split(' '),
          ...(block ? ['w-full'] : []),
          ...(round ? ['rounded-full'] : ['rounded-lg']),
          ...(props.class?.split(' ') || []),
        ]),
      ].join(' ')
    "
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
