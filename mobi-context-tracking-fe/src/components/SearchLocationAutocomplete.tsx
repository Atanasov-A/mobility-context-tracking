import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { searchLocation } from "../api/geoapify/locations/searchLocation";
import { GeoapifyLocation } from "../models/GeoapifyLocation";

interface Props {
  label: string;
  selectedValue: GeoapifyLocation;
  setSelectedValue: React.Dispatch<React.SetStateAction<GeoapifyLocation>>;
}

const SearchLocationAutocomplete = (props: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [autocompleteOptions, setAutocompleteOptions] = useState<
    readonly GeoapifyLocation[]
  >([]);

  useEffect(() => {
    const fetch = setTimeout(() => {
      fetchLocation();
    }, 1000);
    return () => clearTimeout(fetch);
  }, [inputValue]);

  const fetchLocation = async () => {
    if (inputValue.trim().length > 1) {
      const suggestedLocations: GeoapifyLocation[] = (
        await searchLocation(inputValue)
      ).data.results;
      setAutocompleteOptions(suggestedLocations);
    }
  };

  return (
    <>
      <Autocomplete
        filterOptions={(x) => x}
        freeSolo
        options={autocompleteOptions}
        getOptionLabel={(option: GeoapifyLocation) => option.formatted}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
            key={
              option.place_id ??
              ("0".repeat(6) + Math.floor(Math.random() * 10 ** 6)).slice(-6)
            }
          >
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.country_code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.country_code.toLowerCase()}.png 2x`}
              alt=""
            />
            {option.formatted}
          </Box>
        )}
        renderInput={(params) => <TextField {...params} label={props.label} />}
        value={props.selectedValue || null}
        onChange={(event: any, newValue: GeoapifyLocation | null) => {
          props.setSelectedValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        sx={{ mb: 3 }}
      />
    </>
  );
};

export { SearchLocationAutocomplete };
