import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import Card from './Card';



let Buttons = styled.div`
display: flex;
justify-content: center;
margin-top: 2%;

`;
let Container = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
`;
let Box = styled.div`
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
`;



export default function QuestionCard() {

    const [joke, setJoke] = useState([]);
    const [elem, setElem] = useState(0);

    useEffect(() => {

        Axios.get(`https://be-dad-jokes.herokuapp.com/api/jokes`)
            .then(Response => {
                              
                setJoke(Response.data);
                return setJoke;



            })
            .catch(err => {
                console.log("Error:", err);
            });


            
    }, [elem]);

    const clickHandleNext = () => {
        console.log(elem);
        setElem(elem + 1);
        console.log(joke.length);
        if(elem === joke.length - 1){
            setElem(0);
        }

    }
    const clickHandleBack = () => {
        console.log(elem);
        console.log(joke.length);
        setElem(elem - 1);
        if(elem < joke.length-(joke.length-1)){
            setElem(0);
        }

    }




    console.log(joke);

    return (
        <Container>
            <h2>Get Ready for some Knee Slappers</h2>
            
            <Box>

                {joke.map((value, index) => {

                    if (index === elem) {


                        return (
                            
                                <Card
                                    key={index}
                                    joke={value.joke}
                                    punchline={value.punchline}
                                />
                                
                            


                        )

                    }
                    console.log(elem);
                    

                })}

            </Box>
            <Buttons>
            <button type='button' onClick={clickHandleBack} >Back</button>
            <button type='button' onClick={clickHandleNext} >Next</button>
            </Buttons>
        </Container>
    )



}