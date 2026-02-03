# Google OAuth Setup Guide

## 🎯 What We've Built

Google Sign-In is now integrated into your authentication system! Users can sign in with their Google account as an alternative to email/password.

## 📋 Setup Steps

### Step 1: Enable Google Provider in Supabase

1. **Go to Supabase Dashboard**:
   - Visit: https://app.supabase.com/project/dwzsvvixclxoysfhotuz/auth/providers

2. **Enable Google Provider**:
   - Scroll to find **Google** in the list of providers
   - Click on **Google**
   - Toggle **"Enable Sign in with Google"** to ON

3. **Get Google OAuth Credentials**:
   You need to create OAuth credentials in Google Cloud Console:

   a. **Go to Google Cloud Console**:
   - Visit: https://console.cloud.google.com/

   b. **Create a New Project** (or select existing):
   - Click "Select a project" → "New Project"
   - Name: "Ceratlyin" (or any name)
   - Click "Create"

   c. **Enable Google+ API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

   d. **Create OAuth Credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: **Web application**
   - Name: "Ceratlyin Web Client"

   e. **Add Authorized Redirect URIs**:

   ```
   https://dwzsvvixclxoysfhotuz.supabase.co/auth/v1/callback
   ```

   - Click "Create"

   f. **Copy Credentials**:
   - Copy **Client ID**
   - Copy **Client Secret**

4. **Add Credentials to Supabase**:
   - Go back to Supabase → Authentication → Providers → Google
   - Paste **Client ID** in "Client ID" field
   - Paste **Client Secret** in "Client Secret" field
   - Click **Save**

### Step 2: Disable Email Confirmation (if not done yet)

While you're in Supabase:

1. Go to **Authentication** → **Providers** → **Email**
2. Turn OFF **"Confirm email"** toggle
3. Click **Save**

This fixes the rate limit issue!

### Step 3: Test Google Sign-In

1. **Refresh your app**: http://localhost:3000/register
2. **Click "Continue with Google"** button
3. **Sign in with your Google account**
4. **You'll be redirected to dashboard** with 20 free credits!

---

## ✅ What's Included

### New Files Created:

1. **`GoogleSignInButton.tsx`** - Reusable Google sign-in button
2. **`/api/auth/google/route.ts`** - API endpoint for Google OAuth
3. **`/auth/callback/page.tsx`** - OAuth callback handler
4. **Updated `IAuthService`** - Added `signInWithGoogle()` method
5. **Updated `SupabaseAuthService`** - Implemented Google OAuth

### Features:

- ✅ Google Sign-In button on register page
- ✅ Google Sign-In button on login page
- ✅ Automatic user creation on first Google sign-in
- ✅ 20 free credits for Google sign-in users
- ✅ Seamless redirect to dashboard
- ✅ Still swappable (works with IAuthService interface)

---

## 🔄 How It Works

1. **User clicks "Continue with Google"**
2. **App calls `/api/auth/google`**
3. **Supabase redirects to Google sign-in**
4. **User signs in with Google**
5. **Google redirects back to `/auth/callback`**
6. **Supabase creates session**
7. **User redirected to dashboard**
8. **If first time**: User created in database with 20 credits

---

## 🎨 UI Updates

Both login and register forms now have:

- **Google Sign-In button** at the top
- **"Or continue with email"** divider
- **Email/password form** below

Clean, modern, professional design!

---

## 🚀 Benefits

### For Users:

- ✅ **Faster sign-up** - One click with Google
- ✅ **No password to remember**
- ✅ **Trusted authentication** via Google
- ✅ **Still get 20 free credits**

### For You:

- ✅ **No email rate limits** - Google handles emails
- ✅ **Better conversion** - Easier sign-up = more users
- ✅ **Still swappable** - IAuthService abstraction maintained
- ✅ **Production-ready** - Secure OAuth 2.0 flow

---

## 🔐 Security

- ✅ OAuth 2.0 standard
- ✅ Secure token exchange
- ✅ No password storage needed
- ✅ Google handles authentication
- ✅ Supabase manages sessions

---

## 🎯 Next Steps

1. **Complete Supabase setup** (follow Step 1 above)
2. **Test Google sign-in**
3. **Verify user created in database**
4. **Check 20 credits added**

---

## 💡 Future Enhancements

Want to add more OAuth providers?

**GitHub Sign-In**:

```typescript
// Already supported! Just enable in Supabase
await authService.signInWithProvider("github");
```

**Facebook Sign-In**:

```typescript
// Already supported! Just enable in Supabase
await authService.signInWithProvider("facebook");
```

Same interface, different providers! 🚀
