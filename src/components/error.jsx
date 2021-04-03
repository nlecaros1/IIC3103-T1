import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Button, Container } from 'rsuite';

const ErrorComponent = ({
}) => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/');
  }
  return(
    <Container>
      <h2>Lo sentimos, hubo un error. Trate nuevamente.</h2>
      <Button onClick={handleClick} >Inicio</Button>
      </Container>
  )
}

export default ErrorComponent;