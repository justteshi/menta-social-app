import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Card } from 'react-bootstrap'
import { AiOutlineTag } from 'react-icons/ai'


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
        <Card className="post-card-col" key={coctail.idDrink} style={{ width: '18rem', margin:"1em", background:"lightblue" }}>
            <Card.Img variant="top" src={coctail.strDrinkThumb} />
            <Card.Body style={{position:"relative"}}>
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
        <Container style={{marginTop:"2em"}}>
            <h3 style={{textAlign:"center"}}>Browse Coctails</h3>
            <p style={{textAlign:"center", marginTop:"4em", fontStyle:"italic"}}>
                Some things are classic for a reason. Don't get us wrong, we love and inventive, over the top cocktail as much as anyone, 
                but the timeless flavors of cocktails like the margarita, the Manhattan, and the martini are the cocktail version of comfort food, and we can't imagine imbibing without them. 
                Whether you're brushing up on your home mixology menu or looking for a go-to order for your next cocktail hour, these classics will never steer you wrong. 
            </p>
            <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center"}}>
                {listAll}
            </div>
        </Container>
    )
}

export default Coctails
