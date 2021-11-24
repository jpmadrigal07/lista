import { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import InOut from "./pages/Money/InOut";
import Edit from "./pages/Money/Edit";
import Remove from "./pages/Money/Remove";
import { pageTitle } from "./constant";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import NavbarTop from "./components/Navbar/NavbarTop";
import TopAlert from "./components/Alert/TopAlert";
import { I_Global, I_AppProps } from "./interfaces/global";

const App = (props: I_AppProps) => {
  const { gCurrentPage } = props;

  useEffect(() => {
    document.title = `${pageTitle} - ${gCurrentPage === "" ? "Home" : gCurrentPage}`;
  }, [gCurrentPage]);

  const renderRoutes = () => {
      return (
        <>
          <Route
            path="/"
            exact
            render={() => {
              return <Home />;
            }}
          />
          <Route
            path="/home"
            render={() => {
              return <Home />;
            }}
          />
          <Route
            path="/dashboard"
            render={() => {
              return <Dashboard />;
            }}
          />
          <Route
            path="/money/in"
            render={() => {
              return <InOut isIn={true} />;
            }}
          />
          <Route
            path="/money/out"
            render={() => {
              return <InOut isIn={false} />;
            }}
          />
          <Route
            path="/money/edit"
            render={() => {
              return <Edit />;
            }}
          />
          <Route
            path="/money/delete"
            render={() => {
              return <Remove />;
            }}
          />
        </>
      );
  };
  return (
    <Router>
      <NavbarTop />
      <TopAlert />
      {renderRoutes()}
    </Router>
  );
};

const mapStateToProps = (gState: I_Global) => ({
  gCurrentPage: gState.navBar.currentPage,
});

export default connect(mapStateToProps)(App);
