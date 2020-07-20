/* eslint-disable */
import React from 'react';
import { Modal, Button, Box, MessageBoxFunctionalLayout } from 'wix-style-react';

class SimpleExample extends React.Component {
  state = {
    isModalOpened: false,
  };

  openModal = () => this.setState({ isModalOpened: true });

  closeModal = () => this.setState({ isModalOpened: false });

  render() {
    const { isModalOpened } = this.state;
    return (
      <Box>
        <Button onClick={this.openModal}>Open Modal</Button>
        <Modal isOpen={isModalOpened} onRequestClose={this.closeModal}>
          <MessageBoxFunctionalLayout
            confirmText="Leave this page"
            onOk={this.closeModal}
            onClose={this.closeModal}
            title="Leave Without Saving?"
          >
            If you leave now, changes you have made here won't be saved. Are you
            sure you want to leave?
          </MessageBoxFunctionalLayout>
        </Modal>
      </Box>
    );
  }
}
