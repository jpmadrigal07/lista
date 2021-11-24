import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Navbar.scss";
import { Navbar, Nav, Container } from "react-bootstrap";
import { gSetCurrentPage } from "../../actions/navbarActions";
import { I_NavBarLink, I_Global } from "../../interfaces/global";
import { triggerTopAlert } from "../../actions/topAlertActions";
import { navBarLinks, pageTitle } from "../../constant";
import _ from "lodash";

const NavbarTop = (props: any) => {
  const {
    gSetCurrentPage,
    gCurrentPage,
    triggerTopAlert,
    isTopAlertVisible,
  } = props;
  const history = useHistory();

  const changePage = (page: string) => {
    if (isTopAlertVisible) {
      triggerTopAlert(false, "", "");
    }
    gSetCurrentPage(page);
    let link = page;
    link = link.replace(/\s/g, "");
    link = link.toLowerCase();
    history.push("/" + link);
  };

  const constructNavBar = () => {
    return navBarLinks.map((res: I_NavBarLink, i: number) => (
      <Nav.Link
        key={i}
        onClick={() => changePage(res.linkTitle)}
        className={gCurrentPage === res.linkTitle ? "active" : ""}
      >
        {res.linkTitle}
      </Nav.Link>
    ));

  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ marginBottom: "35px" }}
    >
      <Container>
        <Navbar.Brand href="#home">{pageTitle}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">{constructNavBar()}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = (gState: I_Global) => ({
  gCurrentPage: gState.navBar.currentPage,
  isTopAlertVisible: gState.topAlert.showAlert,
});

export default connect(mapStateToProps, {
  gSetCurrentPage,
  triggerTopAlert,
})(NavbarTop);
