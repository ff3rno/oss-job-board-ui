<script setup lang="ts">
import type { Component } from 'vue'
import MoneyIcon from '@/components/shared/BaseIcon/components/MoneyIcon.vue'
import BriefcaseIcon from '@/components/shared/BaseIcon/components/BriefcaseIcon.vue'
import LocationIcon from '@/components/shared/BaseIcon/components/LocationIcon.vue'
import ArrowRightIcon from '@/components/shared/BaseIcon/components/ArrowRightIcon.vue'
import WorldIcon from '@/components/shared/BaseIcon/components/WorldIcon.vue'
import GridIcon from '@/components/shared/BaseIcon/components/GridIcon.vue'
import ListIcon from '@/components/shared/BaseIcon/components/ListIcon.vue'
import ArrowLeftIcon from '@/components/shared/BaseIcon/components/ArrowLeftIcon.vue'
import CompactIcon from '@/components/shared/BaseIcon/components/CompactIcon.vue'
import ChevronLeftIcon from '@/components/shared/BaseIcon/components/ChevronLeftIcon.vue'
import ChevronRightIcon from '@/components/shared/BaseIcon/components/ChevronRightIcon.vue'

export type IconName =
  | 'money'
  | 'briefcase'
  | 'location'
  | 'arrow-right'
  | 'world'
  | 'grid'
  | 'list'
  | 'arrow-left'
  | 'compact'
  | 'chevron-left'
  | 'chevron-right'

const props = defineProps<{
  name: IconName
  class?: string
}>()

const icons: Record<IconName, Component> = {
  money: MoneyIcon,
  briefcase: BriefcaseIcon,
  location: LocationIcon,
  'arrow-right': ArrowRightIcon,
  world: WorldIcon,
  grid: GridIcon,
  list: ListIcon,
  'arrow-left': ArrowLeftIcon,
  compact: CompactIcon,
  'chevron-left': ChevronLeftIcon,
  'chevron-right': ChevronRightIcon,
}
</script>

<template>
  <component
    :is="icons[name]"
    :class="['w-4 h-4', props.class]"
  />
</template>
