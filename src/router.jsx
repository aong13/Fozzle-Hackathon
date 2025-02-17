import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import useAuthStore from "./stores/useAuthStore";
import Home from "./pages/Home";
import Search from "./pages/Search";
import UploadRelay from "./pages/UploadRelay";
import UploadTickle from "./pages/UploadTickle";
import MyPage from "./pages/MyPage";
import Relay from "./pages/relay/Relay";
import RelayLayout from "./pages/relay/RelayLayout";

const PrivateRoute = ({ element }) => {
  const { user } = useAuthStore();
  return user ? element : <Navigate to="/" replace />;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/upload/relay"
          element={<PrivateRoute element={<UploadRelay />} />}
        />
        <Route
          path="/upload/tickle"
          element={<PrivateRoute element={<UploadTickle />} />}
        />
        <Route path="/mypage" element={<PrivateRoute element={<MyPage />} />} />
        <Route path="/relay/:relayId" element={<RelayLayout />}>
          <Route path="story/:storyId" element={<Relay />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
