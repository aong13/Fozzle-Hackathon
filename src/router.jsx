import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import useAuthStore from "./stores/useAuthStore";
import Home from "./pages/Home";
import Guest from "./pages/Guest";
import Upload from "./pages/Upload";
import MyPage from "./pages/MyPage";
import Relay from "./pages/relay/Relay";
import RelayLayout from "./pages/relay/RelayLayout";

const PrivateRoute = ({ element }) => {
  const { user } = useAuthStore();
  return user ? element : <Navigate to="/" replace />;
};

const ProtectedRoute = ({ element, redirectTo }) => {
  const isLoggedIn = sessionStorage.getItem("userName");
  if (isLoggedIn) {
    return element;
  }
  return <Navigate to={redirectTo} replace />;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute element={<Home />} redirectTo="/guest-login" />
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/guest-login" element={<Guest />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/mypage" element={<PrivateRoute element={<MyPage />} />} />
        <Route path="/relay/:relayId" element={<RelayLayout />}>
          <Route path="story/:storyId" element={<Relay />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
