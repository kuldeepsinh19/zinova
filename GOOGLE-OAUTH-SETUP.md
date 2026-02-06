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
   - Name: "Zinnova" (or any name)
   - Click "Create"

   c. **Enable Google+ API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

   d. **Create OAuth Credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: **Web application**
   - Name: "Zinnova Web Client"

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

FOR LATER :That’s an excellent goal. Transitioning from "just getting it to work" to "making it smart" is where you actually save money and get professional results on Vertex AI.

Since you have the Vertex AI trial, you have access to **Imagen 3** (for images) and **Veo** (for video). Here is a breakdown of the "smart" functions and terms you need to master for your project.

---

## 1. Smart Prompting Functions

Instead of manual trial and error, use these built-in API parameters to automate quality.

- **`enhancePrompt` (The "Smart" Prompt):**
  This is likely the "augmented prompt" you were looking for. When enabled (`True`), Google uses an LLM in the background to rewrite your simple prompt into a highly descriptive, cinematic one before the image is generated.
- **Pro Tip:** This saves you the trouble of learning complex art terms. You send "a futuristic car," and the API expands it to "A sleek, aerodynamic silver car with glowing cyan accents, driving through a neon-lit cyberpunk city, 8k resolution."

- **`negativePrompt`:**
  This tells the model what **not** to include. Using this is much more token-efficient than trying to describe "a field without trees." You simply put "trees, birds, sun" in the negative prompt field to ensure a clear, overcast sky.
- **`seed` (For Consistency):**
  In your code, if you find an image style you like, record its **Seed Number**. By passing that same seed back to the API with a slightly modified prompt, you can keep the same character or art style across different generations (essential for storytelling).

---

## 2. Key Image & Video Terms

To code "smartly," you need to understand these specific levers in the API:

### Image Generation (Imagen 3)

| Term                | What it does for your "Smart Code"                                                                                                                                          |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Aspect Ratio**    | Don't just crop images in CSS. Set `aspectRatio` (e.g., `16:9`, `9:16`) in the API call to ensure the model composes the scene correctly for the frame.                     |
| **Sample Count**    | You can request up to 4 images in one call. It's often cheaper/faster to get 4 at once than 1-by-1 if you're looking for the "perfect" shot.                                |
| **Safety Settings** | Use `safetySetting` to adjust how strict the filters are. "Block_None" is restricted, so stick to "Block_Medium" to avoid failed API calls that still cost "time" or quota. |

### Video Generation (Veo)

- **Cinematography Tags:** Veo understands professional film terms. Instead of saying "move the camera," use terms like **"Dolly In,"** **"Crane Shot,"** or **"Pan Left"** directly in your prompt.
- **Temporal Elements:** You can define the pace. Using **"Time-lapse"** or **"Slow-motion"** in the prompt changes how the model generates motion frames.

---

## 3. Image-to-Video Integration

This is the "pro" workflow for smart integration:

1. **Step 1:** Use **Imagen 3** with `enhancePrompt: True` to get a perfect starting frame.
2. **Step 2:** Pass that generated image's Base64 data as the `input_image` to **Veo**.
3. **The Result:** You get a video that looks exactly like your initial image, but moving. This is much more reliable than trying to describe a complex scene twice (once for image, once for video).

---

## 4. Cost & Token Optimization

- **Fast vs. High Quality:** In your API calls, look for model suffixes like `fast`. For example, `imagen-3.0-fast-generate-001` is cheaper and quicker than the standard version. Use "Fast" for prototyping and the standard model for the final "100% output."
- **Lower Media Resolution:** When testing your code, set the `media_resolution` to "low." Only toggle it to "high" for the final production run to save on processing credits.
  Big picture: how GenAI systems really work

---

Every AI API call (text → image, image → image, video, etc.) has 3 layers:

INPUT → THINKING → OUTPUT

You don’t control the model’s brain,
but you do control how it thinks using prompt engineering + structure.

Core concepts (in simple language)

I’ll explain the scary terms you mentioned without jargon.

1️⃣ Prompt vs Augmented Prompt
❌ Simple prompt (what beginners do)
Generate a modern sunscreen product image

Problems:

vague

inconsistent

wastes tokens (model guesses a lot)

✅ Augmented prompt (what pros do)

An augmented prompt =

prompt + context + constraints + examples

Example:

You are a professional commercial product photographer.

Product: Sunscreen bottle  
Brand style: premium, minimal, Indian skincare  
Lighting: soft golden daylight  
Background: warm beige gradient  
Camera: 85mm lens, shallow depth  
Output: realistic product photography, no text, no watermark

Same idea → far better output
Often less retries = cheaper

2️⃣ System prompt vs User prompt (VERY important)

In Vertex / Gemini APIs, prompts are not equal.

🧠 System prompt (rules of the AI)

Defines who the AI is

Rarely changes

Saves money long-term

Example:

You are an expert creative assistant specialized in commercial product visuals.
Follow instructions strictly.
Avoid extra creativity unless asked.

🧑 User prompt (task)

Changes every request:

Create a sunscreen bottle image with aloe and zinc particles floating

👉 Smart setup:

System prompt = long-lived rules

User prompt = short & specific

This is how you reduce tokens and increase consistency.

3️⃣ Structured prompting (most underrated skill)

Instead of one long paragraph, use sections.

Example:

OBJECTIVE:
Create a premium sunscreen product image

STYLE:
Minimal, luxury skincare, Indian brand

COMPOSITION:
Centered product, soft shadows, clean background

AVOID:
Text, logos, human hands, watermark

Why this works:

Models parse structure better

Fewer hallucinations

Better control

---

json"sampleCount": 1 // Generate 1-4 images (default: 4)
Aspect ratio optimization:
json"aspectRatio": "1:1" // or "9:16", "16:9", "3:4", "4:3"
Seed for deterministic results:
json"seed": 12345 // Same input = same output, no wasted regenerations
Negative prompts (exclude unwanted elements):
json"negativePrompt": "blurry, distorted"
