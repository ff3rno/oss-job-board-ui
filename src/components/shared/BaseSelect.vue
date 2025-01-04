<script setup lang="ts">
interface Option {
    value: string
    label: string
}

const props = defineProps<{
    modelValue: string
    options: Option[]
    id?: string
    label?: string
    placeholder?: string
    selectClass?: string
    labelClass?: string
    class?: string
}>()

defineEmits<{
    'update:modelValue': [value: string]
}>()
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
        <select
            :id="id"
            :value="modelValue"
            @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
            class="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            :class="props.selectClass"
        >
            <option v-if="placeholder" value="">{{ placeholder }}</option>
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
            >
                {{ option.label }}
            </option>
        </select>
    </div>
</template>
