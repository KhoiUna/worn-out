import Layout from "../containers/Layout";
import addPageStyle from "../styles/add.module.css";

const Add = () => {
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
