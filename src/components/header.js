import AddIcon from "@mui/icons-material/Add";
import { Avatar, Button, IconButton } from "@mui/material";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/user";

const NavBar = styled("header")({
  display: "flex",
  alignItems: "center",
  height: 50,
  marginBottom: 10,
  justifyContent: "flex-end",
  gap: 8,
  borderBottom: "1px solid #ddd",
  // borderRadius: "8px",
});
function Header({ handleView }) {
  const livePath = useLocation();
  const { clearCred, pic } = useContext(AuthContext);
  const isLog = localStorage.getItem("token");
  const nav = useNavigate();
  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("pic");
    clearCred();
    nav("/");
  }
  return (
    <NavBar>
      <IconButton onClick={() => nav("/")}>
        <RssFeedIcon color="primary" />
      </IconButton>
      {livePath.pathname === "/" ? (
        <Button
          onClick={handleView.bind(null, "add")}
          variant="outlined"
          startIcon={<AddIcon />}
        >
          Create
        </Button>
      ) : null}
      {!isLog ? (
        <Button onClick={() => nav("/login")} variant="outlined">
          Login
        </Button>
      ) : (
        <>
          <Avatar src={pic} sx={{ width: "30px", height: "30px" }} />
          <Button onClick={logOut} variant="outlined">
            Logout
          </Button>
        </>
      )}
    </NavBar>
  );
}

export default Header;
