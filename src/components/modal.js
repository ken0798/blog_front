import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BlogForm = styled("form")({
  display: "flex",
  gap: "20px",
  flexDirection: "column",
  width: "100%",
});

function UpdateBlog({ open, closeHandle, edit, data, fetchList }) {
  const [fields, setFields] = useState({
    title: data?.title ?? "",
    info: data?.info ?? "",
  });
  const token = localStorage.getItem("token");
  function handleChange(e) {
    setFields((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  }

  async function onSubmission(e) {
    e.preventDefault();
    try {
      if (edit !== "edit") {
        const { data: response, status } = await axios.post(
          "/blog/create",
          {
            ...fields,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (status === 201) {
          toast.success(response.message);
          fetchList();
        }
      } else {
        const { data: response, status } = await axios.put(
          `/blog/${data._id}`,
          {
            ...fields,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (status === 201) {
          toast.success(response.message);
          fetchList();
        }
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something Went Wrong!!");
    }
    closeHandle();
  }

  const isDisable = Object.values(fields).some((e) => e.length < 1);

  return (
    <Modal
      sx={{ background: "rgba(0,0,0,0.2)" }}
      open={open}
      onClose={closeHandle}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          borderRadius: 1,
          p: 2,
        }}
      >
        <Stack
          mb={2}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDirection={"row"}
        >
          <Typography>
            {edit === "edit" ? "Update" : "Create"} the Blog
          </Typography>
          <IconButton onClick={closeHandle}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <BlogForm onSubmit={onSubmission}>
          <TextField
            name="title"
            value={fields.title}
            onChange={handleChange}
            label="Title"
          />
          <TextField
            name="info"
            value={fields.info}
            onChange={handleChange}
            multiline={true}
            maxRows={6}
            label="Message"
          />
          <div style={{ alignSelf: "flex-end" }}>
            <Button
              sx={{ mr: 1 }}
              color="secondary"
              variant="outlined"
              type="reset"
            >
              Clear
            </Button>
            <Button
              disabled={isDisable}
              color="success"
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </BlogForm>
      </Box>
    </Modal>
  );
}

export default UpdateBlog;
