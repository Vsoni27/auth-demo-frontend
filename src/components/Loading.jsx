import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Stack } from "@mui/material";

export const Loading = () => {
  return (
    <Stack sx={{ height: "100vh", width: "100vw", bgcolor: "#000" }} alignItems="center" justifyContent="center">
      <LinearProgress sx={{width: "50%", height: "5px"}} />
    </Stack>
  );
};

// export default Loading;