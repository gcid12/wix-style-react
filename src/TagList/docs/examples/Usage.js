/* eslint-disable */

function Usage() {
  const [currentTags, setTags] = React.useState([
    { id: '1', children: 'In Progress', onRemove: () => removeTag(1) },
    { id: '2', children: 'Canceled By Client', onRemove: () => removeTag(2) },
    { id: '3', children: 'Last 7 Days', onRemove: () => removeTag(3) },
  ]);
  const clearAll = () => setTags([]);
  const removeTag = tagId =>
    setTags(currentTags.filter(({ id }) => id !== tagId));

  return (
    <FormField label="Applied filters:">
      <TagList
        tags={currentTags}
        actionButton={{ label: 'Clear All', onClick: clearAll }}
      />
    </FormField>
  );
}
