# sepehrsamavati.com

Source of my personal website: [sepehrsamavati.com](https://sepehrsamavati.com).

A [Jekyll](https://jekyllrb.com/) site, deployed automatically by **GitHub Pages**
whenever `master` is pushed (Settings → Pages → *Deploy from a branch*: `master` / root).

## Run it locally

One-time setup (Ubuntu/Debian):

```sh
sudo apt install ruby-dev libssl-dev build-essential python3-pil
make setup        # installs the gems into vendor/bundle (same versions GitHub Pages uses)
```

Then, whenever you want to preview:

```sh
make serve        # http://localhost:4000, the browser reloads when you save a file
```

| Command | What it does |
|---------|--------------|
| `make serve` | Local preview with live reload |
| `make serve HOST=0.0.0.0` | Same, reachable from your phone on the same Wi-Fi (`http://<your-pc-ip>:4000`) |
| `make images` | Resize/strip metadata of new images, create gallery thumbnails |
| `make build` | Build the production site into `_site/` |
| `make doctor` | Check that everything needed is installed |
| `make clean` | Delete build output and caches |

A build check runs on GitHub for every push and pull request
(`.github/workflows/build-check.yml`), so a broken build shows up before it is merged.

## Adding content

### A photo to the Photography page
1. Copy the photo into `assets/images/gallery/`.
2. Run `make images` (resizes it to max 2000 px, removes camera metadata, makes a thumbnail).
3. Add an entry to `_data/gallery.yml`:
   ```yaml
   - image: my-photo.jpg
     alt: Short description of the photo
     caption: Optional caption shown in the full-screen view
     link: https://www.instagram.com/p/...   # optional
   ```

### A new page
Create a `.md` file in the root folder, e.g. `G-Talks.md`:

```yaml
---
title: Talks
permalink: /talks/
layout: page
image: assets/images/some-image.jpg   # used for the homepage tile
nav-menu: true                        # show in the menu
---
```

Pages appear in the menu and as homepage tiles in file-name order (hence the `A-`, `B-`… prefixes).
Ready-made layouts and components to copy from are in [`_templates/`](_templates/).

### Other images
Put them in `assets/images/` and run `make images`.

## Project structure

| Path | Contents |
|------|----------|
| `A-…md` … `F-…md` | The site's pages |
| `_config.yml` | Site title, email, social links, homepage tile settings |
| `_data/gallery.yml` | Photos shown on the Photography page |
| `_layouts/`, `_includes/` | Page templates (header, footer, gallery, …) |
| `_sass/`, `assets/css/main.scss` | Styles (`_sass/components/_jobs.scss` = resume, `_gallery.scss` = gallery) |
| `assets/js/` | Theme scripts and `gallery.js` (full-screen photo viewer) |
| `assets/vendor/fontawesome/` | Font Awesome 6 icons |
| `_templates/` | Theme demo pages, not published |
| `scripts/optimize_images.py` | Image optimizer used by `make images` |

## Credits and licenses

- Design: **Forty** by [HTML5 UP](https://html5up.net), licensed under
  [CC BY 3.0](LICENSE-THEME.md). It has been modified for this site (Internet Explorer support removed,
  Font Awesome 6, resume and gallery components, other changes).
- Jekyll port of the theme by [Andrew Banchich](https://github.com/andrewbanchich/forty-jekyll-theme) (MIT).
- Icons: [Font Awesome Free](https://fontawesome.com) (icons CC BY 4.0, fonts SIL OFL 1.1, code MIT).
- **Content and photographs © Sepehr Samavati. All rights reserved.**
