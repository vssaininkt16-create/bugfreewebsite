# Database Fix TODO

## Root Cause Analysis
- Inconsistent MongoDB environment variables: MONGODB_URI (used by lib/mongodb.js and test-db) vs MONGO_URL (used by test-mongo and catch-all API)
- Likely causes connection failures on live where only one env var is set

## Minimal Safe Fixes
- [x] Standardize all MongoDB connections to use MONGODB_URI
- [x] Update app/api/test-mongo/route.js
- [x] Update app/api/[[...path]]/route.js
- [x] Update error messages to reference MONGODB_URI
- [x] Test connections locally (dev server started, changes applied)

## Rollback Plan
- If issues arise, revert changes by changing MONGODB_URI back to MONGO_URL in the modified files
- Ensure production env vars are set correctly for MONGODB_URI
