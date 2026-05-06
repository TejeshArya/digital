# DomPDF Installation Guide

## Problem
PDF download is not working because `barryvdh/laravel-dompdf` package is not installed.

## Solution - Manual Installation Steps

### Step 1: Open Terminal/Command Prompt
Navigate to your project directory:
```bash
cd D:\DigitalNeww\digitalnew
```

### Step 2: Install Package
Run this command:
```bash
composer require barryvdh/laravel-dompdf
```

### Step 3: Refresh Autoload
```bash
composer dump-autoload
```

### Step 4: Clear Laravel Cache
```bash
php artisan config:clear
php artisan cache:clear
php artisan config:cache
```

### Step 5: (Optional) Publish Config
```bash
php artisan vendor:publish --provider="Barryvdh\DomPDF\ServiceProvider"
```

### Step 6: Test
Go to Salary Run page and click "PDF" export button. It should now download properly.

## Alternative: If Composer Fails

If `composer require` doesn't work, try:

1. **Check PHP Version**: DomPDF requires PHP 7.4+
   ```bash
   php -v
   ```

2. **Check Composer**: Make sure Composer is installed
   ```bash
   composer --version
   ```

3. **Manual Installation**:
   - Edit `composer.json` manually
   - Add this line in `require` section:
     ```json
     "barryvdh/laravel-dompdf": "^3.0"
     ```
   - Then run: `composer install`

## Troubleshooting

### Error: "Class not found"
- Run: `composer dump-autoload`
- Clear cache: `php artisan config:clear`

### Error: "Package not found"
- Check internet connection
- Try: `composer update`

### Still Not Working?
- Check if `vendor/barryvdh/laravel-dompdf` folder exists
- Check `composer.json` has the package listed
- Restart your web server

## Temporary Workaround

Until DomPDF is installed, you can:
1. Click PDF export button
2. When page opens, press **Ctrl+P** (Print)
3. Select **"Save as PDF"** as destination
4. Save the file

This will work but requires manual step each time.

