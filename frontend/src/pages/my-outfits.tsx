import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Outfit from "../components/Outfit";
import Layout from "../containers/Layout";
import myOutfitsPageStyle from "../styles/my_outfits.module.css";
import axios from "axios";

type Outfit = {
  _id: string;
  image_url: string;
  label: string;
  details: string[];
  last_worn: Date;
};

const MyOutfits = () => {
  const [date, setDate] = useState("");

  const { isLoading: uniqueDateIsLoading, data: uniqueDates } = useQuery<
    any,
    any,
    string[],
    any
  >({
    queryKey: ["uniqueDates"],
    queryFn: () =>
      axios.get("/api/uniqueDates").then((res) => res.data.success),
  });

  const { isLoading, data: fetchedOutfits } = useQuery<any, any, Outfit[], any>(
    {
      queryKey: ["fetchedOutfits", date],
      queryFn: () =>
        axios.get(`/api/outfit?date=${date}`).then((res) => res.data.success),
    }
  );

  const handleDateChange = (event: SyntheticEvent) => {
    setDate((event.target as HTMLSelectElement).value);
  };

  if (isLoading || !fetchedOutfits || uniqueDateIsLoading || !uniqueDates)
    return (
      <Layout>
        <div className={myOutfitsPageStyle.container}>
          <select
            className={myOutfitsPageStyle.dropdown}
            defaultValue={""}
            disabled
          >
            <option value="" disabled>
              Loading...
            </option>
          </select>
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

          <h2>Loading...</h2>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className={myOutfitsPageStyle.container}>
        <select
          className={myOutfitsPageStyle.dropdown}
          value={date}
          onChange={handleDateChange}
        >
          <option value="" disabled>
            {uniqueDates.length > 0
              ? "Please select a date"
              : "No outfits added"}
          </option>
          {uniqueDates.map((date) => (
            <option key={date} value={date}>
              {new Date(date).toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>

      <div>
        {date && (
          <div
            style={{
              backgroundColor: "#f1f1f1",
              padding: "1rem",
              borderRadius: "10px",
              margin: "auto",
              textAlign: "center",
            }}
          >
            <h2 style={{ padding: "0.5rem", fontSize: "1.5rem" }}>
              Outfits you wore:
            </h2>

            {fetchedOutfits.length > 0 && (
              <div className={myOutfitsPageStyle.outfit_container}>
                {fetchedOutfits.map((item) => (
                  <Link to={`/view/${item._id}`} key={item._id}>
                    <Outfit
                      image_url={item.image_url}
                      outfit_name={item.label}
                      last_worn={item.last_worn}
                    />
                  </Link>
                ))}
              </div>
            )}
            {fetchedOutfits.length === 0 && (
              <p style={{ fontSize: "1.5rem", textAlign: "center" }}>
                No outfits wore on this day
              </p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyOutfits;
