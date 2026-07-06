# Cursor handoff: Campus Compass App Store release

## Summary
The app build is already in a good local state. The last verified steps were:
- `npm run build` passed
- `npx cap sync ios` passed
- Xcode archive succeeded

The remaining work is in Apple App Store Connect and Xcode signing/upload flow. The main issue is that the App Store Connect app record must exist before upload, and the current Xcode organizer state shows multiple archives, which can cause confusion and failed uploads.

## Current blockers
1. App Store Connect app record is not yet created/visible for the expected bundle ID.
2. Xcode Organizer currently shows more than one archive, so the wrong build may be selected or uploaded.
3. We must avoid noisy/failed Apple upload attempts that trigger boss-facing failure emails.

## Required app details
Use these values when creating the App Store Connect app record:
- App name: Campus Compass
- Platform: iOS
- Bundle ID: com.Arash.CampusCompass
- SKU: campus-compass-ios
- Primary language: English
- Price: Free
- Category: Navigation or Education
- Age rating: 4+

## Required URLs
Use these live URLs:
- Support: https://mazin7d4.github.io/Campus-Compass/support.html
- Privacy Policy: https://mazin7d4.github.io/Campus-Compass/privacy.html

## Important review note
The app is an independent campus navigation guide and is not affiliated with or endorsed by California State University or any CSU campus.

## Important app privacy note
If there is no analytics, account system, server collection, or tracking in the app, the privacy answer should be:
- No, we do not collect data from this app

## What to do next
1. Create the App Store Connect app record first using the bundle ID above.
2. Confirm the bundle ID is visible in App Store Connect before uploading anything.
3. In Xcode, inspect the latest archive and make sure it matches the intended version/build.
4. If there are duplicate archives or a prior failed build, do not upload blindly. Increment the build number and use the latest clean archive.
5. Upload the correct archive from Xcode to App Store Connect.
6. After processing, fill in the required metadata, screenshots, review note, and submit for review.

## Constraints
- Do not push directly to the App Store from the repo. The Apple UI steps must be completed in App Store Connect/Xcode.
- Do not create unnecessary commits or unrelated changes.
- Do not introduce lockfile churn unless a real dependency change is made.
- Keep the release process quiet and controlled to avoid boss-facing failure emails.

## Suggested working approach
- Fix the Apple-side setup first.
- Verify the app record exists and the bundle ID matches.
- Then perform one clean archive/upload flow.
- Only submit for review once the metadata and privacy details are complete.
