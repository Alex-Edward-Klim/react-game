import gitHubImage from "../images/GitHubImage.png";
import rsSchoolImage from "../images/rs_school_js.svg";

const Footer = () => {

  const footerStyles = {
    position: "absolute",
    bottom: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "10vh",
    overflow: "hidden",
    backgroundColor: "#616161"
  };

  const imgStyles = {
    height: "7vh"
  };

  return (
    <>
      <div style={footerStyles}>
        <a href="https://github.com/Alex-Edward-Klim"><img style={{...imgStyles, marginLeft: "3vh"}} src={gitHubImage} alt="GitHub" /></a>
        <a href="https://rs.school/js/"><img style={imgStyles} src={rsSchoolImage} alt="RSSchool" /></a>
        <p style={{...imgStyles, marginRight: "3vh", lineHeight: "7vh", fontSize: "large"}}>2021</p>
      </div>
    </>
  );
};

export default Footer;
