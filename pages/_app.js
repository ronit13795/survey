import "../styles/login.css";
import "../styles/Admin.css";
import "../styles/Question.css";
import "../styles/SidebarRight.css";
import "../styles/DropDown.css";
import "../styles/MarketSurvey.css";
import "../styles/Marketplace.css"
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
