import layoutStyle from "./layout.module.css";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }: { children: ReactElement | ReactElement[] }) => {
  return (
    <div className={layoutStyle.container}>
      <Link to={"/"}>
        <div style={{ marginBottom: "3rem" }}>
          <h1 className={layoutStyle.title}>Worn Out</h1>
          <h2
            style={{
              color: "white",
              textAlign: "right",
            }}
          >
            Never feel worn out again
          </h2>
        </div>
      </Link>

      {children}

      <footer style={{ margin: "1.5rem 0", textAlign: "center" }}>
        <a
          href="https://github.com/FlameRender/worn-out"
          target={"_blank"}
          rel="noopener noreferrer"
        >
          <span className={layoutStyle.footer_span}>Source code</span>
        </a>
      </footer>
    </div>
  );
};

export default Layout;
