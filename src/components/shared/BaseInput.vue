<script setup lang="ts">
interface Props {
    modelValue: string | number | null
    id?: string
    label?: string
    placeholder?: string
    type?: 'text' | 'number' | 'email' | 'password'
    inputClass?: string
    labelClass?: string
    class?: string
}

const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    const value = props.type === 'number'
        ? target.value === '' ? null : Number(target.value)
        : target.value
    emit('update:modelValue', value)
}
</script>

<template>
    <div class="flex flex-col w-full" :class="props.class">
        <label
            v-if="label"
            :for="id"
            class="text-sm font-medium text-gray-700 mb-2"
            :class="props.labelClass"
        >
            {{ label }}
        </label>
        <input
            :id="id"
            :type="type || 'text'"
            :value="modelValue ?? ''"
            :placeholder="placeholder"
            @input="handleInput"
            class="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            :class="props.inputClass"
        />
    </div>
</template>

