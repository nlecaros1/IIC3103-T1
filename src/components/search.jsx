import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { Button, Container, Loader, List, Modal, IconButton, Icon, Whisper, Tooltip } from 'rsuite';
import axios from 'axios';

const Search = ({
  commonApiUrl,
  location,
}) => {
  const defaultOffset = 1;
  const defaultLimit = 1;
  const hasPrevious = location?.state?.hasPrevious;
  const params = useParams();
  const { name: formattedName, offset } = params;
  const name = formattedName.replace(/\+/g, ' ');
  const history = useHistory()
  const [characters, setCharacters] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, sethasNext] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const url = `${commonApiUrl}/characters?name=${formattedName}&limit=${defaultLimit}0&offset=${offset}`;

  useEffect(() => {
    setIsLoading(true)
    axios.get(url)
      .then((response) => {
        const temporalCharacters = [];
        if (response.data.length) {
          if (response.data.length === defaultLimit) {
            sethasNext(true);
          } 
          response.data.forEach((character) => {
            temporalCharacters.push({
              name: character.name,
              appearances: {
                breakingBad: character.appearance.length > 0,
                betterCallSaul: character.better_call_saul_appearance.length > 0
              }
            })
          })
          setIsEmpty(false)
          setCharacters(temporalCharacters)
        } else {
          setIsEmpty(true)
        }
        setIsLoading(false);
      })
      .catch((error) => {
        history.push('/error', { error })
      });
  },
  [params]);

  const handleNext = () => {
    history.push(`/search/${formattedName}/${parseInt(offset) + defaultOffset}`, {hasPrevious: true})
  }
  const handlePrevious = () => {
    history.push(`/search/${formattedName}/${parseInt(offset) - defaultOffset}`)
  }

  const handleCharacterClick = (character) => {
    history.push(`/character/${character.name.replace(/ /g, '+')}`)
  }


  return(
    <Container>
      <h2>Resultados para: {name}</h2>
      {isLoading ? (
        <Loader center content="Cargando"/>
      ) : (
        <Container>
          {isEmpty ? (
            <Container>
              {hasPrevious ? (
                <Container>
                  <h3>No hay más resultados</h3>
                  {offset > 0 && hasPrevious && <Button onClick={handlePrevious}>Anterior</Button>}
                </Container>
              ) : (
                <h3>No hay resultados</h3>
              )}
            </Container>
          ): (
            <Container>
              <Container>
                <List hover>
                  {characters.map((item, index) => (
                    <List.Item key={index.toString()} index={index} onClick={() => handleCharacterClick(item)}>
                      {item.name}
                    </List.Item>
                  ))}
                </List>
              </Container>
              <Container style={{flexDirection: 'row'}}>
                {offset > 0 && hasPrevious && <Button onClick={handlePrevious}>Anterior</Button>}
                {!isEmpty && hasNext && <Button onClick={handleNext}>Siguiente</Button>}
              </Container>
            </Container>
          )}
        </Container>
      )}
    </Container>
  )
}

export default Search;