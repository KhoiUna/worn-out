import { Calendar } from "react-calendar";
import { Link } from "react-router-dom";
import Outfit from "../components/Outfit";
import Layout from "../containers/Layout";
import homeStyle from "../styles/home.module.css";

type Outfit = {
  id: string;
  image_url: string;
  label: string;
  details: string[];
  last_worn: Date;
};

const outfits: Outfit[] = [
  {
    id: "fsafds",
    image_url:
      "https://www.boredpanda.com/blog/wp-content/uploads/2022/03/horrible-dresses-25-622749b4cfad9__700.jpg",
    label: "sun god",
    details: ["sun", "black"],
    last_worn: new Date("2022-10-31"),
  },
  {
    id: "asdfdasf",
    image_url:
      "https://i.pinimg.com/originals/6a/c3/fe/6ac3fe0fcc2108847c9e107a5b2305cd.jpg",
    label: "What?",
    details: ["pink", "umbrella"],
    last_worn: new Date(),
  },
];

const Index = () => {
  return (
    <Layout>
      <div className={homeStyle.container}>
        <Calendar />
      </div>

      <div className={homeStyle.container}>
        <input className={homeStyle.search} placeholder="Enter Details" />
      </div>

      <div
        style={{
          backgroundColor: "#f1f1f1",
          padding: "0.5rem",
          borderRadius: "10px",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <h2 style={{ padding: "0.5rem", fontSize: "1.5rem" }}>
          Outfits you wore:
        </h2>

        <div className={homeStyle.outfit_container}>
          {outfits.map((item) => (
            <Link to={`/${item.id}`} key={item.id}>
              <Outfit
                image_url={item.image_url}
                outfit_name={item.label}
                last_worn={item.last_worn}
              />
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
