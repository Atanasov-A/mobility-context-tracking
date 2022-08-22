import Checkbox from "@mui/material/Checkbox";
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
  selectedDropdownValues: string[];
  setSelectedDropdownValues: Dispatch<SetStateAction<string[]>>;
  label?: string;
}

const MultiSelectDropdown = (props: Props) => {
  const handleChange = (
    event: SelectChangeEvent<typeof props.selectedDropdownValues>
  ) => {
    const {
      target: { value },
    } = event;
    props.setSelectedDropdownValues(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel id="demo-multiple-checkbox-label">{props.label}</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={props.selectedDropdownValues}
        onChange={handleChange}
        input={<OutlinedInput label={props.label} />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {props.dropdownValues.map((value) => (
          <MenuItem key={value} value={value}>
            <Checkbox
              checked={props.selectedDropdownValues.indexOf(value) > -1}
            />
            <ListItemText primary={value} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export { MultiSelectDropdown };
