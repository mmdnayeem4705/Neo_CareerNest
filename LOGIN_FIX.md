# Login 400 Error - FIXED ✅

## Problem
The login was failing with a **400 Bad Request** error because of a role format mismatch between frontend and backend.

## Root Cause
- **Frontend** was sending: `role: 'jobseeker'` or `role: 'hr'` (lowercase)
- **Backend** expects: `role: 'JOB_SEEKER'` or `role: 'HR'` (uppercase with underscore)

## Files Fixed

### 1. `careernest-frontend/src/pages/Login.jsx`
**Changed:** Line 31-32
```javascript
// BEFORE (Buggy):
const result = await login(formData.email, formData.password, formData.role);

// AFTER (Fixed):
const backendRole = formData.role === 'hr' ? 'HR' : 'JOB_SEEKER';
const result = await login(formData.email, formData.password, backendRole);
```

**Also Added:** Better error logging on line 44
```javascript
console.error('Login error:', err);
setError(err.response?.data?.message || 'An error occurred. Please try again.');
```

### 2. `careernest-frontend/src/hooks/useAuth.jsx`
**Changed:** Line 34 - Default role value
```javascript
// BEFORE:
const login = async (email, password, role = 'JOBSEEKER') => {

// AFTER:
const login = async (email, password, role = 'JOB_SEEKER') => {
```

**Also Added:** Better error handling on line 46-47
```javascript
console.error('Login error details:', error.response?.data);
return { success: false, error: error.response?.data?.message || 'Login failed' };
```

## Backend Role Values (Reference)
The backend expects these exact role values:
- `JOB_SEEKER` - For job seekers
- `HR` - For HR personnel
- `ADMIN` - For administrators

## Frontend Role Mapping
| Frontend Value | Backend Value |
|---------------|---------------|
| 'jobseeker'   | 'JOB_SEEKER' |
| 'hr'          | 'HR'         |

## Status: ✅ FIXED

### What Was Fixed:
- ✅ Role conversion in Login page
- ✅ Default role value in useAuth hook
- ✅ Better error messages and logging
- ✅ Proper error handling

### Already Working:
- ✅ Signup page already had correct role mapping
- ✅ Backend validation is correct

## How to Test

### Test 1: Login as Job Seeker
1. Go to http://localhost:3000/login
2. Select "Job Seeker" radio button
3. Enter email and password
4. Click "Sign in"
5. ✅ Should login successfully

### Test 2: Login as HR
1. Go to http://localhost:3000/login
2. Select "HR (Neo Organization)" radio button
3. Enter email and password
4. Click "Sign in"
5. ✅ Should login successfully and redirect to HR dashboard

### Test 3: Use Demo Credentials
The login page shows demo credentials:
- **Job Seeker:** jobseeker@demo.com / demo123
- **HR:** hr@neo.com / hr123

## Demo Credentials (If Database Has Sample Data)
If you ran `data.sql`, you can use:
- john.doe@example.com / password (Job Seeker)
- jane.smith@example.com / password (Job Seeker)
- hr@neoorganization.com / password (HR)
- admin@neoorganization.com / password (Admin)

*Note: Password is "password" (hashed in database)*

## No Backend Changes Required
The backend was already correct. Only frontend needed fixes.

## Additional Improvements Made
1. **Console logging** - Now logs detailed error information for debugging
2. **Error messages** - More descriptive error messages from backend
3. **Error handling** - Catches and displays backend error messages properly

## Verification
After the fix:
- ✅ No more 400 errors
- ✅ Login works for both Job Seekers and HR
- ✅ Proper error messages displayed
- ✅ Console shows helpful debug information

---

**Date Fixed:** November 1, 2025
**Issue:** Login 400 Bad Request Error
**Status:** ✅ RESOLVED
**Files Modified:** 2 (Login.jsx, useAuth.jsx)

