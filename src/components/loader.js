import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
const Progress = styled("div")({
  display: "flex",
  minHeight: "100vh",
  alignItems: "center",
  justifyContent: "center",
});

export default function LoaderBox() {
  return (
    <Progress>
      <CircularProgress />
    </Progress>
  );
}
