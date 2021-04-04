import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, ButtonGroup, ButtonToolbar, Container, Divider, List, Loader } from 'rsuite';
import axios from 'axios';
import colors from '../styles/colors';

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

  const getImageDimensions = () => {
    const height = 20 * occupation.length + 8 * (occupation.length - 1)  + 34 + 187 + 20
    return height;
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
            <Container style={{ margin: 10 }}>
              <Container style={{ flexDirection: 'row', borderRadius: 10, backgroundColor: colors.black, color: colors.white}}>
                <Container style={{padding: 10}}>
                  <Container>
                    <Container>
                      <h3>{name}</h3>
                    </Container>
                    <Divider style={{color: colors.gray}}/>
                    <Container style={{ backgroundColor: colors.black, margin: 10, }}>
                      <p style={{marginLeft: 10}}>- Apodo: {nickname}</p>
                      <p style={{marginLeft: 10}}>- Estado: {status}</p>
                      <p style={{marginLeft: 10}}>- Actor/Actriz{portrayed}</p>
                    </Container>
                  </Container>
                  <Container>
                    <h4>Ocupaciones</h4>
                      {occupation.map((item, index) => (
                        <p style={{marginLeft: 10}}>- {item}</p>
                      ))}
                  </Container>
                </Container>
                <Container>
                  <img src={img} height={getImageDimensions()} width={getImageDimensions()} style={{borderTopRightRadius: 10, borderBottomRightRadius: 10, alignSelf: 'flex-end'}}/>
                </Container>
              </Container>
              <Container>
                <Container style={{margin: 10, marginTop: 20}}>
                  <h4 style={{textAlign: 'center'}}>Temporadas</h4>
                  <Container>
                    <ButtonToolbar style={{alignSelf: 'center'}}>
                      <ButtonGroup>
                        <Button appearance={isBreakingBad ? 'default' : 'subtle'} onClick={() => handleChangeShowClick(breakingBadAppearance, 'Breaking Bad')}>Breaking Bad</Button>
                        <Button appearance={!isBreakingBad ? 'default' : 'subtle'} onClick={() => handleChangeShowClick(betterCallSaulAppearance, 'Better Call Saul')}>Better Call Saul</Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                    <Divider />
                    {appearance.length ? (
                      <ButtonToolbar style={{alignSelf: 'center'}}>
                        {appearance.map((item, index) => (
                          <Button key={index.toString()} index={index} onClick={() => handleSeasonClick(item)}>
                            {item}
                          </Button>
                        ))}

                      </ButtonToolbar>
                    ): (
                      <p style={{textAlign: 'center'}}>No aparece en ninguna temporada</p>
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