import { useEffect } from "react";

const setMetaTag = (attr, key, content) => {

    if (!content) return;

    let tag = document.querySelector(`meta[${attr}="${key}"]`);

    if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
    }

    tag.setAttribute("content", content);

};

/* ==========================================
    SETS DOCUMENT TITLE + META TAGS FOR SEO
========================================== */

const useSEO = ({ title, description, image, url }) => {

    useEffect(() => {

        const defaultTitle = "JerseyHub — Premium Football Jerseys";

        document.title = title
            ? `${title} | JerseyHub`
            : defaultTitle;

        setMetaTag("name", "description", description);
        setMetaTag("property", "og:title", title || defaultTitle);
        setMetaTag("property", "og:description", description);
        setMetaTag("property", "og:image", image);
        setMetaTag("property", "og:url", url || window.location.href);
        setMetaTag("property", "og:type", "website");
        setMetaTag("name", "twitter:card", "summary_large_image");

        return () => {
            document.title = defaultTitle;
        };

    }, [title, description, image, url]);

};

export default useSEO;
