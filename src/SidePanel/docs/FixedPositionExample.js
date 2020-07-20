/* eslint-disable */
import React from 'react';
import { Button, Box } from 'wix-style-react';

class SimpleExample extends React.Component {
  state = {
    right: -440
  };

  openPanel = () => this.setState({ right: 0 });

  closePanel = () => this.setState({ right: -440 });

  render() {
    const { right } = this.state;
    return (
      <Box>
        <Button onClick={this.openPanel}>Open Panel</Button>
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: `${right}px`,
            height: '100%',
            boxShadow:
              '0 3px 24px 0 rgba(22, 45, 61, 0.18), 0 8px 8px 0 rgba(22, 45, 61, 0.12)',
            zIndex: 1,
            transition: 'right 0.4s ease 0s',
          }}
        >
          <SidePanel title="Filters Panel" onCloseButtonClick={this.closePanel}>
            <SidePanel.Header>
              <Tabs
                items={[
                  { id: 1, title: 'Selected Tab' },
                  { id: 2, title: 'Second Tab' },
                ]}
                activeId={1}
                type="uniformSide"
                width="174px"
              />
            </SidePanel.Header>
            <Accordion
              items={[
                {
                  title: 'Payment Status',
                  children: (
                    <RadioGroup value={1}>
                      <RadioGroup.Radio value={1}>Option 1</RadioGroup.Radio>
                      <RadioGroup.Radio value={2}>Option 2</RadioGroup.Radio>
                      <RadioGroup.Radio value={3}>Option 3</RadioGroup.Radio>
                    </RadioGroup>
                  ),
                },
                {
                  title: 'Dates',
                  children: (
                    <Box>
                      <DatePicker onChange={e => e} placeholderText="Select Date" />
                    </Box>
                  ),
                },
                {
                  title: 'Product',
                  children: (
                    <>
                      <Box direction="vertical" marginBottom={2}>
                        <Search
                          value=""
                          options={[]}
                          placeholder="Search for products by name"
                        />
                      </Box>
                      <ListItemSelect
                        prefix={
                          <Box>
                            <Icons.Toolbox />
                          </Box>
                        }
                        title="Product 1"
                        subtitle="Subtitle"
                      />{' '}
                      <ListItemSelect
                        prefix={
                          <Box>
                            <Icons.Toolbox />
                          </Box>
                        }
                        title="Product 2"
                        subtitle="Subtitle"
                      />{' '}
                      <ListItemSelect
                        prefix={
                          <Box>
                            <Icons.Toolbox />
                          </Box>
                        }
                        title="Product 3"
                        subtitle="Subtitle"
                      />
                    </>
                  ),
                },
              ]}
            />
            <SidePanel.Footer>
              <Box align="right">
                <Box marginRight={1}>
                  <Button onClick={this.closePanel} priority="secondary">
                    Cancel
                  </Button>
                </Box>
                <Box>
                  <Button onClick={this.closePanel}>Apply</Button>
                </Box>
              </Box>
            </SidePanel.Footer>
          </SidePanel>
        </div>
      </Box>
    );
  }
}
