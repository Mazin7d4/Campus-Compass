## 2025-05-18 - Custom Search Clear Buttons in React
**Learning:** Default browser WebKit search clear buttons can conflict with React state management and lack consistent accessibility or keyboard focus styling across browsers.
**Action:** Always suppress the native WebKit search cancel button with `[&::-webkit-search-cancel-button]:appearance-none` when providing an explicit, accessible clear button (`aria-label="Clear search"`, `focus-visible:ring-2`) on `type="search"` inputs.
