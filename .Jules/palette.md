# Palette's UX & Accessibility Journal

## 2025-02-18 - Custom Search Clear Buttons and WebKit Native Controls
**Learning:** Search inputs using `type="search"` in WebKit browsers render a native clear button. When adding custom accessible clear buttons with ARIA labels, `[&::-webkit-search-cancel-button]:appearance-none` must be applied to prevent duplicate clear icons on WebKit browsers.
**Action:** Always combine custom search clear buttons with `[&::-webkit-search-cancel-button]:appearance-none` and right-padding (`pr-10`) on `type="search"` inputs.
