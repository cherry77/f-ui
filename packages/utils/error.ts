class DownUIError extends Error {
  constructor(m: string) {
    super(m)
    this.name = 'DownUIError'
  }
}

export function throwError(scope: string, m: string): never {
  throw new DownUIError(`[${scope}] ${m}`)
}
