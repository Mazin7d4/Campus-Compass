## 2025-05-18 - Native WebKit Search Clear Button Collisions
**Learning:** HTML search inputs (`type="search"`) display native browser clear buttons in WebKit browsers that collide with custom overlay clear buttons unless explicitly suppressed.
**Action:** Always apply `[&::-webkit-search-cancel-button]:appearance-none` to search inputs when adding a custom accessible clear button.
