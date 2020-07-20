/* eslint-disable */

import React from 'react';
import { Container, Row, Col, Card, Button, TextButton, EmptyState } from 'wix-style-react';

class EmptyStateExample extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header
                title="Card title"
                suffix={<Button prefixIcon={<Icons.Add />}>New Item</Button>}
              />
              <Card.Content>
                <EmptyState
                  title="You don't have any items yet"
                  subtitle="Create your product item in an easy & fast way to display it on your site"
                  theme="section"
                >
                  <TextButton prefixIcon={<Icons.Add />}>New Item</TextButton>
                </EmptyState>
              </Card.Content>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
