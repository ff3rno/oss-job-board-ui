<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/shared/BaseButton.vue'
import type { JobPosting } from '@/types'
import JobDetailsCard from '@/components/JobDetailsCard.vue'
import { JobType, ExperienceLevel } from '@/types'
import BaseIcon, {
  type IconName,
} from '@/components/shared/BaseIcon/BaseIcon.vue'
import BaseBadge from '@/components/shared/BaseBadge.vue'
import BaseSelect from '@/components/shared/BaseSelect.vue'
import BaseInput from '@/components/shared/BaseInput.vue'

const router = useRouter()

const formData = ref<JobPosting>({
  id: 0,
  datePosted: Date.now().toString(),
  companyLogo: '',
  title: '',
  company: '',
  location: '',
  jobType: JobType.FULL_TIME,
  description: '',
  salary: {
    min: 0,
    max: 0,
    currency: 'USD',
  },
  experienceLevel: ExperienceLevel.ENTRY,
  skills: [],
  benefits: [],
  featuredAt: undefined,
  relatedJobIds: [],
})

const newSkill = ref('')
const newBenefit = ref('')

const previewJob = computed<JobPosting>(() => ({
  id: Date.now(),
  title: formData.value.title || '',
  company: formData.value.company || '',
  location: formData.value.location || '',
  jobType: formData.value.jobType || JobType.FULL_TIME,
  description: formData.value.description || '',
  datePosted: new Date().toISOString().split('T')[0],
  companyLogo: '',
  experienceLevel: formData.value.experienceLevel || ExperienceLevel.ENTRY,
  salary: {
    min: +(formData.value.salary?.min || 0),
    max: +(formData.value.salary?.max || 0),
    currency: formData.value.salary?.currency || 'USD',
  },
  skills: formData.value.skills || [],
  benefits: formData.value.benefits || [],
  relatedJobIds: [],
}))

const addSkill = () => {
  if (newSkill.value && !formData.value.skills?.includes(newSkill.value)) {
    formData.value.skills = [...(formData.value.skills || []), newSkill.value]
    newSkill.value = ''
  }
}

const removeSkill = (skill: string) => {
  formData.value.skills = formData.value.skills?.filter((s) => s !== skill)
}

const addBenefit = () => {
  if (
    newBenefit.value &&
    !formData.value.benefits?.includes(newBenefit.value)
  ) {
    formData.value.benefits = [
      ...(formData.value.benefits || []),
      newBenefit.value,
    ]
    newBenefit.value = ''
  }
}

const removeBenefit = (benefit: string) => {
  formData.value.benefits = formData.value.benefits?.filter(
    (b) => b !== benefit,
  )
}

const handleSubmit = () => {
  router.push({
    name: 'home',
    params: { newJob: JSON.stringify(previewJob.value) },
  })
}

const handleBack = () => {
  router.push('/')
}

const isPreviewComplete = computed(() => {
  const requiredFields = ['title', 'company', 'location', 'description']
  return requiredFields.every(
    (field) => !!formData.value[field as keyof JobPosting],
  )
})

const jobType = computed({
  get: () => (formData.value.jobType || JobType.FULL_TIME) as string,
  set: (value: string) => {
    formData.value.jobType = value as JobType
  },
})

const experienceLevel = computed({
  get: () =>
    (formData.value.experienceLevel || ExperienceLevel.ENTRY) as string,
  set: (value: string) => {
    formData.value.experienceLevel = value as ExperienceLevel
  },
})

const jobTypeOptions = computed(() =>
  Object.values(JobType).map((type) => ({
    value: type as string,
    label: type,
  })),
)

const experienceLevelOptions = computed(() =>
  Object.values(ExperienceLevel).map((level) => ({
    value: level as string,
    label: level,
  })),
)

const currency = computed({
  get: () => formData.value.salary?.currency || 'USD',
  set: (value: string) => {
    if (formData.value.salary) {
      formData.value.salary.currency = value
    }
  },
})

const currencyOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
]
</script>

<template>
  <div class="py-8">
    <div class="mb-6">
      <BaseButton
        variant="outline"
        icon="arrow-left"
        @click="handleBack"
      >
        Back to Jobs
      </BaseButton>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Post a New Job
          </h1>
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Job Title
                  </label>
                  <BaseInput
                    v-model="formData.title"
                    type="text"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 bg-white"
                  />
                </div>

                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Company
                  </label>
                  <BaseInput
                    v-model="formData.company"
                    type="text"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 bg-white"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Location
                  </label>
                  <BaseInput
                    v-model="formData.location"
                    type="text"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 bg-white"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <BaseSelect
                    v-model="jobType"
                    :options="jobTypeOptions"
                    label="Job Type"
                  />

                  <BaseSelect
                    v-model="experienceLevel"
                    :options="experienceLevelOptions"
                    label="Experience Level"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <BaseSelect
                  v-model="currency"
                  :options="currencyOptions"
                  label="Currency"
                />
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Min Salary
                  </label>
                  <BaseInput
                    v-model.number="formData.salary!.min"
                    type="number"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 bg-white"
                  />
                </div>
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Max Salary
                  </label>
                  <BaseInput
                    v-model.number="formData.salary!.max"
                    type="number"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 bg-white"
                  />
                </div>
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Description
                </label>
                <BaseInput
                  v-model="formData.description"
                  type="textarea"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 bg-white"
                  :rows="3"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Skills
                  </label>
                  <div class="flex gap-2">
                    <BaseInput
                      v-model="newSkill"
                      type="text"
                      placeholder="Add a skill"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 bg-white"
                      @keyup.enter="addSkill"
                    />
                    <BaseButton
                      type="button"
                      @click="addSkill"
                    >
                      Add
                    </BaseButton>
                  </div>
                  <div class="flex flex-wrap gap-2 mt-2">
                    <BaseBadge
                      v-for="skill in formData.skills"
                      :key="skill"
                      variant="pill"
                      class="cursor-pointer"
                      @click="removeSkill(skill)"
                    >
                      {{ skill }}
                      <BaseIcon
                        :name="'x' as IconName"
                        class="ml-1 w-4 h-4"
                      />
                    </BaseBadge>
                  </div>
                </div>

                <div>
                  <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Benefits
                  </label>
                  <div class="flex gap-2">
                    <BaseInput
                      v-model="newBenefit"
                      type="text"
                      placeholder="Add a benefit"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 bg-white"
                      @keyup.enter="addBenefit"
                    />
                    <BaseButton
                      type="button"
                      @click="addBenefit"
                    >
                      Add
                    </BaseButton>
                  </div>
                  <div class="flex flex-wrap gap-2 mt-2">
                    <BaseBadge
                      v-for="benefit in formData.benefits"
                      :key="benefit"
                      variant="pill"
                      class="cursor-pointer"
                      @click="removeBenefit(benefit)"
                    >
                      {{ benefit }}
                      <BaseIcon
                        :name="'x' as IconName"
                        class="ml-1 w-4 h-4"
                      />
                    </BaseBadge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:sticky lg:top-4">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Preview
          </h2>
          <div class="rounded-lg">
            <JobDetailsCard
              v-if="isPreviewComplete"
              :job="previewJob"
            />
            <div
              v-else
              class="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 p-8 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700"
            >
              <BaseIcon
                name="preview"
                class="w-5 h-5"
              />
              <span>
                Complete the required fields to see your job posting preview
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <BaseButton
          type="submit"
          variant="primary"
          size="lg"
        >
          Post Job
        </BaseButton>
      </div>
    </form>
  </div>
</template>
