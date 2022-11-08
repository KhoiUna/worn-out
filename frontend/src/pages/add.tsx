import { useState } from "react";
import Layout from "../containers/Layout";
import addPageStyle from "../styles/add.module.css";

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dateOfMonth = date.getDate();

  return `${year}-${month < 10 ? "0" : ""}${month}-${
    dateOfMonth < 10 ? "0" : ""
  }${dateOfMonth}`;
};

const Add = () => {
  const [date, setDate] = useState(new Date());

  return (
    <Layout>
      <form style={{ margin: "1rem", textAlign: "center" }}>
        <div style={{ margin: "0.5rem" }}>
          <input
            required
            name="image_url"
            className={addPageStyle.inputs}
            placeholder="Outfit image URL"
          />
        </div>

        <div style={{ margin: "0.5rem" }}>
          <input
            required
            name="label"
            className={addPageStyle.inputs}
            placeholder="Label"
          />
        </div>

        <div style={{ margin: "0.5rem" }}>
          <label htmlFor="last_worn">
            <p
              style={{
                textAlign: "left",
                fontSize: "large",
                fontWeight: "bold",
                backgroundColor: "white",
                padding: "0.5rem",
                width: "fit-content",
                margin: "0.5rem 0",
                borderRadius: "5px",
              }}
            >
              Last worn:
            </p>
          </label>
          <input
            required
            id="last_worn"
            type="date"
            name="last_worn"
            className={addPageStyle.inputs}
            placeholder="Last worn"
            value={formatDate(date)}
          />
        </div>

        <button type="submit" className={addPageStyle.submit_button}>
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default Add;
