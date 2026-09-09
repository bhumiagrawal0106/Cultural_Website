# Website Recovery & Rollback Guide

If you ever want to revert back to the previous version of your website, you can do so immediately using any of the options below.

---

### Option 1: Automatic 1-Click Script (Windows)
Double-click `restore-old-website.bat` in the root folder, or run in PowerShell/Terminal:
```powershell
.\restore-old-website.bat
```

---

### Option 2: Using Git Commands Directly
To revert your local code back to the backup:
```bash
git checkout backup-stable
```
Or to reset your current branch to the exact backup state:
```bash
git reset --hard backup-stable
```

To push the rollback to live Vercel / GitHub:
```bash
git checkout -B main backup-stable
git push origin main --force
```

---

### Option 3: From Vercel Dashboard (Instant 10-Second Rollback)
1. Go to your **Vercel Project Dashboard**.
2. Click on the **Deployments** tab.
3. Locate any previous successful deployment (e.g. from earlier today).
4. Click the three dots `...` next to it and select **Instant Rollback**.
This immediately points your live domain back to the previous deployment without changing any code.

---

### Backup Points Available
- **Branch**: `origin/backup-stable` (pushed to your GitHub repository)
- **Tag**: `backup-v1` (marked on your commit history)
