import { Button, TextField, Typography } from "@mui/material";
import { RootSection } from "../components";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { setCred } = useContext(AuthContext);
  const nav = useNavigate();
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });
  async function onSubmission(e) {
    const { email, password } = fields;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    e.preventDefault();
    try {
      const { data, status } = await axios.post(
        "/user/auth",
        {
          email,
          password,
        },
        config
      );
      const dataObject = {
        name: data.name,
        pic: data.pic,
        token: data.token,
      };
      if (status === 200) {
        toast.success("Successfully logged in");
        localStorage.setItem("token", data.token);
        localStorage.setItem("pic", data.pic);
        nav("/");
        setCred(dataObject);
      }
      console.log(dataObject);
    } catch (error) {
      toast.error(error?.response.data?.message || "sorry");
    }
    clearFields();
  }
  function handleFields(e) {
    setFields((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  }
  function clearFields() {
    setFields({
      email: "",
      password: "",
    });
  }
  const disable = Object.values(fields).some((each) => each.length < 1);
  return (
    <RootSection>
      <div>
        <Typography>Login</Typography>
        <div className="cred__container">
          <form className="form" onSubmit={onSubmission}>
            <TextField
              name="email"
              value={fields.email}
              type="email"
              label="Email"
              onChange={handleFields}
            />
            <TextField
              name="password"
              value={fields.password}
              type="password"
              label="Password"
              onChange={handleFields}
            />
            <Button disabled={disable} type="submit" variant="contained">
              Login
            </Button>
            <a className="link" href="/create">
              Not a user?
            </a>
          </form>
        </div>
      </div>
    </RootSection>
  );
}

export default LoginPage;
