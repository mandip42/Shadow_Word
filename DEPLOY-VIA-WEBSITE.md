# Deploy Shadow Word without using the terminal (Vercel website)

Use these steps so you never have to run Vercel in PowerShell.

---

## Step 1: Put your project on GitHub

### 1a. Create a GitHub account (if you don’t have one)
- Go to https://github.com and sign up.

### 1b. Create a new repository on GitHub
- Click **“New”** (or **“+”** → **“New repository”**).
- **Repository name:** `shadow-word` (or any name).
- Leave it **Public**.
- **Do not** add a README, .gitignore, or license (project already has files).
- Click **“Create repository”**.

### 1c. Push your project from your PC
Open **Command Prompt** (Win+R → type `cmd` → Enter) and run these **one at a time**:

```cmd
cd C:\Users\gomandip\Documents\Cursor_Project\Shadow_Word
git init
git add .
git commit -m "Initial commit - Shadow Word PWA"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

- Replace `YOUR_USERNAME` with your GitHub username.
- Replace `YOUR_REPO_NAME` with the repo name you used (e.g. `shadow-word`).
- When it asks for GitHub login, use your GitHub username and a **Personal Access Token** as the password (GitHub → Settings → Developer settings → Personal access tokens → Generate new token).

---

## Step 2: Deploy on Vercel (no CLI)

### 2a. Import the project
1. Go to **https://vercel.com** and log in.
2. Click **“Add New…”** → **“Project”**.
3. Under **“Import Git Repository”**, find your **shadow-word** repo (or the name you used).
4. Click **“Import”** next to it.

### 2b. Configure (usually auto-filled)
- **Framework Preset:** Next.js (should be detected).
- **Root Directory:** leave as **`.`** (project root).
- **Build Command:** `npm run build` (default).
- **Output Directory:** leave default.

Click **“Deploy”**.

### 2c. Wait for the build
- Vercel will build and deploy.
- When it’s done, you’ll see a link like **https://shadow-word-xxxxx.vercel.app**.
- That’s your live app.

---

## Step 3: Updates later

When you change the code:

1. Commit and push to GitHub (in Command Prompt or any terminal):
   ```cmd
   cd C:\Users\gomandip\Documents\Cursor_Project\Shadow_Word
   git add .
   git commit -m "Describe your change"
   git push
   ```
2. Vercel will automatically redeploy (if the repo is connected).

---

**Summary:** You only use the terminal for **Git** (init, add, commit, push). All deployment is done on the **Vercel website** by importing your GitHub repo. No Vercel CLI or Enter-key issues in PowerShell.
