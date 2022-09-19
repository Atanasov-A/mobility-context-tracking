import { Box } from "@mui/material";

const LocationSearchHelperText = () => {
  return (
    <>
      <Box sx={{ mt: 1 }}>
        Please enter the location(only DACH region locations) in the following
        format. A{" "}
        <Box component="span" sx={{ fontWeight: "bold" }}>
          city
        </Box>{" "}
        and a{" "}
        <Box component="span" sx={{ fontWeight: "bold" }}>
          street/location
        </Box>{" "}
        name.
      </Box>
      <Box sx={{ mb: 2 }}>
        Example input:{" "}
        <Box component="span" sx={{ fontWeight: "bold" }}>
          Karlsruhe Moltkestr/Schloss
        </Box>
      </Box>
    </>
  );
};

export { LocationSearchHelperText };
