import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDraw from "./templates/PrimaryDraw";
import SecondaryDraw from "./templates/SecondaryDraw";
import Main from "./templates/Main";

const Home = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <PrimaryAppBar />
      <PrimaryDraw>
        <h3>Primary Draw</h3>
      </PrimaryDraw>
      <SecondaryDraw>
        <h3>Secondary Draw</h3>
      </SecondaryDraw>
      <Main>
        <h3>Main Draw</h3>
      </Main>
    </Box>
  );
};

export default Home;
