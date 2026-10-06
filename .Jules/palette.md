## 2026-10-06 - Search Input Clear Button Pattern
**Learning:** Custom clear buttons on standard search inputs require disabling native WebKit search cancel buttons (`[&::-webkit-search-cancel-button]:appearance-none`) to prevent duplicate clear buttons on WebKit browsers, alongside explicit focus states (`focus-visible:ring-2`) and ARIA labels (`aria-label="Clear search"`) for screen readers and keyboard users.
**Action:** Always apply `[&::-webkit-search-cancel-button]:appearance-none` on search inputs when introducing a custom clear button.
