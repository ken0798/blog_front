import { useState } from "react";
import { IconButton, Popover, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styled from "@emotion/styled";
import toast from "react-hot-toast";
import axios from "axios";
const Pencil = styled(IconButton)({
  // position: "absolute",
  //   display: "none",
  alignSelf: "flex-start",
  width: "40px",
  height: "40px",
});

const Items = styled(Typography)({
  padding: "16px",
  cursor: "pointer",
  "&:hover": {
    opacity: 0.5,
  },
  "&:not(:last-of-type)": {
    borderBottom: "1px solid #ddd",
  },
});

export default function UserPopover({ editModal, id: blogId, fetchList }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const token = localStorage.getItem("token");
  const handleDelete = async () => {
    handleClose();
    if (!token) toast.error("Sorry you cannot delete it, Please Login!");
    try {
      const { data } = await axios.delete(`/blog/${blogId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(data.message);
      fetchList();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <Pencil aria-describedby={id} onClick={handleClick}>
        <MoreVertIcon />
      </Pencil>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Items
          onClick={() => {
            editModal("edit", blogId);
            handleClose();
          }}
        >
          Edit
        </Items>
        <Items onClick={handleDelete}>Delete</Items>
      </Popover>
    </>
  );
}
