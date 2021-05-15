import * as React from 'react';
import {
  Checkbox,
  Chip,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';
import { DocumentsManageTexts } from '../../constants/documentsManageTexts';
import { ChangeEvent, useCallback } from 'react';

interface IProps {
  userTags: string[];
  value: string[];
  onChange: (newValue: string[]) => void;
}

const useStyles = makeStyles({
  wrapper: {
    marginTop: 16,
    width: '100%',
  },
});

export function UserTagsSelect({
  userTags,
  onChange,
  value,
}: IProps): JSX.Element {
  const classes = useStyles();
  const handleChange = useCallback(
    (event: ChangeEvent<{ name: string; value: string[] }>) => {
      onChange(event.target.value);
    },
    [event],
  );
  const selectValueRenderer = useCallback(
    (selected) => (
      <div>
        {selected.map((val: string) => (
          <Chip key={val} label={val} />
        ))}
      </div>
    ),
    [value],
  );

  return (
    <FormControl className={classes.wrapper}>
      <InputLabel id="tags-filter">
        {DocumentsManageTexts.DocumentsFiltersTagsSelectLabel}
      </InputLabel>
      <Select
        labelId="tags-filter"
        onChange={handleChange}
        value={value}
        multiple={true}
        input={<Input />}
        renderValue={selectValueRenderer}
      >
        {userTags.map((tag) => (
          <MenuItem key={tag} value={tag}>
            <Checkbox checked={value.indexOf(tag) !== -1} />
            <ListItemText primary={tag} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
