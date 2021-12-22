import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Card } from 'react-bootstrap'
import { AiOutlineTag } from 'react-icons/ai'
import styles from './Coctails.module.css'

const Coctails = () => {
    const [coctails, setCoctails] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a'
            let response = await axios.get(url)
            let {drinks} = response.data
            setCoctails(drinks)
        }
        fetchData()
    }, [])

    const listAll = coctails.map((coctail) =>
        <Card className={styles.CoctailCard} key={coctail.idDrink}>
            <Card.Img variant="top" src={coctail.strDrinkThumb} />
            <Card.Body>
                <Card.Title>{coctail.strDrink}</Card.Title>
                <Card.Text>
                    {coctail.strInstructions}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <AiOutlineTag />
                {coctail.strCategory}
                <AiOutlineTag />
                {coctail.strAlcoholic}
            </Card.Footer>
        </Card>
    )
    return (
        <Container className={styles.CoctailPageWrapper}>
            <h3 className={styles.CoctailPageTitle}>Browse Cocktails</h3>
            <p className={styles.CoctailPageText}>
                Some things are classic for a reason. Don't get us wrong, we love and inventive, over the top cocktail as much as anyone, 
                but the timeless flavors of cocktails like the margarita, the Manhattan, and the martini are the cocktail version of comfort food, and we can't imagine imbibing without them. 
                Whether you're brushing up on your home mixology menu or looking for a go-to order for your next cocktail hour, these classics will never steer you wrong. 
            </p>
            <div className={styles.CoctailsWrapper}>
                {listAll}
            </div>
        </Container>
    )
}

export default Coctails
