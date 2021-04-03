import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { Button, Container, Loader, List, Modal, IconButton, Icon, Whisper, Tooltip } from 'rsuite';
import axios from 'axios';

const Search = ({
  commonApiUrl,
  location,
}) => {
  const defaultOffset = 10;
  const hasPrevious = location?.state?.hasPrevious;
  const params = useParams();
  const { name: formattedName, offset } = params;
  const name = formattedName.replace(/\+/g, ' ');
  const history = useHistory()
  const [characters, setCharacters] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState(undefined);
  const [showModal, setShowModal] = useState(false);

  const url = `${commonApiUrl}/characters?name=${formattedName}&limit=10&offset=${offset}`;
  console.log(url)
  useEffect(() => {
    setIsLoading(true)
    axios.get(url)
      .then((response) => {
        const temporalCharacters = [];
        if (response.data.length) {
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
          console.log(temporalCharacters)
          setCharacters(temporalCharacters)
        } else {
          setIsEmpty(true)
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
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
    setSelectedCharacter(character);
    setShowModal(true)
  }
  
  const handleVisitCharacter = (show) => {
    history.push(`/character/${show.replace(/ /g, '+')}/${selectedCharacter.name.replace(/ /g, '+')}`)

  }

  const tooltipBreakingBadHelper = (
    <Tooltip>
      El personaje no aparece en Breaking Bad
    </Tooltip>
  );

  const tooltipBetterCallSaulHelper = (
    <Tooltip>
      El personaje no aparece en Better Call Saul
    </Tooltip>
  );
  return(
    <Container>
      {selectedCharacter && <Modal show={showModal} size="xs">
      <IconButton style={{alignSelf: 'flex-end'}} icon={<Icon icon="close" />} onClick={() => setShowModal(false)} circle size="xs" />
        Ver el {selectedCharacter.name} en:
        <Container style={{flexDirection: 'row'}}>
          {selectedCharacter.appearances.breakingBad ? (
            <Button onClick={() => handleVisitCharacter('Breaking Bad')}>Breaking Bad</Button>
          ) : (
            <Whisper placement="top" trigger={["hover", "click"]} speaker={tooltipBreakingBadHelper}>
              <Button appearance="subtle">Breaking Bad</Button>
            </Whisper>
          )}
          {selectedCharacter.appearances.betterCallSaul ? (
            <Button onClick={() => handleVisitCharacter('Better Call Saul')}>Better Call Saul</Button>
          ) : (
            <Whisper placement="top" trigger={["hover", "click"]} speaker={tooltipBetterCallSaulHelper}>
              <Button appearance="subtle">Better Call Saul</Button>
            </Whisper>
          )}
        </Container>
      </Modal>}
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
                {!isEmpty && <Button onClick={handleNext}>Siguiente</Button>}
              </Container>
            </Container>
          )}
        </Container>
      )}
    </Container>
  )
}

export default Search;