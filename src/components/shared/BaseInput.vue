<script setup lang="ts">
interface Props {
    modelValue: string | number | null
    id?: string
    label?: string
    placeholder?: string
    type?: 'text' | 'number' | 'email' | 'password' | 'textarea'
    inputClass?: string
    labelClass?: string
    class?: string
    rows?: number
}

const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement
    const value =
        props.type === 'number'
            ? target.value === ''
                ? null
                : Number(target.value)
            : target.value
    emit('update:modelValue', value)
}
</script>

<template>
    <div
        class="flex flex-col w-full"
        :class="props.class"
    >
        <label
            v-if="label"
            :for="id"
            class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            :class="props.labelClass"
        >
            {{ label }}
        </label>
        <component
            :is="props.type === 'textarea' ? 'textarea' : 'input'"
            :id="id"
            :type="props.type !== 'textarea' ? props.type || 'text' : undefined"
            :value="modelValue ?? ''"
            :placeholder="placeholder"
            @input="handleInput"
            :rows="props.type === 'textarea' ? props.rows : undefined"
            class="w-full px-3 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-emerald-500 dark:focus:border-emerald-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            :class="props.inputClass"
        />
    </div>
</template>
