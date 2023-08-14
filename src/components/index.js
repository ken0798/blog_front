import styled from "@emotion/styled";

export const RootSection = styled("section")({
  display: "flex",
  justifyContent: "center",
  "& > div": {
    width: "100%",
    maxWidth: "1080px",
    padding: 10,
  },
});
