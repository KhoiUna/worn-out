import { Link } from "react-router-dom";
import Layout from "../containers/Layout";
import homePageStyle from "../styles/home.module.css";

const Index = () => {
  return (
    <Layout>
      <div className={homePageStyle.container}>
        <Link to={"/my-outfits"}>
          <div className={homePageStyle.button_container}>
            <button className={homePageStyle.button}>My Outfits</button>
          </div>
        </Link>

        <Link to={"/add"}>
          <div className={homePageStyle.button_container}>
            <button className={homePageStyle.button}>New Fit</button>
          </div>
        </Link>
      </div>
    </Layout>
  );
};

export default Index;
