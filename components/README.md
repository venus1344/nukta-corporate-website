# Component System

This directory contains reusable components that are loaded dynamically into pages.

## Components

- **header.html** - Navigation header with desktop and mobile menus
- **footer.html** - Site footer with contact info and links

## How It Works

1. Components are loaded via `js/components.js`
2. Placeholders in HTML files are replaced with component content
3. Active page is automatically detected and highlighted

## Usage

### In HTML Files

Replace the header section with:
```html
<div id="header-placeholder"></div>
```

Replace the footer section with:
```html
<div id="footer-placeholder"></div>
```

Add the component loader script before other scripts:
```html
<script src="js/components.js"></script>
```

### Example

**Before:**
```html
<header class="header">
    <a href="index.html" class="logo">...</a>
    <nav class="nav">...</nav>
</header>
```

**After:**
```html
<div id="header-placeholder"></div>
```

## Active Page Detection

The component loader automatically detects the current page and sets the active class on the corresponding navigation link. It uses the `data-page` attribute to match pages:

- `index.html` → `data-page="index"`
- `about.html` → `data-page="about"`
- `projects.html` → `data-page="projects"`
- etc.

## Updating Components

To update the header or footer across all pages, simply edit:
- `components/header.html` for navigation changes
- `components/footer.html` for footer changes

Changes will automatically apply to all pages that use the component system.

