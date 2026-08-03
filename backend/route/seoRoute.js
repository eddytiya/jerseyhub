const express = require('express');

const router = express.Router();

const Jersey = require('../model/jerseyModel');

const SITE_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const STATIC_PAGES = [
    "",
    "/shop",
    "/categories",
    "/products",
    "/contact",
    "/faq",
    "/bulk-order"
];

/* ==========================================
                SITEMAP.XML
========================================== */

router.get('/sitemap.xml', async (req, res) => {

    try {

        const jerseys = await Jersey.find().select('_id updatedAt');

        const staticUrls = STATIC_PAGES.map((path) => `
    <url>
        <loc>${SITE_URL}${path}</loc>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>`).join("");

        const jerseyUrls = jerseys.map((jersey) => `
    <url>
        <loc>${SITE_URL}/jersey/${jersey._id}</loc>
        <lastmod>${new Date(jersey.updatedAt).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.6</priority>
    </url>`).join("");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls}${jerseyUrls}
</urlset>`;

        res.header('Content-Type', 'application/xml');

        res.send(xml);

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }

});

/* ==========================================
                ROBOTS.TXT
========================================== */

router.get('/robots.txt', (req, res) => {

    res.type('text/plain');

    res.send(

`User-agent: *
Disallow: /admin
Disallow: /manage-orders
Disallow: /manage-jerseys
Disallow: /manage-categories
Disallow: /manage-coupons
Disallow: /manage-bulk-inquiries
Disallow: /manage-reviews
Disallow: /product-types
Disallow: /manage-subscribers
Disallow: /checkout
Disallow: /cart
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`

    );

});

module.exports = router;
