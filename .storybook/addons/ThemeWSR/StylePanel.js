import React from 'react';
import { Col, Container, Row } from '../../../src/Grid';
import { ColorInput, FormField } from '../../../src';

class StylePanel extends React.PureComponent {
  state = {
    color: '#2B81CB', // B00
  };

  getThemeFromState() {
    const { color } = this.state;
    return {
      '--wsr-color-10': color,
    };
  }

  onChange(state) {
    const { onChange } = this.props;

    this.setState(state, () => {
      onChange && onChange(this.getThemeFromState());
    });
  }

  render() {
    const { color } = this.state;
    return (
      <Container fluid>
        <Row>
          <Col>
            <FormField label="Color">
              <ColorInput
                value={color}
                onChange={color => this.onChange({ color })}
              />
            </FormField>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default StylePanel;
