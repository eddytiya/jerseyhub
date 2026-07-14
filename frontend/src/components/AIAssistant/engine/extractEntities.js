import { getMetadata } from "./metadataStore";

const extractEntities = (message) => {

    const entities = {

        team: null,

        jerseyType: null,

        competition: null,

        season: null,

        size: null,

        maxPrice: null,

        minPrice: null,

        category: null

    };

    const metadata = getMetadata();

    /* ==========================
            Jersey Type
    ========================== */

    const jerseyTypes = [

        "home",

        "away",

        "third",

        "goalkeeper",

        "training",

        "retro"

    ];

    jerseyTypes.forEach(type => {

        if (message.includes(type)) {

            entities.jerseyType =

                type.charAt(0).toUpperCase() +

                type.slice(1);

        }

    });

    /* ==========================
            Competition
    ========================== */

    const competitions = [

        "world cup",

        "champions league",

        "premier league",

        "laliga",

        "la liga",

        "serie a",

        "bundesliga",

        "euros",

        "copa america"

    ];

    competitions.forEach(comp => {

        if (message.includes(comp)) {

            entities.competition = comp;

        }

    });

    /* ==========================
            Size
    ========================== */

    const sizeMatch = message.match(

        /\b(xxl|xl|xs|s|m|l)\b/i

    );

    if (sizeMatch) {

        entities.size =

            sizeMatch[1].toUpperCase();

    }

    /* ==========================
        SEASON
========================== */

const detectedSeason = metadata.seasons.find(season =>

    message.includes(

        season.toLowerCase()

    )

);

if (detectedSeason) {

    entities.season = detectedSeason;

}

    /* ==========================
            MAX PRICE
    ========================== */

    const priceMatch = message.match(

        /(under|below|less than)\s*₹?\s*(\d+)/i

    );

    if (priceMatch) {

        entities.maxPrice =

            Number(priceMatch[2]);

    }

    /* ==========================
            MIN PRICE
    ========================== */

    const minPriceMatch = message.match(

        /(above|over|more than)\s*₹?\s*(\d+)/i

    );

    if (minPriceMatch) {

        entities.minPrice =

            Number(minPriceMatch[2]);

    }

    /* ==========================
            CATEGORY DETECTION
    ========================== */

    const detectedCategory = metadata.categories.find(category =>

        message.includes(

            category.toLowerCase()

        )

    );

    if (detectedCategory) {

        entities.category = detectedCategory;

    }

    /* ==========================
            RETRO SHORTCUT
    ========================== */

    if (

        message.includes("retro") &&

        !entities.category

    ) {

        entities.category = "Retro Collection";

    }

 /* ==========================
        TEAM DETECTION
========================== */

let detectedTeam = null;

for (const team of metadata.teams) {

    const teamName = team.toLowerCase();

    if (message.includes(teamName)) {

        detectedTeam = team;

        break;

    }

    const words = teamName.split(" ");

    if (

        words.some(word =>

            word.length > 2 &&

            message.includes(word)

        )

    ) {

        detectedTeam = team;

        break;

    }

}

if (detectedTeam) {

    entities.team = detectedTeam;

}

/* ==========================
        RETURN
========================== */

return entities;

};

export default extractEntities;