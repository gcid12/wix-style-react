/* eslint-disable */
import React from 'react';

import {
  Page,
  Button,
  Card,
  Breadcrumbs,
  Box,
  PopoverMenu,
  IconButton,
  Row,
  Col,
  Container,
} from 'wix-style-react';

class ExampleGeneralLayout extends React.Component {
  renderHeader() {
    const ActionBar = () => {
      return (
        <Box>
          <Box>
            <PopoverMenu
              triggerElement={
                <IconButton skin="inverted">
                  <Icons.More />
                </IconButton>
              }
            >
              <PopoverMenu.MenuItem onClick={() => {}} text="Refresh" />
              <PopoverMenu.MenuItem onClick={() => {}} text="Trash" />
            </PopoverMenu>
          </Box>
          <Box marginLeft="small" marginRight="small">
            <Button skin="light">Cancel</Button>
          </Box>
          <Box>
            <Button>Save</Button>
          </Box>
        </Box>
      );
    };

    return (
      <Page.Header
        title="Page Title"
        breadcrumbs={
          <Breadcrumbs
            items={[1, 2, 3].map(i => ({ id: `${i}`, value: `Page ${i}` }))}
            activeId="3"
            size="medium"
            theme="onGrayBackground"
            onClick={() => {}}
          />
        }
        actionsBar={<ActionBar />}
      />
    );
  }

  render() {
    const ExampleContent = () => <div style={{ height: '550px' }} />;

    return (
      <Page height="372px">
        {this.renderHeader()}
        <Page.Content>
          <Container>
            <Row>
              <Col>
                <Card>
                  <Card.Header title="Card Title" />
                  <Card.Content>
                    <ExampleContent />
                  </Card.Content>
                </Card>
              </Col>
            </Row>
          </Container>
        </Page.Content>
      </Page>
    );
  }
}

export default ExampleGeneralLayout;
