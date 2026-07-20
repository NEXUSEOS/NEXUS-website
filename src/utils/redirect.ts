/** Navigate to an external URL without mutating window.location (react-hooks/immutability). */
export function redirectToExternalUrl(url: string) {
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.rel = 'noopener noreferrer'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
}
