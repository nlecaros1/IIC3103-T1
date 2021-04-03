import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Navbar, Nav, InputGroup,Input, Container, Icon,
} from 'rsuite';
import colors from '../styles/colors';
import { useState, } from 'react';


const  Toolbar = ({}) => {
  const history = useHistory();
  const [searchText, setSearchText] = useState('');
  
  const submitSearch = () => {
    const formattedText = searchText.replace(/ /g, '+');
    history.push(`/search/${formattedText}/0`)
  }
  return (
    <Navbar appearance="default" style={styles.navbar}>
      <Navbar.Header>
      {/* <Nav.Item eventKey="1" componentClass={Link} to="/" style={{alignContent: 'center', justifyContent: 'center'}}>
            <img
            style={{alignSelf: 'center'}}
            src="/images/logo.jpeg"
            alt="home"
            width="30"
            />
          </Nav.Item> */}
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
  navbar: { backgroundColor: colors.black, color: colors.white },
  searchBox: { alignSelf: 'center', justifySelf: 'center', borderRadius: 10 },
  searchBoxContainer: { padding: 10 },
};
export default Toolbar;