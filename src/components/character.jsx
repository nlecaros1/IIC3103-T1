import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, ButtonToolbar, Container, List, Loader } from 'rsuite';
import axios from 'axios';

const Character = ({
  commonApiUrl,
  location,
}) => {
  const params = useParams();
  const history = useHistory();

  const { id: formattedName } = params; 

  const name = formattedName.replace(/\+/g, ' ');
  const show = location?.state?.show ? location.state.show : 'Breaking Bad';
  const [isBreakingBad, setIsBreakingBad] = useState(show === 'Breaking Bad');
  const [breakingBadAppearance, setBreakingBadAppearance] = useState([]);
  const [betterCallSaulAppearance, setBetterCallSaulAppearance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  
  const [appearance, setAppearance] = useState('');
  const [img, setImg] = useState('');
  const [nickname, setNickname] = useState('');
  const [occupation, setOccupation] = useState('');
  const [portrayed, setPortrayed] = useState('');
  const [status, setStatus] = useState('');
  

  const url = `${commonApiUrl}/characters?name=${formattedName}`;

  useEffect(() => {
    setIsLoading(true);
    axios.get(url)
      .then((response) => {
        if (response.data.length) {
          const character = response.data[0];
          setBreakingBadAppearance(character.appearance);
          setBetterCallSaulAppearance(character.better_call_saul_appearance);
          setAppearance(isBreakingBad ? character.appearance : character.better_call_saul_appearance);
          setImg(character.img);
          setNickname(character.nickname);
          setOccupation(character.occupation);
          setPortrayed(character.portrayed);
          setStatus(character.status)
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

  const handleSeasonClick = (season) => {
    history.push(`/show/${isBreakingBad ? 'Breaking+Bad' : 'Better+Call+Saul'}`, { season })
  }

  const handleChangeShowClick = (appearanceToUse, mode) => {
    setAppearance(appearanceToUse);
    setIsBreakingBad(mode === 'Breaking Bad')
  }

  return(
    <Container>
      {isLoading ? (
        <Loader center content="Cargando"/>
      ) : (
        <Container>
          {isEmpty ? (
            <Container>
            <h1>Lo sentimos, no tenemos registro de {name} en {show}. Revisa que su nombre este bien escrito.</h1>
            </Container>
          ) : (
            <Container>
              <Container>
                <p>{name}</p>
                <p>{nickname}</p>
                <p>{portrayed}</p>
                <p>{status}</p>
              </Container>
              <Container>
                <img src={img} height="240" width="240" />
              </Container>
              <Container>
                <h3>Ocupaciones</h3>
                <List hover>
                  {occupation.map((item, index) => (
                    <List.Item key={index.toString()} index={index}>
                      {item}
                    </List.Item>
                  ))}
                </List>
              </Container>
              <Container>
                <Container>
                  <h3>Temporadas</h3>
                  <Container>
                    <ButtonToolbar>
                      <Button appearance={isBreakingBad ? 'default' : 'subtle'} onClick={() => handleChangeShowClick(breakingBadAppearance, 'Breaking Bad')}>Breaking Bad</Button>
                      <Button appearance={!isBreakingBad ? 'default' : 'subtle'} onClick={() => handleChangeShowClick(betterCallSaulAppearance, 'Better Call Saul')}>Better Call Saul</Button>
                    </ButtonToolbar>
                    {appearance.length ? (
                      <List hover>
                        {appearance.map((item, index) => (
                          <List.Item key={index.toString()} index={index} onClick={() => handleSeasonClick(item)}>
                            {item}
                          </List.Item>
                        ))}
                      </List>
                    ): (
                      <p>No aparece en ninguna temporada</p>
                    )}
                  </Container>
                </Container>
              </Container>

            </Container>
          )}
        </Container>
      )}
    </Container>
  )
}

export default Character;