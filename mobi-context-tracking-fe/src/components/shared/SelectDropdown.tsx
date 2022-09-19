import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Dispatch, SetStateAction } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  dropdownValues: string[];
  selectedDropdownValue: string;
  setSelectedDropdownValue: Dispatch<SetStateAction<string>>;
  label?: string;
}

const SelectDropdown = (props: Props) => {
  const handleChange = (
    event: SelectChangeEvent<typeof props.selectedDropdownValue>
  ) => {
    const {
      target: { value },
    } = event;
    props.setSelectedDropdownValue(value);
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel id="demo-checkbox-label">{props.label}</InputLabel>
      <Select
        labelId="demo-checkbox-label"
        id="demo-checkbox"
        value={props.selectedDropdownValue || null}
        onChange={handleChange}
        input={<OutlinedInput label={props.label} />}
        MenuProps={MenuProps}
      >
        {props.dropdownValues.map((value) => (
          <MenuItem key={value} value={value}>
            <ListItemText primary={value} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export { SelectDropdown };
