import {
  Avatar,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import UpdateBlog from "../components/modal";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../components/header";
import { NoData } from "../components/noData";
import axios from "axios";
import { AuthContext } from "../context/user";
import UserPopover from "../components/popover";
import LoaderBox from "../components/loader";
import moment from "moment";
const Card = styled("div")({
  display: "flex",
  gap: "20px",
  paddingBlock: 4,
  marginBlockEnd: 8,
  "&:not(:last-of-type)": {
    borderBottom: "1px solid #ddd",
  },
});

const RootSection = styled("section")({
  display: "flex",
  justifyContent: "center",
  "& > div": {
    width: "100%",
    maxWidth: "1080px",
    padding: 10,
  },
});

const Blogs = styled("section")({
  marginLeft: 40,
});

function BlogsPage() {
  const { loading, setLoad } = useContext(AuthContext);
  const [view, setView] = useState({
    show: false,
    title: "",
  });
  const [blogData, setBlogData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const isLog = localStorage.getItem("token");
  const fetchBlogs = useCallback(async () => {
    setLoad(true);
    try {
      const { data, status } = await axios.get("/blog");
      if (status === 200) {
        setBlogs(data);
        setLoad(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong!");
      setLoad(false);
    }
  }, []);
  useEffect(() => {
    fetchBlogs();
  }, []);
  function handleView(type, blogId) {
    if (blogId) {
      const data = blogs.filter((e) => e._id === blogId);
      setBlogData(...data);
    }
    if (isLog)
      setView((pre) => ({
        show: !pre.show,
        title: type,
      }));
    else {
      toast.error(`Sorry,you can't ${type} it. Please login!`, { id: "error" });
    }
  }
  if (loading) {
    return <LoaderBox />;
  }
  return (
    <RootSection>
      <div>
        <Header handleView={handleView} />
        <Typography gutterBottom>Blogs</Typography>
        <Blogs>
          {blogs.length ? (
            blogs.map((item) => (
              <Card key={item._id}>
                <Avatar
                  title="Name"
                  src={item.user?.pic || null}
                  alt="/"
                ></Avatar>
                <div>
                  <Typography
                    to={`blog/${item._id}`}
                    color={"Highlight"}
                    sx={{ textDecoration: "none" }}
                    component={Link}
                  >
                    {item.title}
                  </Typography>
                  <Typography gutterBottom>
                    {item.info.length > 500
                      ? item.info.slice(0, 150) + "..."
                      : item.info}
                  </Typography>
                  <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Typography sx={{ color: "#b6b8ba" }}>
                      Author by {item.user.author}
                    </Typography>
                    <Typography sx={{ color: "#b6b8ba" }}>
                      {moment(item.createdAt).format("LL")}
                    </Typography>
                  </Stack>
                </div>
                <UserPopover
                  fetchList={fetchBlogs}
                  id={item._id}
                  editModal={handleView}
                />
              </Card>
            ))
          ) : (
            <NoData />
          )}
        </Blogs>
        {view.show ? (
          <UpdateBlog
            open={view.show}
            closeHandle={handleView}
            edit={view.title}
            data={blogData}
            fetchList={fetchBlogs}
          />
        ) : null}
      </div>
    </RootSection>
  );
}

export default BlogsPage;
