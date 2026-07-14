const buildFilters = (entities) => {

    const filters = {};

    if (entities.team) {

        filters.teamName =

            new RegExp(

                entities.team,

                "i"

            );

    }

    if (entities.jerseyType) {

        filters.jerseyType =

            entities.jerseyType;

    }

    if (entities.category) {

        filters.category =

            entities.category;

    }

    if (entities.competition) {

        filters.competition =

            entities.competition;

    }

    if (entities.season) {

        filters.season =

            entities.season;

    }

    if (entities.size) {

        filters.sizes =

            entities.size;

    }

    if (entities.maxPrice) {

        filters.price = {

            $lte:

                entities.maxPrice

        };

    }

    return filters;

};

export default buildFilters;