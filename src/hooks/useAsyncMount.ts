import { useEffect } from 'react'

/**
 * Runs a memoized async function after mount or when it changes.
 * Defers execution to avoid synchronous setState within useEffect (react-hooks/set-state-in-effect).
 * Wrap the async function in useCallback with the correct dependencies before passing it here.
 */
export function useAsyncMount(effect: () => Promise<void | (() => void)>) {
  useEffect(() => {
    let cancelled = false
    let cleanup: void | (() => void)

    void Promise.resolve().then(async () => {
      if (cancelled) return
      cleanup = await effect()
    })

    return () => {
      cancelled = true
      if (typeof cleanup === 'function') cleanup()
    }
  }, [effect])
}
