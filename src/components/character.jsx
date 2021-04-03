import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, Container, List, Loader } from 'rsuite';
import axios from 'axios';

const Character = ({
  commonApiUrl
}) => {
  const params = useParams();
  const history = useHistory();
  const { id: formattedName, show: formattedShow } = params; 
  const name = formattedName.replace(/\+/g, ' ');
  const show = formattedShow.replace(/\+/g, ' ');
  const isBreakingBad = show === 'Breaking Bad';
  console.log(name, isBreakingBad)
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isFromOtherShow, setIsFromOtherShow] = useState(false);
  
  const [appearance, setAppearance] = useState('');
  const [img, setImg] = useState('');
  const [nickname, setNickname] = useState('');
  const [occupation, setOccupation] = useState('');
  const [portrayed, setPortrayed] = useState('');
  const [status, setStatus] = useState('');
  

  const url = `${commonApiUrl}/characters?name=${formattedName}`;
  console.log(url)

  useEffect(() => {
    setIsLoading(true);
    axios.get(url)
      .then((response) => {
        console.log(response.data)
        if (response.data.length) {
          const character = response.data[0];
          console.log(character)
          const interestAppearance = isBreakingBad 
            ? character.appearance 
            : character.better_call_saul_appearance;
          const otherAppearance = !isBreakingBad 
            ? character.appearance 
            : character.better_call_saul_appearance;
          if (!interestAppearance.length) {
            setIsEmpty(true)
          } 
          if (otherAppearance.length) {
            setIsFromOtherShow(true)
          }
          setAppearance(interestAppearance);
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
        console.log(error);
      });
  },
  [params]);

  const handleSeasonClick = (season) => {
    history.push(`/show/${formattedShow}`, { season })
  }

  const handleChangeShowClick = () => {
    history.push(`/character/${isBreakingBad ? 'Better+Call+Saul' : 'Breaking+Bad'}/${formattedName}`)
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
            {isFromOtherShow && <a onClick={() => handleChangeShowClick()}>
              Revisa en {isBreakingBad ? 'Better Call Saul' : 'Breaking Bad'
            }</a>}
            </Container>
          ) : (
            <Container>
              {isFromOtherShow ? (
              <Button onClick={() => handleChangeShowClick()}>Ver en {isBreakingBad ? 'Better Call Saul' : 'Breaking Bad'}</Button>): (
                <Container/>
              )}
              <Container>
                <p>{name}</p>
                <p>{nickname}</p>
                <p>{portrayed}</p>
                <p>{status}</p>
              </Container>
              <Container>

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
                <h3>Temporadas</h3>
                <List hover>
                  {appearance.map((item, index) => (
                    <List.Item key={index.toString()} index={index} onClick={() => handleSeasonClick(item)}>
                      {item}
                    </List.Item>
                  ))}
                </List>
              </Container>

            </Container>
          )}
        </Container>
      )}
    </Container>
  )
}

export default Character;