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

## Editing content

### The easy way: Pages CMS (in the browser, also on a phone)

1. Open **https://app.pagescms.org** and sign in with GitHub.
2. The first time, install the Pages CMS GitHub app for this repository when asked.
3. Pick this repository (and the branch, normally `master`).

You get a form-based editor for:

| Section in the editor | What it changes | Where it is stored |
|---|---|---|
| Homepage | Headline, text, banner photo, search description | `index.md` |
| Blog posts | Posts on /blog/ (title, date, tags, cover image, text) | `_posts/` |
| Photography | Gallery photos with caption and Instagram link | `_data/gallery.yml` + `assets/images/gallery/` |
| Resume | CV file, jobs (current role = no end date), education, skills, publications, certificates | `_data/resume.yml` + `assets/files/` |
| Projects | Project blocks | `_projects/` |
| Interests and Hobbies | Hobby blocks (+ Dota 2 account ID for live stats) | `_hobbies/` |
| Other Activities | Activity blocks, newest first | `_activities/` |
| About Me | Portrait and text | `about.md` |

Each **Save** is a commit to GitHub; the live site updates about a minute later.
Uploaded images are resized and get thumbnails automatically
(`.github/workflows/optimize-images.yml`), a moment after the upload.
The editor's configuration is `.pages.yml`.

### By hand (in VS Code)

All content is plain text files, so you can also edit them directly and preview with `make serve`.

- **Blog post:** create `_posts/2026-11-23-my-title.md`:
  ```yaml
  ---
  title: My title
  description: One sentence for the post list (optional)
  tags: [Embedded, Linux]
  image: /assets/images/my-cover.jpg   # optional
  ---
  The text, in Markdown.
  ```
- **Photo:** copy it to `assets/images/gallery/`, run `make images`, add it to `_data/gallery.yml`
  (`image`, `caption`, `instagram`, `alt`).
- **Project / hobby / activity:** add a `.md` file to `_projects/`, `_hobbies/` or `_activities/`
  (copy an existing one; fields: `title`, `image`, `image_alt`, `image_height`, `link`,
  `link_label`, `order` or `date`, then the text).
- **Resume:** edit `_data/resume.yml`. A job with an empty `end` is shown as your current role.
  Publications and certificates sections appear as soon as their lists have entries.
- **CV (PDF):** replace `assets/files/Sepehr-Samavati-CV.pdf` (currently a TEST placeholder) or set `cv_file`.
- **Homepage banner photo:** set `banner:` in `index.md` (e.g. `/assets/images/my-photo.jpg`).
- **Google Scholar link:** set `Google-Scholar:` under `socials` in `_config.yml`
  (adds the footer icon and the Resume button).
- **Dota 2 stats:** set `dota_account_id` in `_hobbies/games.md` (the number in your
  OpenDota or Dotabuff profile URL). "Expose Public Match Data" must be enabled in Dota 2's settings.

### A new page
Create a `.md` file in the root folder:

```yaml
---
title: Talks
permalink: /talks/
layout: page
image: /assets/images/some-image.jpg   # homepage tile image
nav-menu: true                         # show in the menu
nav_order: 8                           # position in menu and tiles
---
```

Ready-made layouts and components to copy from are in [`_templates/`](_templates/).

## Search engines, link previews, icons

- Titles, descriptions and link previews (Open Graph / X cards) come from `jekyll-seo-tag`:
  each page's `description:` and `image:`, plus the settings under "Search engines" in `_config.yml`.
- `/sitemap.xml` is generated automatically; `robots.txt` points search engines to it.
- The blog has a feed at `/blog/feed.xml`.
- Browser/phone icons: `favicon.ico` and `assets/icons/` (replace the files to change the icon).

## Project structure

| Path | Contents |
|------|----------|
| `about.md`, `resume.md`, `photography.md`, `projects.md`, `hobbies.md`, `activities.md`, `blog.md` | The pages (mostly templates; content comes from the folders below) |
| `_posts/`, `_projects/`, `_hobbies/`, `_activities/` | One Markdown file per post / project / hobby / activity |
| `_data/resume.yml`, `_data/gallery.yml` | Resume and photo gallery content |
| `_config.yml` | Site title, email, social links, collections, page defaults |
| `.pages.yml` | Pages CMS editor configuration |
| `_layouts/`, `_includes/` | Page templates (header, footer, gallery, spotlights, …) |
| `_sass/`, `assets/css/main.scss` | Styles (`_jobs` = resume, `_gallery`, `_blog`, `_dota`, …) |
| `assets/js/` | Theme scripts plus `gallery.js` (photo viewer), `blog.js` (tag filter), `dota.js` (Dota 2 stats) |
| `assets/vendor/fontawesome/` | Font Awesome 6 icons |
| `_templates/` | Theme demo pages, not published |
| `scripts/optimize_images.py` | Image optimizer (`make images` and the GitHub workflow) |

## Credits and licenses

- Design: **Forty** by [HTML5 UP](https://html5up.net), licensed under
  [CC BY 3.0](LICENSE-THEME.md). It has been modified for this site (Internet Explorer support removed,
  Font Awesome 6, resume and gallery components, other changes).
- Jekyll port of the theme by [Andrew Banchich](https://github.com/andrewbanchich/forty-jekyll-theme) (MIT).
- Icons: [Font Awesome Free](https://fontawesome.com) (icons CC BY 4.0, fonts SIL OFL 1.1, code MIT).
- **Content and photographs © Sepehr Samavati. All rights reserved.**
