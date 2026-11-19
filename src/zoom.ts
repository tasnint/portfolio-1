// The site is laid out at a 1440 × 900 reference size. On smaller desktop and laptop screens
// we zoom the whole page out so the home page fits with no scrolling, and every other page
// shrinks by the same amount. Phones and narrow windows keep their stacked layout at full size.
const REFERENCE_WIDTH = 1440
const REFERENCE_HEIGHT = 900
const STACKED_BELOW = 1000
const MIN_ZOOM = 0.55

function zoomFor(width: number, height: number) {
  if (width < STACKED_BELOW) return 1
  const fit = Math.min(1, width / REFERENCE_WIDTH, height / REFERENCE_HEIGHT)
  return Math.max(MIN_ZOOM, fit)
}

export function applyZoom() {
  const zoom = zoomFor(window.innerWidth, window.innerHeight)
  document.documentElement.style.setProperty('--zoom', zoom.toFixed(3))
}

export function watchZoom() {
  applyZoom()
  window.addEventListener('resize', applyZoom)
}
