import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../containers/Layout";
import viewStyle from "../styles/view.module.css";
import toast, { Toaster } from "react-hot-toast";

type Outfit = {
  _id: string;
  label: string;
  last_worn: string;
  details: string[];
  image_url: string;
};

const deleteOutfit = async (outfitID: string) => {
  const { data } = await axios.delete(`/api/outfit/delete/${outfitID}`);
  return data;
};

const View = () => {
  const navigate = useNavigate();
  const { outfitID } = useParams();

  const { isLoading, data } = useQuery<any, any, Outfit, any>({
    queryKey: ["outfit"],
    queryFn: () =>
      axios.get(`/api/outfit/${outfitID}`).then((res) => res.data.success),
  });

  const { mutate, isLoading: deleteIsLoading } = useMutation(deleteOutfit, {
    onSuccess: (data) => {
      if (data.success) {
        navigate("/");
      }

      if (data.error) {
        toast.error("Error deleting outfit!");
      }
    },
    onError: () => {
      toast.error("Error deleting outfit!");
    },
  });

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this outfit?"))
      mutate(outfitID as string);
  };

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
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              fontWeight: "bold",
              fontSize: "large",
              color: "white",
            },
          },
          error: {
            style: {
              background: "red",
              fontWeight: "bold",
              fontSize: "large",
              color: "white",
            },
          },
        }}
      />

      <div className={viewStyle.container}>
        <div style={{ textAlign: "right", margin: "0.5rem" }}>
          <button onClick={handleDelete} className={viewStyle.delete_button}>
            Delete
          </button>
          <button className={viewStyle.update_button}>Update</button>
        </div>

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
