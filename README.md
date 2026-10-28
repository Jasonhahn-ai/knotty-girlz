# Knotty Girlz Website

Live site: **https://knottygirlzboutique.com**

A simple, beachy website for Knotty Girlz, a boutique in Cape Charles, VA: custom shirts, jewelry, tunics, pants, beachwear, gifts and totes, hats and accessories.
It's plain HTML, CSS and JavaScript with no frameworks and no build step, so you can edit it in any text editor and host it free on Netlify.

---

## What's in the folder

```
index.html            Home page
shop.html             Shop (product grid + filter buttons)
about.html            Your story + owner photo
contact.html          Contact form, email, social links, markets & events
thank-you.html        Page people see after sending a form
404.html              "Page not found" page
css/styles.css        All colors, fonts and layout
js/main.js            Mobile menu, builds the shop cards, shop filters, small helpers
data/products.json    Every product on the Shop page (name, price, category, photo)
admin/                Lisa's admin page (Sveltia CMS) at /admin/, and its settings in admin/config.yml
LISA-GUIDE.md         One-page guide for Lisa: log in, add a product, change a price, remove an item
images/               All photos (swap these out for your own)
netlify.toml          Tells Netlify how to publish the site
sitemap.xml           List of pages for Google (update it if you add a page)
robots.txt            Tells search engines where the sitemap is
```

---

## ⚠️ Always pull from GitHub before you edit

