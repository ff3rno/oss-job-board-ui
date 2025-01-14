<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from '@/components/shared/BaseInput.vue'
import BaseButton from '@/components/shared/BaseButton.vue'

const email = ref('')
const isSubmitting = ref(false)
const message = ref('')

const handleSubmit = async () => {
  if (!email.value) return

  try {
    isSubmitting.value = true
    // TODO: Implement newsletter signup API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    message.value = 'Thanks for subscribing! Please check your email to confirm.'
    email.value = ''
  } catch (error) {
    message.value = 'Something went wrong. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="rounded-2xl bg-primary-50 dark:bg-primary-900/10 px-6 py-16 sm:px-12 sm:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Stay Updated with New Opportunities
      </h2>
      <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
        Get the latest remote tech jobs delivered to your inbox weekly
      </p>

      <form @submit.prevent="handleSubmit" class="mt-10">
        <div class="flex flex-col gap-4 sm:flex-row">
          <BaseInput
            v-model="email"
            type="email"
            placeholder="Enter your email"
            required
            class="flex-1"
            :disabled="isSubmitting"
          />
          <BaseButton
            type="submit"
            :loading="isSubmitting"
          >
            Subscribe
          </BaseButton>
        </div>
        <p
          v-if="message"
          :class="[
            'mt-3 text-sm',
            message.includes('error') ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
          ]"
        >
          {{ message }}
        </p>
      </form>

      <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">
        We care about your data. Read our
        <a href="#" class="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300">Privacy Policy</a>
      </p>
    </div>
  </section>
</template>
