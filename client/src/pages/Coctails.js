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
        <Card className="post-card-col" key={coctail.idDrink} style={{ width: '18rem', margin:"1em" }}>
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
            <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center"}}>
                {listAll}
            </div>
        </Container>
    )
}

export default Coctails
