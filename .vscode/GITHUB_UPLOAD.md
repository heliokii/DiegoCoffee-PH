# Upload to GitHub (small repo, no node_modules in history)

Your current Git **history** still contains the old commit with `node_modules`, so the repo stays large when you push. Use one of these:

---

## Option A: Fresh repo, one clean commit (recommended)

This gives you a new history with only source code (no node_modules ever).

### 1. Create a new empty repo on GitHub

- Go to https://github.com/new
- Name it (e.g. `DiegoCoffeePH`)
- **Do not** add README, .gitignore, or license
- Create repository → copy the repo URL

### 2. In PowerShell, from your project folder

```powershell
cd C:\Users\Elijah\OneDrive\Desktop\DiegoCoffeePH
```

**If this is a brand-new GitHub repo (no pushes yet):**

```powershell
# Delete old Git history (keeps your files)
Remove-Item -Recurse -Force .git

# Start fresh
git init
git add .
git status
git commit -m "Initial commit: Diego Coffee & Cocktail Studio"

# Add your GitHub repo (replace with your URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push
git branch -M main
git push -u origin main
```

**If you already pushed the big repo to GitHub:**

```powershell
# Delete old history
Remove-Item -Recurse -Force .git

git init
git add .
git commit -m "Initial commit: Diego Coffee & Cocktail Studio"

# Use the SAME remote URL as before
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main

# Overwrite GitHub with this clean history
git push -u origin main --force
```

---

## Option B: Keep existing repo, just push

If the remote is empty and you’re okay trying a normal push first:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

If GitHub says the push is too large, use **Option A** (fresh history).

---

## After pushing

- Anyone who clones runs `yarn install` in `backend` and `frontend` to get `node_modules`.
- Never commit `backend/.env` (secrets); use a `.env.example` with fake values if you want to document required variables.
