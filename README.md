# Travel Agency & Overseas Manpower — Company Website

A complete, ready-to-host company portfolio website for a **tour & travel agency** that also does
**overseas manpower supply**. Plain HTML, CSS and JavaScript — no build step, no npm, no framework.
Double-click `index.html` and it runs.

---

## 🚀 The 3 things to do first

### 1. Set your WhatsApp number  ⭐ most important

Open **`assets/js/config.js`** and change this line:

```js
whatsapp        : "8801712345678",       // ← digits only, with country code
whatsappDisplay : "+880 1712-345678",    // ← how it looks on the page
```

**Number format rules — get this wrong and WhatsApp will not open:**

| Your local number | What to write |
|---|---|
| Bangladesh `01712-345678` | `8801712345678` |
| UAE `050 123 4567` | `971501234567` |
| Saudi Arabia `05 1234 5678` | `966512345678` |
| Qatar `3312 3456` | `97433123456` |
| India `98765 43210` | `919876543210` |

- Include the country code
- **No** `+`, **no** spaces, **no** dashes
- **Drop the leading `0`** of your local number

### 2. Fill in the rest of `config.js`

Company name, phone, email, address, opening hours, licence numbers and social links all live in
that one file. Change them once and **every page updates** — header, footer, contact page and the
floating WhatsApp button.

### 3. Replace the demo photos

Every image is a placeholder in the **`images/`** folder. Drop your own photo in, **keep the same
file name**, and it appears on the site. No code change needed.

```
images/
├── hero/           full-width banner photos (1920 × 1080)
├── services/       service section photos    (1200 × 675)
├── destinations/   country / package photos  (1200 × 675)
├── manpower/       trade & worker photos     (1200 × 675)
├── team/           staff portraits — SQUARE  (600 × 600)
├── about/          office & company photos   (1200 × 675)
├── gallery/        gallery page photos       (900 × 600)
└── CREDITS.md      where each demo photo came from  ← read this
```

---

## 📞 How the contact form works

There is **no server and no database** — the forms send straight to WhatsApp:

1. Visitor fills in the form and presses **Send on WhatsApp**
2. WhatsApp opens (app on mobile, WhatsApp Web on desktop)
3. The message is **already typed out** — name, phone, service, destination, dates, message
4. They press send, and it lands in your WhatsApp inbox

This means it works on any hosting — including free static hosting — with no PHP, no mail server
and no monthly cost.

Forms are on: the home page (quick bar), **Contact**, **Tour Packages**, and **Manpower**
(one for employers, one for job seekers). Every **Book** / **Enquire** button on a package card
also opens WhatsApp with that package name filled in.

**To change the message wording**, edit `waTemplates` at the bottom of `config.js`.
`{{name}}`, `{{phone}}`, `{{service}}` and so on are replaced with what the visitor typed.

---

## 📄 Pages

| File | Page |
|---|---|
| `index.html` | Home — hero slider, quick enquiry, services, packages, trades, reviews |
| `about.html` | About — story, values, milestones, team, compliance |
| `services.html` | All services overview + FAQ |
| `tour-packages.html` | 15 tour packages with filters + 4 Hajj/Umrah packages + custom trip form |
| `air-ticket-visa.html` | Air ticketing, visa types table, document checklist, FAQ |
| `manpower.html` | Trades, countries, employer process, job seeker process, 2 forms |
| `gallery.html` | Filterable photo gallery with lightbox |
| `contact.html` | WhatsApp form, offices, Google Map |

---

## 🎨 Changing the colours

Open `assets/css/style.css` — the first block is all you need:

```css
:root{
  --navy:#0a1f3d;      /* main dark brand colour  */
  --gold:#e8a33d;      /* accent / button colour  */
  --teal:#0e8b8b;
  ...
}
```

Change those two values and the whole site re-themes.

## ✏️ Changing the menu, logo or footer

The header and footer are written into each `.html` file. To change a menu item or footer link,
edit it in **all 8 pages** (search-and-replace in your editor does this in one go).

The logo is an inline SVG in the header of each page. To use an image logo instead, replace the
`<svg class="logo__mark" …>…</svg>` block with `<img class="logo__mark" src="images/logo.png" alt="">`.

---

## 🌐 Putting it online

**Any of these work — the site is plain static files:**

- **cPanel / shared hosting** — upload everything into `public_html/`
- **Netlify / Vercel / Cloudflare Pages** — drag the whole folder onto their dashboard
- **GitHub Pages** — push the folder, enable Pages in settings

Upload **all** of it: the `.html` files plus the `assets/` and `images/` folders.

### Testing locally

Opening `index.html` directly works for everything **except the Google Map**, which browsers block
on `file://`. To see the map before uploading, run a tiny local server:

```bash
cd /Users/rarashed/Desktop/agency
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## ✅ Before you go live — checklist

- [ ] WhatsApp number set in `config.js` (and tested — send yourself a test enquiry)
- [ ] Company name, phone, email, address updated
- [ ] Real licence / RL / IATA numbers in, or the fake ones removed
- [ ] Social media links updated (set to `""` to hide an icon)
- [ ] Demo photos replaced with your own
- [ ] Package names, descriptions and **prices** updated in `tour-packages.html` and `index.html`
- [ ] Team names and photos updated in `about.html`
- [ ] `images/CREDITS.md` read — one photo needs attribution unless you replace it
- [ ] Office addresses on `contact.html` updated

---

## Built in

Pure HTML5 + CSS3 + vanilla JavaScript. Fonts from Google Fonts. No jQuery, no Bootstrap, no
Tailwind, no build tools. Responsive from 360px phones up to large desktops, keyboard accessible,
and it still shows all content if JavaScript is switched off.
