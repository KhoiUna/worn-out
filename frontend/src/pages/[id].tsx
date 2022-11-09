import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Layout from "../containers/Layout";
import viewStyle from "../styles/view.module.css";

type Outfit = {
  _id: string;
  label: string;
  last_worn: string;
  details: string[];
  image_url: string;
};

const View = () => {
  const { outfitID } = useParams();

  const { isLoading, data } = useQuery<any, any, Outfit, any>({
    queryKey: ["outfit"],
    queryFn: () =>
      axios.get(`/api/outfit/${outfitID}`).then((res) => res.data.success),
  });

  if (isLoading || !data)
    return (
      <Layout>
        <div className={viewStyle.container}>
          <h1>Loading...</h1>
        </div>

        <Link to={"/"}>
          <button className={viewStyle.back_button}>Back</button>
        </Link>
      </Layout>
    );

  return (
    <Layout>
      <div className={viewStyle.container}>
        <h1 style={{ textDecoration: "underline" }}>{data.label}</h1>

        <div>
          <p>
            <b>Last worn:</b> {new Date(data.last_worn).toLocaleDateString()}
          </p>

          <div>
            <img
              style={{ width: "50%", margin: "1rem 0", borderRadius: "10px" }}
              src={data.image_url}
              alt={data.label}
            />
          </div>

          <div>
            <p>
              <b>Details:</b>
            </p>

            <div>
              <ul>
                {data.details.map((detail, index) => (
                  <li style={{ listStyle: "none" }} key={index}>
                    - {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Link to={"/"}>
        <button className={viewStyle.back_button}>Back</button>
      </Link>
    </Layout>
  );
};

export default View;
