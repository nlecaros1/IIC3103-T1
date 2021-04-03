import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import {
  Navbar, Dropdown, Alert, Nav,InputGroup,Input, Container
} from 'rsuite';
import { Icon } from 'rsuite';
// import Nav from '@rsuite/responsive-nav';
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
    <Navbar appearance="default">
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
            Heisenberg
          </Nav.Item>
        </Nav>
        <Nav pullRight>
          <Container style={{alignSelf: 'center', justifySelf: 'center', alignItems: 'center', justifyContent: 'center', justifyItems: 'center', backgroundColor: 'red'}}>
            <InputGroup style={{alignSelf: 'center', justifySelf: 'center', alignItems: 'center', justifyContent: 'center', justifyItems: 'center',}}>
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
  width: 300,
  marginBottom: 10,
  alignSelf: 'center',
  justifySelf: 'center'
};
export default Toolbar;