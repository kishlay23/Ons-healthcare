export const logger = {
  info:  (msg: string, data?: unknown) => console.log(`[INFO]  ${new Date().toISOString()} ${msg}`, data ?? ''),
  error: (msg: string, err?: unknown)  => console.error(`[ERROR] ${new Date().toISOString()} ${msg}`, err ?? ''),
  warn:  (msg: string, data?: unknown) => console.warn(`[WARN]  ${new Date().toISOString()} ${msg}`, data ?? ''),
  debug: (msg: string, data?: unknown) => {
    if (process.env.NODE_ENV === 'development')
      console.debug(`[DEBUG] ${new Date().toISOString()} ${msg}`, data ?? '')
  },
}
