import React, { memo, useState } from 'react';
import { Autocomplete, TextField, Chip } from '@mui/material';

interface Props {
  className?: string;
}

export const ChipInput = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tags, setTags] = useState<string[]>([] as string[]);

  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={[]}
      defaultValue={[]}
      freeSolo
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
