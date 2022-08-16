import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { findLocationBySearchTerm } from "../api/graphhopper/findLocation.get";
import { GraphhoperLocation } from "./models/GraphhoperLocation";

interface Props {
  label: string;
  selectedValue: GraphhoperLocation;
  setSelectedValue: React.Dispatch<React.SetStateAction<GraphhoperLocation>>;
}

const LocationSearchAutocomplete = (props: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [autocompleteOptions, setAutocompleteOptions] = useState<
    readonly GraphhoperLocation[]
  >([]);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  useEffect(() => {
    if (!firstRender) {
      const fetch = setTimeout(() => {
        fetchLocation();
        //Your search query and it will run the function after 3secs from user stops typing
      }, 1000);
      return () => clearTimeout(fetch);
    }
  }, [inputValue]);

  const fetchLocation = async () => {
    const suggestedLocations: GraphhoperLocation[] = (
      await findLocationBySearchTerm(inputValue)
    ).data.hits;

    setAutocompleteOptions(suggestedLocations);
  };

  return (
    <Autocomplete
      filterOptions={(x) => x}
      freeSolo
      options={autocompleteOptions}
      getOptionLabel={(option: GraphhoperLocation) => option.name}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.countrycode?.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.countrycode?.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.name} {option.city ? `(${option.city})` : ""}
          {option.state ? ` - ${option.state}` : ""}
        </Box>
      )}
      // options={autocompleteOptions.map((option) => option.name)}
      renderInput={(params) => <TextField {...params} label={props.label} />}
      value={props.selectedValue}
      onChange={(event: any, newValue: GraphhoperLocation | null) => {
        props.setSelectedValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      sx={{ mb: 1 }}
    />
  );
};

export { LocationSearchAutocomplete };
