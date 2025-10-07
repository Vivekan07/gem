@echo off
echo.
echo ========================================
echo   Rishwi Gems Gallery - Image Organizer
echo ========================================
echo.
echo This script helps organize your jewelry product images
echo.
echo Instructions:
echo 1. Place all your product images in a folder called "new_products"
echo 2. Run this script to copy them to the public folder with organized names
echo 3. The script will show you the path to use in the admin panel
echo.
pause

if not exist "new_products" (
    echo.
    echo ERROR: Please create a "new_products" folder and add your images there
    echo.
    pause
    exit /b
)

if not exist "public" (
    echo.
    echo ERROR: Public folder not found. Are you in the right directory?
    echo.
    pause
    exit /b
)

echo.
echo Copying images from new_products to public folder...
echo.

set /a count=0
for %%f in (new_products\*.jpg new_products\*.jpeg new_products\*.png) do (
    set /a count+=1
    echo Copying: %%~nxf
    copy "%%f" "public\%%~nxf" >nul
    echo   → Use this path in admin panel: /%%~nxf
    echo.
)

echo.
echo ========================================
echo   Completed! Copied %count% images
echo ========================================
echo.
echo Next steps:
echo 1. Start your application: npm run dev
echo 2. Login as admin: admin@rishvigems.com / admin123
echo 3. Add new products using the paths shown above
echo.
pause