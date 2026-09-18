# Md Faizul Amin — personal site

Three pages, plain HTML/CSS/JS, no build step, ready for GitHub Pages.

```
index.html          Home — intro + About Me
research.html        Research — clickable list, opens into a full write-up
blog.html            Blog — same pattern as Research, starts empty
assets/css/style.css  All colors, fonts, spacing — shared by every page
assets/js/main.js     Mobile nav menu + the list/detail logic for Research & Blog
```

Research and Blog work the same way: the page shows a list of topics,
and clicking one swaps in its full write-up (no page reload, no
server needed — it's all in the browser). Each topic also gets its
own shareable link, like `research.html#z-scan`.

## Deploy on GitHub Pages

1. Go to **github.com** → click **+** (top right) → **New repository**.
2. Name it **exactly** `<your-username>.github.io` (e.g.
   `faizul-amin.github.io`) — this exact name is what makes GitHub
   Pages serve it automatically. Keep it **Public**, and don't add a
   README, `.gitignore`, or license — leave it empty.
3. On the new repo's page, click **"uploading an existing file"**.
   Drag in **all of it at once**: `index.html`, `research.html`,
   `blog.html`, and the whole `assets` folder — dropping a folder
   keeps its `css`/`js` subfolders intact.
4. Scroll down, make sure **"Commit directly to the main branch"**
   is selected, and click **Commit changes**.
5. Go to **Settings → Pages**. Under "Build and deployment," set
   Source to **"Deploy from a branch"**, Branch **main**, folder
   **/ (root)**. Save if it wasn't already set.
6. Wait a minute or two, then visit `https://<your-username>.github.io/`.

To update anything later: open the file on GitHub, click the pencil
(edit) icon, make your change, commit.

## Placeholders left to check

- `https://github.com/faizul-amin` in the footer — this is inferred
  from your GitHub Pages URL; fix it if your actual username differs.

Your email and LinkedIn are already filled in.

## Adding a blog post

Open `blog.html` and find the `posts` array near the bottom (inside
the `<script>` tag). It has a comment right above it showing the
exact shape to copy:

```js
{
  id: "some-short-url-safe-id",
  title: "Your post title",
  meta: "12 Oct 2026 · Nonlinear optics",
  excerpt: "One line shown in the list.",
  bodyHtml: "<p>First paragraph.</p><p>Second paragraph.</p>",
  tags: ["Optional", "Tags"]
}
```

Paste a copy of that object into the array (newest posts first), fill
in your own values, and save. The list and the click-through detail
page build themselves from this array — nothing else needs to change.

## Adding a research topic

Same idea, in `research.html` — find the `researchItems` array and
copy one of the existing objects as a template.

## Changing the look

All colors, fonts, and spacing live in one place:
`assets/css/style.css`, under `:root` near the top:

```css
--accent: #2f8f82;    /* main teal accent — buttons, links */
--sage: #7fae8c;       /* secondary green accent */
--text: #142420;       /* main text color */
--text-muted: #3c534c; /* body paragraph color */
--container: 1240px;   /* overall page width */
```

Edit a value there and it updates on every page, since all three
pages share this one stylesheet.

## Editing the About section

Open `index.html` and look for `<section id="about">` — everything
inside is plain text you can edit directly, plus a short list of
quick facts just below it.
