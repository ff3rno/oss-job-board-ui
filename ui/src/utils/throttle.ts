export type ThrottleConfig = {
  tokensPerInterval: number
  interval: number // in milliseconds
  maxBurst?: number
}

export class TokenBucket {
  private tokens: number
  private lastRefill: number
  private readonly tokensPerInterval: number
  private readonly interval: number
  private readonly maxTokens: number

  constructor(config: ThrottleConfig) {
    this.tokens = config.maxBurst || config.tokensPerInterval
    this.lastRefill = Date.now()
    this.tokensPerInterval = config.tokensPerInterval
    this.interval = config.interval
    this.maxTokens = config.maxBurst || config.tokensPerInterval
  }

  async getToken(): Promise<void> {
    await this.refillTokens()

    if (this.tokens < 1) {
      const timeToWait = this.calculateTimeToWait()
      await new Promise(resolve => setTimeout(resolve, timeToWait))
      await this.refillTokens()
    }

    this.tokens -= 1
  }

  private async refillTokens(): Promise<void> {
    const now = Date.now()
    const timePassed = now - this.lastRefill
    const tokensToAdd = (timePassed / this.interval) * this.tokensPerInterval

    this.tokens = Math.min(this.maxTokens, this.tokens + tokensToAdd)
    this.lastRefill = now
  }

  private calculateTimeToWait(): number {
    const tokensNeeded = 1 - this.tokens
    return (tokensNeeded / this.tokensPerInterval) * this.interval
  }
}

export const createThrottledFunction = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  bucket: TokenBucket
): T => {
  return (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    await bucket.getToken()
    return fn(...args)
  }) as T
}
