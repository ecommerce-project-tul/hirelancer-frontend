import React, { memo } from 'react';
import { Autocomplete, TextField, Chip } from '@mui/material';

interface Props {
  className?: string;
  tags?: string[];
  setTags(newTags: string[]): void;
}

export const ChipInput = memo(({ tags, setTags, ...props }: Props) => {
  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={[]}
      defaultValue={[]}
      freeSolo
      value={tags}
      onChange={(_, value) => setTags(value)}
      renderTags={(
        value: string[],
        getTagProps: (arg0: { index: number }) => JSX.IntrinsicAttributes,
      ) =>
        value.map((option: string, index: number) => {
          return (
            <Chip
              key={index}
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          );
        })
      }
      renderInput={params => (
        <TextField
          {...params}
          label="Tagi"
          placeholder="Tagi oddzielone enterem"
        />
      )}
      {...props}
    />
  );
});
