import React from 'react';

import Add from 'wix-ui-icons-common/Add';
import { ExamplePageContainer } from './ExamplePageContainer';
import { LongTextContent } from './SomeContentComponent';

import { Page, Button, Card, Container, Row, Col } from 'wix-style-react';

const ExampleStandard = () => (
  <ExamplePageContainer>
    <Page>
      <Page.Header
        title="Your Product"
        actionsBar={<Button prefixIcon={<Add />}>New Item</Button>}
      />

      <Page.Content>
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Header title="Catchy Header" />
                <Card.Divider />
                <Card.Content>
                  <LongTextContent />
                </Card.Content>
              </Card>
            </Col>
          </Row>
        </Container>
      </Page.Content>
    </Page>
  </ExamplePageContainer>
);

export default ExampleStandard;
