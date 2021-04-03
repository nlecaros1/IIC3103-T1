import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Container, Divider, Loader } from 'rsuite';
import Show from './show'

const Home = ({
  commonApiUrl
}) => {
  const history = useHistory();

  return(
    <Container >
      <Container>
        <a
          onClick={() => history.push('/show/Breaking+Bad', {name: 'Breaking Bad'})}
        >
          Breaking Bad
        </a>
      </Container>
      <Container>
        <a
          onClick={() => history.push('/show/Better+Call+Saul', {name: 'Better Call Saul'})}
        >
          Better Call Saul
        </a>
      </Container>
    </Container>
  )
}

export default Home;