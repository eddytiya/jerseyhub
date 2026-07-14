export const getTotalCategories=(categories)=>{

    return categories.length;

};

export const getTotalJerseys=(jerseys)=>{

    return jerseys.length;

};

export const getFeaturedJerseys=(jerseys)=>{

    return jerseys.filter(

        jersey=>jersey.featured

    ).length;

};

export const getLowStockJerseys=(jerseys)=>{

    return jerseys.filter(

        jersey=>jersey.stock<=5

    ).length;

};

export const getJerseyCount=(jerseys,name)=>{

    return jerseys.filter(

        jersey=>jersey.category===name

    ).length;

};

export const getLargestCategory=(categories,jerseys)=>{

    if(categories.length===0){

        return "-";

    }

    return categories.reduce(

        (largest,current)=>{

            const currentCount=

                jerseys.filter(

                    jersey=>

                        jersey.category===current.name

                ).length;

            const largestCount=

                jerseys.filter(

                    jersey=>

                        jersey.category===largest.name

                ).length;

            return currentCount>largestCount

                ? current

                : largest;

        }

    ).name;

};