# Course Website: Minimalist Schedule Renderer

## Overview

This is a minimalist, single-page course website template that dynamically generates a 15‑week schedule from a JSON file using JavaScript. It is designed to be fast, elegant, easy to maintain, and visually clear—with no reliance on build tools or heavy frameworks. It can be reused for any subject area.

## Philosophy

The site is built around the principles of simplicity and clarity:
- **Content-driven:** All schedule content lives in a single JSON file.
- **Minimal markup:** Only the essential HTML structure is included.
- **Good typography:** Uses the system-ui sans-serif stack for clarity and rhythm.
- **No bloat:** No React, Webpack, or build system—just HTML, CSS, and JS.
- **Editable:** Instructors can update schedule contents by editing `schedule.json`.

## File Structure

- `index.html` — Basic page structure and references to CSS/JS resources.
- `style.css` — Custom styles for layout, spacing, fonts, and visual tone.
- `script.js` — Loads and parses `schedule.json`, renders the schedule dynamically.
- `schedule.json` — Source of truth for week-by-week schedule content.
- `README.md` — This file.

## How It Works

1. When the page loads, `script.js` uses `fetch()` to retrieve `schedule.json`.
2. The script parses the JSON into JavaScript objects.
3. For each week, the script:
   - Displays the week number and date.
   - Displays up to four buttons for: Slides, Notes, Exercises, and Solutions.
   - Shows the list of topics on a line beneath the main row.
4. Each week is classified as:
   - **Past:** More than 7 days before today at 9am.
   - **Current:** Within a 7-day window starting at 9am on the scheduled date.
   - **Future:** Any date after today at 9am.
5. Rows are styled with opacity to visually indicate their temporal status.

## Styling Details

- **Theme:** Default Bootstrap 5.3.3 (via CDN).
- **Font:** Source Sans Pro (via Google Fonts).
- **Buttons:**
  - All buttons use `btn-outline-primary`; past and future weeks are styled with black borders via CSS.
  - Past/Future: `btn-outline-primary` (black, semi-transparent).
- **Icons:** Bootstrap Icons are used to indicate PDF (`bi-filetype-pdf`) or HTML (`bi-filetype-html`) formats.
- **Layout:** The table is centered and fixed-width (700px); topics appear beneath each week’s main row.

## Running Locally

> **Note:** Do **not** open the HTML file with `file://`—JavaScript will fail to fetch JSON due to browser security rules.

Instead, serve it via a local server:

```bash
cd path/to/site
python3 -m http.server
```

Then open your browser to:

```
http://localhost:8000
```

## Development Tips

- Use `Shift + Refresh` to force-reload CSS/JS.
- In DevTools, open the Network tab and check "Disable Cache" to prevent aggressive caching.
- Add a cache-busting query string to CSS/JS for reliability:

  ```html
  <script src="script.js?v=2"></script>
  ```

## Customizing the Schedule

Edit `schedule.json` directly. Each entry includes:
- `week`: integer.
- `date`: ISO format (`YYYY-MM-DD`).
- `slides`, `notes`, `exercises`, `solutions`: URLs (or `null`).
- `topics`: array of strings.

Omit or set materials to `null` if missing. The layout will adjust automatically.

## Credits / Dependencies

- [Bootstrap](https://getbootstrap.com) (Sandstone theme from Bootswatch)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [nodeca](https://github.com/nodeca/) (loaded via CDN)

This project intentionally avoids complex tooling and frameworks. It is built to last and be easily understood by instructors and editors.

## Editing Course Title and Summary

To change the course title or description at the top of the site:

1. Open `index.html`.
2. Look for the section marked:

   ```html
   <!-- BEGIN EDITABLE SECTION -->
   ...
   <!-- END EDITABLE SECTION -->
   ```

3. Inside this block, you can:
   - Change the course title (inside the `<h1>` tag).
   - Edit the summary paragraph text.
   - Add or remove buttons linking to your syllabus and course assignments (e.g., Assignment 1, Assignment 2, etc.).

   **Example button:**

   ```html
   <a class="btn btn-outline-primary btn-sm" role="button" href="files/syllabus.pdf">
     <i class="bi bi-filetype-pdf"></i> Syllabus
   </a>
   ```

These elements are not dynamic and must be edited manually, but they are clearly marked for ease of access.

## Editing Link Preview and Search Description

Customize how the course site appears in search results and link previews:

1. Open `index.html`.
2. Find the section in the `<head>` labeled:

   ```html
   <!-- This description helps with search engine visibility and link previews. -->
   ```

3. Update the `content` value to match your course.

**Example:**

```html
<meta name="description" content="Course website template. Includes weekly schedule, notes, exercises, and slides.">
```

## Adding a Favicon

To customize the tab icon (favicon) for your course site:

1. Replace `favicon.ico` in the root directory with your own icon.
2. The default icon is a simple blue square with a white mark.
3. The favicon is referenced in the `<head>` section as:

   ```html
   <link rel="icon" href="favicon.ico" type="image/x-icon">
   ```

You can generate a new icon using [favicon.io](https://favicon.io) or any image editor that exports `.ico` files.
