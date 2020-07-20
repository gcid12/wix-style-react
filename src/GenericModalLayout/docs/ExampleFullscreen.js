import React from 'react';

import styles from './ExampleFullscreen.scss';

import { Button, GenericModalLayout, Modal } from 'wix-style-react';

export default class ExampleFullscreen extends React.Component {
  constructor() {
    super();

    this.state = {
      isModalOpened: false,
    };
  }

  openModal() {
    this.setState({
      isModalOpened: true,
    });
  }

  closeModal() {
    this.setState({
      isModalOpened: false,
    });
  }

  render() {
    return (
      <div>
        <Button
          dataHook="open-fullscreen-generic-modal-layout-in-modal-button"
          onClick={() => this.openModal()}
        >
          Open Layout in Modal
        </Button>

        <Modal
          isOpen={this.state.isModalOpened}
          onRequestClose={() => this.closeModal()}
          contentLabel="Fullscreen generic modal layout"
          shouldDisplayCloseButton
        >
          <GenericModalLayout
            header={<div className={styles.header}>header</div>}
            content={<div className={styles.content}>content</div>}
            footer={<div className={styles.footer}>footer</div>}
            fullscreen
            dataHook="fullscreen-generic-modal-layout"
          />
        </Modal>
      </div>
    );
  }
}
