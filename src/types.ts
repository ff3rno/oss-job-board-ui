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
  companyWebsite?: string
  companyDescription?: string
  jobDetails?: {
    responsibilities?: string[]
    requirements?: string[]
    whatWeOffer?: string[]
    applicationMethod?: string
  }
  tags?: string[]
  viewCount?: number
  applicationCount?: number
  applicationUrl?: string
}

export type NavigationLink = {
  name: string
  path: string
  component: () => Promise<Component>
}
