import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Navbar, Nav, InputGroup,Input, Container, Icon, Alert,
} from 'rsuite';
import colors from '../styles/colors';
import { useState, } from 'react';


const  Toolbar = ({}) => {
  const history = useHistory();
  const [searchText, setSearchText] = useState('');
  
  const submitSearch = () => {
    const formattedText = searchText.replace(/ /g, '+');
    if (formattedText.length > 0) {
      history.push(`/search/${formattedText}/0`)
    } else {
      Alert.error('Ingrese texto a buscar.')
    }
  }
  return (
    <Navbar appearance="default" style={styles.navbar}>
      <Navbar.Header>
        <Nav>
          <Nav.Item eventKey="1" componentClass={Link} to="/">
            <img
              style={styles.logo}
              src="/images/logo.png"
              alt="home"
              width="30"
            />
          </Nav.Item>
        </Nav>
      </Navbar.Header>
      <Navbar.Body>
        <Nav>
          <Nav.Item eventKey="1" componentClass={Link} to="/">
            <p style={styles.logoText}>SAY MY NAME</p>
          </Nav.Item>
        </Nav>
        <Nav pullRight>
          <Container style={styles.searchBoxContainer}>
            <InputGroup style={styles.searchBox}>
              <Input onChange={setSearchText} onPressEnter={submitSearch}/>
              <InputGroup.Addon>
                <Icon icon="search" onClick={submitSearch}/>
              </InputGroup.Addon>
            </InputGroup>
          </Container>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};

const styles = {
  logoText: { color: colors.white, fontWeight: 'bold' },
  logo: { marginTop: -5, alignSelf: 'center' },
  navbar: { backgroundColor: colors.black, color: colors.white },
  searchBox: { alignSelf: 'center', justifySelf: 'center', borderRadius: 10 },
  searchBoxContainer: { padding: 10 },
};
export default Toolbar;