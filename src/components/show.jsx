import React, { useState, useEffect } from 'react';
import { Container, Loader, Tree } from 'rsuite';
import axios from 'axios'
import { useHistory, useParams } from 'react-router';

const Show = ({
  commonApiUrl, location,
}) => {
  const history = useHistory()
  const params = useParams();
  const name = location?.state?.name;
  let expandedSeason = location?.state?.season;
  if (expandedSeason) {
    expandedSeason = expandedSeason.toString()
  }
  console.log('Expanded', expandedSeason, typeof expandedSeason)
  const {id: formattedName } = params;
  const url = `${commonApiUrl}/episodes?series=${formattedName}`
  const [isLoading, setIsLoading] = useState(true);
  const [seasons, setSeasons] = useState({});

  const formatDataToSeasons = (data) => {
    const temporalSeasons = {}
    data.forEach((episode) => {
      const episodeSeason = episode.season;
      if (episodeSeason in temporalSeasons) {
        temporalSeasons[episodeSeason].children.push(formatEpisodeToTree(episode))
      } else {
        temporalSeasons[episodeSeason] = {
          label: `Temporada ${episodeSeason}`,
          value: episodeSeason,
          children: [formatEpisodeToTree(episode)]
      }
      console.log(temporalSeasons[episodeSeason])
    }});
    return temporalSeasons;
  }

  const formatEpisodeToTree = (episode) => ({
    label: `${episode.title}`,
    value: episode.episode_id,
  })

  const formatSeasonsToTree = (seasons) => {
    const seasonAsArray = [];
    Object.keys(seasons).forEach((seasonNumber) => {
      seasonAsArray.push(seasons[seasonNumber])
    })
    return(seasonAsArray)
  }

  useEffect(() => {
    axios.get(url)
      .then((response) => {
          const temporalSeasonsAsObject = formatDataToSeasons(response.data)
          const temporalSeasonsAsArray = formatSeasonsToTree(temporalSeasonsAsObject)
          setSeasons(temporalSeasonsAsArray);
          setIsLoading(false)
      })
      .catch(function (error) {
        console.log(error);
      })
    }, 
  []);

  const handleSelect = (event) => {
    console.log(event)
    const eventNameAsArray = event.label.split(' ');
    if (eventNameAsArray[0] !== 'Temporada') {
      history.push(`/episode/${event.value}`)
    }
  }
  return(
    <Container style={{height: '100%', backgroundColor: 'blue'}}>
      <h2>{name}</h2>
      {isLoading ? 
      <Loader center content="Cargando"/> 
    : <Tree data={seasons} defaultExpandItemValues={[expandedSeason]} onSelect={handleSelect}/>}
    {console.log(seasons)}
    </Container>
  )
}

export default Show;