import React from "react";
import { Container } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <div className="copyright">
            &copy; {1900 + new Date().getYear()}, Designed by{" "}
            <a
              href="https://www.invisionapp.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Invision
            </a>
            . Coded by{" "}
            <a
              href="https://www.linkedin.com/in/jad-adnan-5a14b6118/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jad Eden
            </a>
            .
          </div>
        </Container>
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool
};

export default Footer;
