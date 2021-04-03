import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Container, List, Loader } from 'rsuite';
import axios from 'axios';
import moment from 'moment';

const Episode = ({
  commonApiUrl,
}) => {
  const params = useParams();
  const episodeId = params.id;
  const history = useHistory()
  const url = `${commonApiUrl}/episodes/${episodeId}`;
  const [isLoading, setIsLoading] = useState(true);
  const [airDate, setAirDate] = useState('');
  const [title, setTitle] = useState('');
  const [season, setSeason] = useState('');
  const [episodeNumber, setEpisodeNumber] = useState('');
  const [serie, setSerie] = useState('');
  const [characters, setCharacteers] = useState([]);

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        const episode = response.data[0];
        setAirDate(episode.air_date);
        setTitle(episode.title);
        setSeason(episode.season);
        setEpisodeNumber(episode.episode);
        setSerie(episode.series);
        setCharacteers(episode.characters);
        setIsLoading(false);
      })
      .catch((error) => {
        history.push('/error', { error })
      });
  },
  []);

  const handleCharacterClick = (character) => {
    history.push(`/character/${serie.replace(/ /g, '+')}/${character.replace(/ /g, '+')}`)
  }

  return (
    <Container>
      {isLoading ? (
        <Loader center content="Cargando" />
      ) : (
        <Container>
          <Container>
            <h2>
              {season}
              x
              {episodeNumber}
              {' '}
              -
              {' '}
              {title}
            </h2>
          </Container>
          <Container>
            <p>
              Lanzada:
              {moment(airDate).format('dd-mm-yyyy')}
            </p>
            <p>
              {serie}
            </p>
            <List hover>
              {characters.map((item, index) => (
                <List.Item key={index.toString()} index={index} onClick={() => handleCharacterClick(item)}>
                  {item}
                </List.Item>
              ))}
            </List>
          </Container>
        </Container>

      )}
    </Container>
  );
};

export default Episode;
