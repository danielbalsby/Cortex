# First Commit Checklist

Run these commands locally before the first push:

```bash
npm install
npm run check
```

`npm install` creates `package-lock.json`. Commit that file. The GitHub Actions
workflow uses `npm ci` and therefore requires the lockfile.

Then initialise and push:

```bash
git init
git add .
git commit -m "Initial Cortex platform import"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```
