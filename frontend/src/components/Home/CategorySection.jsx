import React from 'react'
import './CategorySection.css'
import './Home.css'

import CategoryCard from './CategoryCard'

const CategorySection = ({

    categories,

    jerseys

}) => {

    return (

        <section className="home-section">

            <div className="section-title">

                <h2>

                    Featured Categories

                </h2>

                <span></span>

                <p className="section-subtitle">

                    Explore official club, international and special collections.

                </p>

            </div>

            <div

    className={

        `category-grid count-${categories.length}`

    }

>

    {

        categories.map((category) => (

            <CategoryCard

                key={category._id}

                category={category}

                jerseyCount={

                    jerseys.filter(

                        jersey =>

                            jersey.category === category.name

                    ).length

                }

            />

        ))

    }

</div>

        </section>

    )

}

export default CategorySection