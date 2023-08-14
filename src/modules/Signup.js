import {
  Avatar,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { RootSection } from "../components";
import styled from "@emotion/styled";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/user";
import { useNavigate } from "react-router-dom";

const NameFields = styled("div")({
  display: "flex",
  gap: "8px",
  "@media(max-width:350px)": {
    flexDirection: "column",
  },
});

function SignupPage() {
  const { loading, setLoad } = useContext(AuthContext);
  const nav = useNavigate();
  const [fields, setFields] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [image, setImage] = useState(null);
  const imageRef = useRef(null);
  function handleFields(e) {
    setFields((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  }
  async function onSubmission(e) {
    e.preventDefault();
    try {
      const { data, status } = await axios.post(
        "/user/create",
        {
          ...fields,
          pic: image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (status === 200) {
        toast.success(data.message);
        nav("/login");
      }
    } catch (error) {
      toast.error(error.response.data?.message || "Error Occurred");
    }
    clearFields();
  }

  function clearFields() {
    setFields({
      fname: "",
      lname: "",
      email: "",
      password: "",
    });
    setImage("");
  }

  async function imageHandle(e) {
    const pic = e.target.files[0];
    setLoad(true);
    try {
      if (["image/jpeg", "image/png"].includes(pic.type)) {
        const dataForm = new FormData();
        dataForm.append("file", pic);
        dataForm.append("upload_preset", "blog-rc");
        dataForm.append("cloud_name", "hima0798");
        const { data, status } = await axios.post(
          "https://api.cloudinary.com/v1_1/hima0798/image/upload",
          dataForm
        );
        if (status === 200) toast.success("uploaded successfully");
        setImage(data.url);
        setLoad(false);
      }
    } catch (error) {
      setImage("");
      toast.error(error.response.data.message || "Something Went Wrong");
      setLoad(false);
    }
  }
  const disable =
    Object.values(fields).some((each) => each.length < 1) || loading;
  return (
    <RootSection>
      <div>
        <Typography>Register</Typography>
        <div className="cred__container">
          <form onSubmit={onSubmission} className="form">
            {!loading ? (
              <Avatar
                onClick={() => {
                  imageRef.current.click();
                }}
                sx={{
                  width: "64px",
                  height: "64px",
                }}
                src={image}
              />
            ) : (
              <CircularProgress size={20} />
            )}
            <input
              type="file"
              onChange={imageHandle}
              ref={imageRef}
              style={{ display: "none" }}
            />
            <NameFields>
              <TextField
                value={fields.fname}
                onChange={handleFields}
                name="fname"
                label="First Name"
              />
              <TextField
                value={fields.lname}
                onChange={handleFields}
                name="lname"
                label="Last Name"
              />
            </NameFields>
            <TextField
              value={fields.email}
              onChange={handleFields}
              type="email"
              name="email"
              label="email"
            />
            <TextField
              value={fields.password}
              onChange={handleFields}
              name="password"
              type="password"
              label="Password"
            />
            <Button type="submit" disabled={disable} variant="contained">
              Register
            </Button>
            <a className="link" href="/login">
              Already a user?
            </a>
          </form>
        </div>
      </div>
    </RootSection>
  );
}

export default SignupPage;
