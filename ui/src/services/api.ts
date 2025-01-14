import type { JobPosting, PaginatedResponse } from '../types'
import { TokenBucket, createThrottledFunction } from '@/utils/throttle'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333'

const jobsBucket = new TokenBucket({
  tokensPerInterval: 5,
  interval: 1000,
  maxBurst: 10,
})

const wwrBucket = new TokenBucket({
  tokensPerInterval: 5,
  interval: 1000,
  maxBurst: 10,
})

const cryptoBucket = new TokenBucket({
  tokensPerInterval: 5,
  interval: 1000,
  maxBurst: 10,
})

const featuredBucket = new TokenBucket({
  tokensPerInterval: 5,
  interval: 1000,
  maxBurst: 20,
})

const baseApi = {
  async getJobs(page: number, limit: number): Promise<PaginatedResponse<JobPosting>> {
    const response = await fetch(`${API_URL}/jobs?page=${page}&limit=${limit}`)
    return response.json()
  },

  async getWWRJobs(page: number, limit: number): Promise<PaginatedResponse<JobPosting>> {
    const response = await fetch(`${API_URL}/remote-jobs/weworkremotely?page=${page}&limit=${limit}`)
    return response.json()
  },

  async getCryptoJobs(page: number, limit: number): Promise<PaginatedResponse<JobPosting>> {
    const response = await fetch(`${API_URL}/remote-jobs/crypto?page=${page}&limit=${limit}`)
    return response.json()
  },

  async getFeaturedJobs(page: number): Promise<PaginatedResponse<JobPosting>> {
    const response = await fetch(`${API_URL}/jobs/featured?page=${page}`)
    return response.json()
  }
}

export const apiService = {
  getJobs: createThrottledFunction(baseApi.getJobs, jobsBucket),
  getWWRJobs: createThrottledFunction(baseApi.getWWRJobs, wwrBucket),
  getCryptoJobs: createThrottledFunction(baseApi.getCryptoJobs, cryptoBucket),
  getFeaturedJobs: createThrottledFunction(baseApi.getFeaturedJobs, featuredBucket)
}
