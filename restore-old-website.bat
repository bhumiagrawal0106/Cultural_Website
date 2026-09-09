@echo off
echo ===================================================
echo Bharat Darshan - Revert to Previous Website Version
echo ===================================================
echo.
echo This will restore your website to the exact state before these changes.
echo Backup branch: backup-stable
echo.
set /p CONFIRM="Are you sure you want to revert? (Y/N): "
if /i "%CONFIRM%" neq "Y" (
    echo Restoration cancelled.
    pause
    exit /b 0
)

echo.
echo [1/3] Fetching backup branch...
git checkout backup-stable

echo.
echo [2/3] Resetting current files to backup state...
git reset --hard backup-stable

echo.
echo [3/3] If you want to deploy this rollback to live GitHub/Vercel, run:
echo     git checkout -B main backup-stable
echo     git push origin main --force
echo.
echo Website successfully recovered to the backup state!
pause
