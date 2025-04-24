import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import PieChart from "../components/PieChart"
import {get_token} from "../components/authorization"
import Header from "../components/header"

const pageStyles = {
  color: "#111400",
  paddingTop: 96,
  paddingBottom: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 500,
  marginLeft: 96,
}
const headingAccentStyles = {
  color: "#E1FF00",
}
const paragraphStyles = {
  marginBottom: 48,
}

const linkStyle = {
  color: "#ffdb32",
  fontWeight: "bold",
  fontSize: 16,
  verticalAlign: "5%",
}

const docLinkStyle = {
  ...linkStyle,
  listStyleType: "none",
  display: `inline-block`,
  marginBottom: 24,
  marginRight: 12,
}

const descriptionStyle = {
  color: "#232129",
  fontSize: 14,
  marginTop: 10,
  marginBottom: 0,
  lineHeight: 1.25,
}

const logoStyle = {
  width: 87,
  height: 45,
  margin:10,
  backgroundColor:"White",
}

const IndexPage: React.FC<PageProps> = () => {
  typeof window !== "undefined"? (() => { 
    let url_parameters = new URLSearchParams(window.location.search);
    let code = url_parameters.get("code")
    if (code){
      get_token(code)
      history.replaceState && history.replaceState(
        null, '', location.pathname + location.search.replace(/[\?&]code=[^&]+/, '').replace(/^&/, '?')
      );
      //location.reload();
    }
  })(): "";
  return (
    <main style={pageStyles}>
      <Header />
      <h1 style={headingStyles}>
        Disco Listening Habits
        <br />
        <span style={headingAccentStyles}>Music</span>
      </h1>
      <PieChart />
      <div style = {{backgroundColor: "Black"}}>
        <a href="https://exetermathematicsschool.ac.uk">
          <img
            alt="EMS logo"
            src="https://exetermathematicsschool.ac.uk/images/exeter-maths-school.png"
            style={logoStyle}
          />
        </a>
        <a href="https://last.fm/home">
          <img
            alt="Powered by AudioScrobbler"
            src="https://www.last.fm/static/images/footer_logo@2x.49ca51948b0a.png"
            style={{padding:10,height:40}}
          />
        </a>
        <a href="https://open.spotify.com">
          <img
            alt="Spotify logo"
            src="https://open.spotifycdn.com/cdn/images/favicon.0f31d2ea.ico"
            style={{height:45, padding:10}}
          />
        </a>
      </div>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>E=MC^2</title>
