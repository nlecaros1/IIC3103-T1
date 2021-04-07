// La función useMediaQuery fue obtenida de https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react

import React, { useState, useLayoutEffect } from 'react';
import { useHistory } from 'react-router';
import { Container,  Panel, Button} from 'rsuite';
import colors from '../styles/colors';
import Show from './show';

const Home = ({
  location,
  commonApiUrl,
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

  const [width, height] = useMediaQuery();
  const openedShow = location?.state?.show;
  const [isBreakingBadOpen, setIsBreakingBadOpen] = useState(openedShow === 'Breaking Bad');
  const [isBetterCallSaulOpen, setIsBetterCallSaulOpen] = useState(openedShow === 'Better Call Saul');

  const Card = ({
    name, index, imageSource,height, width
  }) => (
    <Button
      appearance="subtle"
      key={index}
      style={styles.card}
      onClick={() => {
        name === 'Breaking Bad' 
         ? setIsBreakingBadOpen(!isBreakingBadOpen)
         : setIsBetterCallSaulOpen(!isBetterCallSaulOpen);
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
        {isBreakingBadOpen && (
          <Container style={styles.show}>
            <Show 
              commonApiUrl={commonApiUrl} 
              season={openedShow === 'Breaking Bad' ? location?.state?.season : undefined}
              showName='Breaking Bad'
            />
         </Container>
         )}
        <Card 
          name="Better Call Saul"
          url="/show/Better+Call+Saul"
          imageSource="/images/better_call_saul.jpeg"
          index="2"
          height={height/2 - 50}
          width={width}
        />
        {isBetterCallSaulOpen && (
          <Container style={styles.show}>
            <Show 
              commonApiUrl={commonApiUrl} 
              season={openedShow === 'Better Call Saul' ? location?.state?.season : undefined}
              showName='Better Call Saul'
            />
         </Container>
         )}
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
  show: { margin: 20, borderRadius: 10, backgroundColor: colors.clearGray, padding: 10}
};

export default Home;