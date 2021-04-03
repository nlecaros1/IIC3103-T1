import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useHistory } from 'react-router';
import { Container, Divider, Loader, Panel, Button} from 'rsuite';
import colors from '../styles/colors';
import Show from './show'

const Home = ({
  commonApiUrl
}) => {
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
  

  const history = useHistory();
  const [width, height] = useMediaQuery();

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
          alt=""
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
          imageSource="https://i.blogs.es/6d84c8/breaking-bad/1366_2000.jpg"
          index="1"
          height={height/2 - 50}
          width={width}
        />
        <Card 
          name="Better Call Saul"
          url="/show/Better+Call+Saul"
          imageSource="http://www.srgeekarg.com/wp-content/uploads/2020/04/Better-Call-Saul-temporada-cinco-min.jpg"
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
};

export default Home;