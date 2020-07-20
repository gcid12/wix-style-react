/* eslint-disable */
import React from 'react';
import { Modal, Button, Box } from 'wix-style-react';

class ModalWithCloseButton extends React.Component {

  state = {
    isModalOpened: false,
  };

  openModalWithCloseButton = () => this.setState({ isModalOpened: true });

  closeModalWithCloseButton = () => this.setState({ isModalOpened: false });

  render(){
    const { isModalOpened } = this.state;
    return <Box>
      <Button onClick={this.openModalWithCloseButton}>
        Open Modal With Close Button
      </Button>
      <Modal
        isOpen={isModalOpened}
        onRequestClose={this.closeModalWithCloseButton}
        shouldDisplayCloseButton
      >
        <Box verticalAlign="middle" height="100%">
          <img src="https://i.ibb.co/C8HHTJx/rectangle-2x.png" width="100%" height="550px" />
        </Box>
      </Modal>
    </Box>
  }
}