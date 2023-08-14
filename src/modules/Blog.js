import { Avatar, Stack, Typography } from "@mui/material";
import { RootSection } from "../components";
import { useParams } from "react-router-dom";
import Header from "../components/header";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/user";
import axios from "axios";
import LoaderBox from "../components/loader";
import toast from "react-hot-toast";
import styled from "@emotion/styled";
import moment from "moment";

const Blogger = styled("div")({
  display: "flex",
  gap: "20px",
  paddingBlock: 4,
  marginBlockEnd: 8,
  "&:not(:last-of-type)": {
    borderBottom: "1px solid #ddd",
  },
});

function BlogPage() {
  const { id } = useParams();
  const { loading, setLoad } = useContext(AuthContext);
  const [Blog, setBlog] = useState(null);
  useEffect(() => {
    (async function () {
      setLoad(true);
      try {
        const { data } = await axios.get(`/blog/${id}`);
        console.log(data);
        setBlog(data);
        setLoad(false);
      } catch (error) {
        setLoad(false);
        toast.error(error.response.data?.message || "Error Ocurred");
      }
    })();
  }, []);
  if (loading) {
    return <LoaderBox />;
  }
  return (
    <RootSection>
      <div>
        <Header />
        <Blogger>
          <Avatar title="Name" src={Blog?.user?.pic || null} alt="/"></Avatar>
          <div>
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              mb={2}
            >
              <Typography color={"Highlight"}>{Blog?.title}</Typography>
              <Typography sx={{ color: "#b6b8ba" }}>
                {moment(Blog?.createdAt).format("LL")}
              </Typography>
            </Stack>
            <Typography gutterBottom>{Blog?.info}</Typography>
            <Typography sx={{ color: "#b6b8ba" }}>
              Created by {Blog?.user?.author}
            </Typography>
          </div>
        </Blogger>
      </div>
    </RootSection>
  );
}

export default BlogPage;
