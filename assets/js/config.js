/* ==========================================================================
   ⚙️  SITE CONFIG — THIS IS THE ONLY FILE YOU NEED TO EDIT FOR CONTACT INFO
   --------------------------------------------------------------------------
   Change the values below and every page updates automatically:
   header, footer, contact page, floating WhatsApp button and all forms.
   ========================================================================== */

window.SITE_CONFIG = {

  /* ---------- Company identity ---------- */
  companyName : "Skyline Bridge",
  companyFull : "Skyline Bridge Travels & Overseas Manpower Ltd.",
  tagline     : "Travel & Manpower",
  slogan      : "Your trusted partner for travel and overseas employment.",

  /* ---------- ⭐ WHATSAPP — put YOUR number here ⭐ ----------
     Rules:
       • International format, digits only.
       • Include the country code.
       • NO "+", NO spaces, NO dashes, NO leading zero.
     Examples:
       Bangladesh  01712-345678  ->  "8801712345678"
       UAE         050 123 4567  ->  "971501234567"
       Saudi       05 1234 5678  ->  "966512345678"
       India       98765 43210   ->  "919876543210"
  ------------------------------------------------------------ */
  whatsapp        : "8801827801715",
  whatsappDisplay : "+880 1827-801715",

  /* ---------- Phone / email ---------- */
  phone        : "+8801827801715",
  phoneDisplay : "+880 1827-801715",
  hotline      : "16247",
  email        : "rnrashedrn@gmail.com",
  emailHr      : "rnrashedrn@gmail.com",

  /* ---------- Address ---------- */
  addressLine1 : "House 42 (4th Floor), Road 11, Banani",
  addressLine2 : "Dhaka 1213, Bangladesh",
  mapQuery     : "Banani, Dhaka, Bangladesh",   // used by the Google Map embed + address links

  /* Optional but recommended: the exact pin for your office.
     In Google Maps find your office → Share → Copy link → paste it below.
     Leave it as "" and the site just searches for mapQuery instead. */
  mapLink      : "",

  /* ---------- Opening hours ---------- */
  hours     : "Saturday – Thursday, 9:00 AM – 7:00 PM",
  hoursNote : "Friday closed · WhatsApp answered 24/7",

  /* ---------- Licences / registration (shown as trust signals) ---------- */
  licenseRL   : "RL-1234",
  licenseIATA : "IATA 12-3 4567 8",
  licenseATAB : "ATAB / BAIRA Member",

  /* ---------- Footer credit ("Developed by ...") ----------
     Set url to your website and the name becomes a link;
     leave url as "" and it stays plain text. */
  developer: {
    name : "RARashed",
    url  : ""
  },

  /* ---------- Social links (leave "" to hide an icon) ---------- */
  social: {
    facebook  : "https://facebook.com/",
    instagram : "https://instagram.com/",
    linkedin  : "https://linkedin.com/",
    youtube   : "https://youtube.com/",
    tiktok    : ""
  },

  /* ---------- WhatsApp message templates ----------
     {{field}} placeholders are filled from the form inputs. ---------- */
  waTemplates: {
    default:
      "*New enquiry from the website*%0A" +
      "-----------------------------%0A" +
      "*Name:* {{name}}%0A" +
      "*Phone:* {{phone}}%0A" +
      "*Email:* {{email}}%0A" +
      "*Service:* {{service}}%0A" +
      "*Destination:* {{destination}}%0A" +
      "*Travellers / Workers:* {{people}}%0A" +
      "*Preferred date:* {{date}}%0A" +
      "*Message:* {{message}}",

    quick:
      "*Quick enquiry*%0A" +
      "-----------------------------%0A" +
      "*Name:* {{name}}%0A" +
      "*Phone:* {{phone}}%0A" +
      "*Service:* {{service}}%0A" +
      "*Destination:* {{destination}}",

    package:
      "*Package booking request*%0A" +
      "-----------------------------%0A" +
      "*Package:* {{package}}%0A%0A" +
      "Hello, I am interested in this package. Please send me the full itinerary, price and available dates.",

    job:
      "*Job / manpower enquiry*%0A" +
      "-----------------------------%0A" +
      "*Category:* {{package}}%0A" +
      "*Name:* {{name}}%0A" +
      "*Phone:* {{phone}}%0A" +
      "Please share available vacancies and requirements."
  }
};
