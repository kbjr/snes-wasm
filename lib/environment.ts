
// @ts-ignore
const hasWindow: boolean = typeof window !== 'undefined';

// @ts-ignore
const hasProcess: boolean = typeof process !== 'undefined';

export const isNode: boolean = ! hasWindow && hasProcess;
export const isBrowser: boolean = hasWindow && ! hasProcess;
export const isWebWorker: boolean = ! hasWindow && ! hasProcess;

export const globalObject = isNode ? global : window;

export const hasPerformanceNow = 'performance' in globalObject && 'now' in performance;