Lisa edits products and uploads photos on the admin page (**knottygirlzboutique.com/admin/**), and each of her saves
goes straight to GitHub, **not** to this folder. So before you change anything here, get her latest changes first:

```bash
cd ~/Documents/"Knotty Girlz"
git pull
```

Then make your edits, and when you're ready, `git add`, `git commit` and `git push`. Netlify publishes every push
to GitHub automatically. If `git pull` reports a conflict (most likely in `data/products.json`), stop and sort it
out before editing, so Lisa's work is never overwritten.

---

## 1. Fill in the [PLACEHOLDERS]

Anything in **[SQUARE BRACKETS]** is a placeholder for you to replace. To find them all, open each `.html` file
and search (Ctrl+F / Cmd+F) for `[`.

All prices and product names are filled in.

**Hidden until Lisa's text is ready.** Sections that still had placeholders are hidden inside HTML comments so
customers never see brackets. Search the site for `HIDDEN UNTIL LISA'S TEXT` to find them. To show one, fill in the text,
then delete the `<!-- HIDDEN UNTIL LISA'S TEXT: ...` line and the matching `END HIDDEN -->` line around it.

| What's hidden | Where | What it needs |
|---|---|---|
| "What We're About" section | `about.html` | One sentence each for Hand-picked, One of a kind, Coastal soul, Community |
| "Come say hi" section | `about.html` | A short note inviting people to visit or reach out, plus a real photo saved as `images/about-workshop.jpg` and its alt text |
| "Find Us at Markets & Events" section | `contact.html` | Event/market name, date and time, and location for each event |
| "Markets & Events" footer link | Footer on every page | Un-hide it once the events section is back |
| Location note after "Cape Charles, VA" | `contact.html`, Reach Us | e.g. "Online only" or "Studio by appointment" |
| Reply time sentence | `contact.html` and `thank-you.html` | How fast you reply, e.g. "within 24–48 hours" |

When the events section comes back, you may also want to put "and find out which markets and events we'll be at next"
back into the Contact page's two description tags.

> **Tip:** Since this is plain HTML, the header and footer are copied on every page. When you change your
> email or social links, use your editor's "Find in Files / Replace All" to update all the pages at once.
> (VS Code, which is free, does this well.)

---

## 2. Replace the photos

All photos live in the `images/` folder. **The easiest way to swap a photo is to save your new photo with the
exact same filename**, replacing the old one. Nothing else needs to change.

Placeholder images are the colored squares with the filename printed on them.

**Home page banner:** right now it's a sunset gradient (orange to pink to soft purple) with a golden sun. To use a beach photo
instead, save it as `images/hero.jpg` (wide, about 1920×1080), then in `css/styles.css` find the `.hero`
section and swap the `background:` lines for the commented-out ones right below them. They add a light
overlay so the text stays readable.

| File | Used on | Best shape |
|---|---|---|
| `category-shirts.jpg`, `category-jewelry.jpg`, `category-tunics.jpg`, `category-beachwear.jpg` | Category tiles on the Home page | Square, about 900×900 |
| `shirts-1.jpg` … `shirts-9.jpg` | Shop, Custom Shirts | Square, about 900×900 |
| `jewelry-1.jpg` … `jewelry-10.jpg` | Shop, Jewelry | Square |
| `tunics-1.jpg` … `tunics-23.jpg` | Shop, Tunics & Tops | Square or portrait (the edges get cropped to a square) |
| `pants-1.jpg` | Shop, Pants | Square or portrait. To add more pants, save them as `pants-2.jpg`, `pants-3.jpg` and so on |
| `beachwear-1.jpg` … `beachwear-21.jpg` | Shop, Beachwear (`beachwear-7` and `-8` are the sunglasses, now under Hats & Accessories; there is no `beachwear-10` or `beachwear-21`) | Square or portrait |
| `accessories-1.jpg` … `accessories-4.jpg` | Shop, Hats & Accessories | Square or landscape |
| `totes-1.jpg` … `totes-5.jpg`, `gifts-1.jpg`, `gifts-3.jpg`, `gifts-5.jpg` … `gifts-11.jpg` | Shop, Gifts & Totes | Square or portrait (the edges get cropped to a square) |
| `custom-ornaments.jpg` | Shop (Handcrafted Wood Ornaments) | Square |
| `owner.jpg` | About page (round frame) + Home page blurb | Square, about 900×900. Keep the face near the center so it crops nicely into the circle |
| `about-workshop.jpg` | About page, "Come say hi" section | Landscape, about 1200×800 |
| `og-image.jpg` | Preview picture when someone shares your link on Facebook or by text | 1200×630 |
| `favicon.svg` | Little icon in the browser tab | Can be replaced with a `favicon.png` (update the `<link rel="icon">` line in each page) |

Real product photos are now used for every shop item and the home page category tiles. The only placeholder left is `about-workshop.jpg`. The sharing picture (`og-image.jpg`) is a crop of the mint tassel-tie dress photo; the uncropped original is `Shareimage.jpg` in the Originals folder.

**Original photos:** the full-size originals are kept in `Documents/Knotty Girlz Originals`, outside the site folder,
so they don't get uploaded to Netlify. Keep new full-size photos there too, and put only resized copies in `images/`. Web copies that were swapped out for newer photos are saved there in `Replaced site photos 2026-10-27` and `Replaced site photos 2026-10-28`, and photos of products taken off the shop are in `Removed from shop 2026-10-28`.

**Photo tips:**
- Keep each photo under about **300 KB** so the site loads fast on phones. Free tools like
  [Squoosh](https://squoosh.app) can shrink them.
- Use `.jpg` filenames. If you use a different name or a `.png`, update the matching `src="images/..."` in the HTML.
- Every `<img>` has an `alt="..."` description for screen readers and Google. When you swap a photo,
  update its `alt` text too (search for `[DESCRIBE`).

---

## 3. Add, remove or edit products

**The easy way:** use the admin page at **knottygirlzboutique.com/admin/** and sign in with GitHub. See `LISA-GUIDE.md`.
Photos uploaded there are shrunk to fit 1200×1200 and saved as `.webp` in `images/`. New products go to the top of the shop.
The admin page's settings (fields, categories, photo size) are in `admin/config.yml`.

**By hand:** (pull first!) all products live in **`data/products.json`**. The Shop page reads that file and builds the cards, so
`shop.html` itself has no products in it. Each product looks like this:

```json
{
  "name": "Santa Canvas Tote",
  "price": "$15",
  "category": "gifts",
  "image": "/images/totes-1.jpg",
  "alt": "Natural canvas tote bag with a fluffy embroidered-look Santa face"
}
```

- **`category`** must be one of `shirts`, `jewelry`, `tunics`, `pants`, `beachwear`, `gifts` or `accessories`.
  The filter buttons and the little tag on each card come from this.
- **`price`** is plain text, so things like `"$5 each"` or `"$10 each or 2 for $15"` work.
- **`alt`** describes the photo for screen readers and Google.
- **`description`** is optional. If it's there, it shows under the name.
- The **"Inquire / Order"** link is made automatically from the name.
- Products show in the same order as in the file.

Because the page loads the file, double-clicking `shop.html` shows an empty shop. Use the local server in section 5 to preview it.

## Custom orders (paused)

Custom orders are turned off for now. The Custom Orders page, its menu and footer links, the home page
"Design Your Own" button and "Got an idea? We'll make it." section, and the Shop page "Request a Custom Order"
button have all been removed. Anyone who visits `/custom-orders` or `/custom-orders.html` is sent to the Shop page.

Everything needed to bring it back is in `Documents/Knotty Girlz Originals/Custom Orders (paused)`:
the original `custom-orders.html` and `RESTORE.md`, which has the exact snippets to paste back and lists the steps.
The custom order form code in `js/main.js` and the "Steps" styles in `css/styles.css` were left in place, so they'll work again as soon as the page is back.

---

## 4. Change colors or fonts

At the top of `css/styles.css`, the `:root { ... }` section holds all the colors and fonts.
Change a color code there and it updates across the whole site.

| Color | Code | Used for |
|---|---|---|
| Sunset orange | `#F79256` | Top of the banner gradient, step numbers, form top border, "Contact Us" band on the Shop page |
| Pink | `#F25C8A` | Middle of the banner gradient, current-page highlight in the menu, filter borders |
| Purple dusk | `#7B5EA7` | Headings, main buttons, "What We're About" section |
| Golden sand | `#FBD1A2` | Accent sections, product tags, the little sun in the banner, footer headings |
| White | `#FFFFFF` | Page background, cards |

A few extra shades keep text easy to read:
- `--ink` (`#2E1F47`): a very deep dusk purple. It's used for body text, the footer, and text on the orange and pink areas.
- `--dusk-ink` (`#5B3F8A`): for links and small purple text.
- `--pink-ink` (`#C2185B`): for prices and small pink text.
- `--dusk-soft` (`#A68BD0`): the soft purple at the bottom of the banner gradient.

White text only reads well on the purple and the dark footer, so the orange and pink areas use dark text.

Fonts come from Google Fonts: **Pacifico** (logo), **Caveat** (headings) and **Nunito** (body text).

### Using a real logo later
In each page's header, replace:
```html
<a class="logo" href="index.html">Knotty <span>Girlz</span></a>
```
with:
```html
<a class="logo" href="index.html"><img src="images/logo.png" alt="Knotty Girlz" height="48"></a>
```

---

## 5. Preview the site on your computer

**Quickest:** double-click `index.html` to open it in your browser. Everything works except the forms and the Shop page products (those need the local server below).

**Better (acts like a real web server):** open a terminal in this folder and run:
```bash
python3 -m http.server 8000
```
Then visit <http://localhost:8000>. Press Ctrl+C to stop.

To check the phone layout, open your browser's developer tools (F12) and turn on the device toolbar
(the phone/tablet icon), or just make the window narrow.

> The forms only actually send once the site is live on Netlify. Locally, pressing "Send" will show an error.
> That's normal.

---

## 6. Put it online with Netlify (free)

### How the site goes live

The site is connected to GitHub (repository `Jasonhahn-ai/knotty-girlz`, branch `main`). **Every push to GitHub,
and every save on the admin page, goes live automatically** in about a minute. You can watch it under the site's
**Deploys** tab in Netlify. There's no build step: Netlify just publishes the folder (`netlify.toml` sets this).

Don't drag and drop the folder into Netlify anymore. The next GitHub push would replace it, and it could put back
products Lisa has removed.

### Admin page sign-in (one-time setup)
The admin page signs in through Netlify's built-in GitHub sign-in. It uses a GitHub "OAuth app" (GitHub →
Settings → Developer settings → OAuth Apps, callback URL `https://api.netlify.com/auth/done`) whose Client ID and
Secret are saved in Netlify under **Site configuration → Access & security → OAuth → GitHub**. Anyone who should
edit products needs a GitHub account added as a collaborator on the repository (GitHub repository → **Settings →
Collaborators**).

### Turn on the forms
Netlify finds the **Contact** form automatically when you deploy.
1. After the first deploy, open your site in Netlify → **Forms**. If you see a button to
   **enable form detection**, click it, then deploy once more.
2. You should see the `contact` form listed.
3. To get an email for every new message: **Forms → Form notifications → Add notification → Email notification**.
4. Send yourself a test from the live site to make sure it works.

Notes:
- The free plan has a monthly limit on form submissions; check your Netlify plan page for the current number. Spam is filtered by a hidden "honeypot" field.

### Use your own domain (optional)
In Netlify, open **Domain management → Add a domain** and follow the steps. Netlify adds free HTTPS automatically.

The site now lives at **https://knottygirlzboutique.com**. Each public page has a `<link rel="canonical">` and `og:url` pointing at that
domain, and `og:image` uses the full address so Facebook and text-message previews can find the picture.
**If you add a new page**, copy those lines from another page's `<head>` and change the page name, and add the page
to `sitemap.xml`. If the domain ever changes, search all files for `knottygirlzboutique.com` and replace it.
