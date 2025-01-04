import type { Component } from 'vue'

export enum ExperienceLevel {
  ENTRY = 'Entry',
  MID = 'Mid',
  SENIOR = 'Senior',
  LEAD = 'Lead',
}

export enum JobType {
  FULL_TIME = 'Full Time',
  PART_TIME = 'Part Time',
  CONTRACT = 'Contract',
  INTERN = 'Internship',
  TEMPORARY = 'Temporary',
}

export interface JobPosting {
  id: number
  title: string
  company: string
  location: string
  jobType: JobType
  description: string
  datePosted: string
  experienceLevel: ExperienceLevel
  companyLogo: string
  salary: {
    min: number
    max: number
    currency: string
  }
  skills: string[]
  benefits: string[]
  featuredAt?: number
  relatedJobIds: number[]
}

export type NavigationLink = {
  name: string
  path: string
  component: () => Promise<Component>
}
