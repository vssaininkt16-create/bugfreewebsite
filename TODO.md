# Database Fix TODO

## Root Cause Analysis
- Inconsistent MongoDB environment variables: MONGODB_URI (used by lib/mongodb.js and test-db) vs MONGO_URL (used by test-mongo and catch-all API)
- Likely causes connection failures on live where only one env var is set

## Minimal Safe Fixes
- [ ] Standardize all MongoDB connections to use MONGODB_URI
- [ ] Update app/api/test-mongo/route.js
- [ ] Update app/api/[[...path]]/route.js
- [ ] Update error messages to reference MONGODB_URI
- [ ] Test connections locally

## Rollback Plan
- If issues arise, revert changes by changing MONGODB_URI back to MONGO_URL in the modified files
- Ensure production env vars are set correctly for MONGODB_URI
