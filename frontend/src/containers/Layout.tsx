import layoutStyle from "./layout.module.css";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }: { children: ReactElement | ReactElement[] }) => {
  return (
    <div className={layoutStyle.container}>
      <Link to={"/"}>
        <h1 className={layoutStyle.title}>Worn Out</h1>
      </Link>

      {children}
    </div>
  );
};

export default Layout;
