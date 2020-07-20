import React from 'react';
import Edit from 'wix-ui-icons-common/Edit';
import Duplicate from 'wix-ui-icons-common/Duplicate';
import Upload from 'wix-ui-icons-common/Upload';

import {
  SelectionContextPropTypes,
  TableToolbar,
  ItemGroup,
  Item,
  SelectedCount,
  Divider,
  Card,
  Search,
  Button,
} from 'wix-style-react';

export class BulkActionsExample extends React.Component {
  render() {
    return (
      <Card>
        <BulkActionsToolbar selectedCount={12} />
      </Card>
    );
  }
}

const BulkActionsToolbar = props => (
  <TableToolbar>
    <ItemGroup position="start">
      <Item>
        <SelectedCount>{`${props.selectedCount} Selected`}</SelectedCount>
      </Item>
    </ItemGroup>
    <ItemGroup position="end">
      <Item layout="button">
        <Button
          theme="whiteblueprimary"
          prefixIcon={<Upload />}
          onClick={() =>
            window.alert(`Exporting selectedIds=${props.getSelectedIds()}`)
          }
        >
          Export
        </Button>
      </Item>
      <Item layout="button">
        <Button
          theme="whiteblueprimary"
          prefixIcon={<Duplicate />}
          onClick={() =>
            window.alert(`Duplicating selectedIds=${props.getSelectedIds()}`)
          }
        >
          Duplicate
        </Button>
      </Item>
      <Item layout="button">
        <Button
          theme="whiteblueprimary"
          prefixIcon={<Edit />}
          onClick={() =>
            window.alert(`Editing selectedIds=${props.getSelectedIds()}`)
          }
        >
          Edit
        </Button>
      </Item>
      <Divider />
      <Item>
        <Search expandable />
      </Item>
    </ItemGroup>
  </TableToolbar>
);
BulkActionsToolbar.propTypes = SelectionContextPropTypes;
