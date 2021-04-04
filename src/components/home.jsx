// La función useMediaQuery fue obtenida de https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react

import React, { useState, useLayoutEffect } from 'react';
import { useHistory } from 'react-router';
import { Container,  Panel, Button} from 'rsuite';

const Home = ({}) => {
  const useMediaQuery = () => {
    const [screenSize, setScreenSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateScreenSize() {
        setScreenSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateScreenSize);
      updateScreenSize();
      return () => window.removeEventListener('resize', updateScreenSize);
    }, []);
    return screenSize;
  };

  const [width, height] = useMediaQuery();
  const history = useHistory();

  const Card = ({
    name, url, index, imageSource,height, width
  }) => (
    <Button
      appearance="subtle"
      key={index}
      style={styles.card}
      onClick={() => {
        history.push(url, { name });
      }}
    >
      <Panel
        key={index}
        bodyFill
        style={{...styles.panel, height}}
      >
        <img
          src={imageSource}
          height={height}
          style={styles.image}
          alt={name}
          width={width}
        />
        <p style={styles.text}>
          {name}
        </p>
      </Panel>
    </Button>
  );

  return(
    <Container >
      <Container >
        <Card 
          name="Breaking Bad"
          url="/show/Breaking+Bad"
          imageSource="/images/breaking_bad.jpeg"
          index="1"
          height={height/2 - 50}
          width={width}
        />
        <Card 
          name="Better Call Saul"
          url="/show/Better+Call+Saul"
          imageSource="/images/better_call_saul.jpeg"
          index="2"
          height={height/2 - 50}
          width={width}
        />
      </Container>
    </Container>
  )
}

const styles = {
  title: { textAlign: 'center', fontSize: 20, marginBottom: 15 },
  card: {
    flex: 1, width: '100%', hover: 'pointer',
  },
  panel: {
    display: 'inline-block', position: 'relative', width: '100%', flex: 1
  },
  image: { objectFit: 'cover', filter: 'brightness(70%)', alignSelf: 'center' },
  title: { textAlign: 'center', fontSize: 20,  alignSelf: 'center', justifySelf: 'center' },
};

export default Home;