import React, { memo, useState } from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";

export const ChipInput = memo(() => {
    const [tags, setTags] = useState<string[]>([]);

    return (
        <Autocomplete
            multiple
            id="tags-filled"
            options={[]}
            defaultValue={[]}
            freeSolo
            onChange={(_, value) => setTags(value)}
            renderTags={(
                value: any[],
                getTagProps: (arg0: { index: any }) => JSX.IntrinsicAttributes
            ) =>
                value.map((option: any, index: any) => {
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
            renderInput={(params: any) => (
                <TextField
                    {...params}
                    label="Tags"
                    placeholder="Tags separated by enter"
                />
            )}
        />
    );
});
