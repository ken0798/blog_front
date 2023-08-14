import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./modules/Login";
import SignupPage from "./modules/Signup";
import BlogsPage from "./modules/Blogs";
import BlogPage from "./modules/Blog";
function RouterLayer() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={BlogsPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/create" Component={SignupPage} />
        <Route path="/blog/:id" Component={BlogPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterLayer;
