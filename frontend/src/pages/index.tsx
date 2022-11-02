import { useEffect, useState } from "react";
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

const outfitsJson: Outfit[] = [
  {
    id: "qwer",
    image_url:
      "https://theimpression.com/wp-content/uploads/2019/03/celine-rf19-1201.jpg",
    label: "Black",
    details: ["hat", "black"],
    last_worn: new Date("2022-10-31T12:00"),
  },
  {
    id: "fsafds",
    image_url:
      "https://www.boredpanda.com/blog/wp-content/uploads/2022/03/horrible-dresses-25-622749b4cfad9__700.jpg",
    label: "sun god",
    details: ["sun", "black"],
    last_worn: new Date("2022-11-01T12:00"),
  },
  {
    id: "al",
    image_url:
      "https://assets.vogue.com/photos/5d77fd188d44ee0009799518/master/pass/00001-Cong-Tri-Ready-To-Wear-Spring-2020.jpg",
    label: "White dress",
    details: ["pink", "umbrella"],
    last_worn: new Date("2022-11-01T12:30"),
  },
  {
    id: "asdfdasf",
    image_url:
      "https://i.pinimg.com/originals/6a/c3/fe/6ac3fe0fcc2108847c9e107a5b2305cd.jpg",
    label: "Pink dress",
    details: ["pink", "umbrella"],
    last_worn: new Date(),
  },
];

const Index = () => {
  const [date, handleCalendarChange] = useState(new Date());

  const [outfits, setOutfits] = useState(outfitsJson);
  useEffect(() => {
    setOutfits(
      outfitsJson.filter(
        (item) =>
          item.last_worn.toLocaleDateString() === date.toLocaleDateString()
      )
    );
  }, [date]);

  return (
    <Layout>
      <div className={homeStyle.container}>
        <Calendar onChange={handleCalendarChange} value={date} />
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

        {outfits.length > 0 && (
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
        )}
        {outfits.length === 0 && (
          <p style={{ fontSize: "1.5rem", textAlign: "center" }}>
            No outfits wore on this day
          </p>
        )}
      </div>
    </Layout>
  );
};

export default Index;
