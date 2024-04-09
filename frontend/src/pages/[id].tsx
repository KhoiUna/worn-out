import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../containers/Layout";
import viewStyle from "../styles/view.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import addPageStyle from "../styles/add.module.css";
import DatePicker from "react-datepicker";

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

interface OutfitData {
  outfitID: string;
  label: string;
  details: string;
  last_worn: string;
}
const updateOutfit = async (updateOutfitData: OutfitData) => {
  const { data } = await axios.put(
    `/api/outfit/update/${updateOutfitData.outfitID}`,
    updateOutfitData
  );
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
        navigate("/my-outfits");
      }

      if (data.error) {
        toast.error("Error deleting outfit!");
      }
    },
    onError: () => {
      toast.error("Error deleting outfit!");
    },
  });

  const { mutate: updateMutate, isLoading: updateIsLoading } = useMutation(
    updateOutfit,
    {
      onSuccess: (data) => {
        if (data.success) {
          toast.success("Update outfit successfully!");
        }

        if (data.error) {
          toast.error("Error deleting outfit!");
        }
      },
      onError: () => {
        toast.error("Error deleting outfit!");
      },
    }
  );

  const [outfitData, setOutfitData] = useState<OutfitData>();
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    if (data)
      setOutfitData({
        outfitID: data._id,
        label: data.label,
        last_worn: data.last_worn,
        details: data.details.join(","),
      });
  }, [data]);

  if (isLoading || !data || !outfitData)
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

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this outfit?"))
      mutate(outfitID as string);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) updateMutate(outfitData);
  };

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

      <Link to={"/my-outfits"}>
        <button className={viewStyle.back_button}>Back</button>
      </Link>

      <div className={viewStyle.container}>
        <div style={{ textAlign: "right", margin: "0.5rem" }}>
          <button onClick={handleDelete} className={viewStyle.delete_button}>
            Delete
          </button>
          <button
            className={viewStyle.update_button}
            onClick={handleEdit}
            style={{ backgroundColor: isEditing ? "#57ff57" : "#ff0" }}
          >
            {isEditing ? "Done" : "Update"}
          </button>
        </div>

        {!isEditing && (
          <h1 style={{ textDecoration: "underline" }}>{outfitData.label}</h1>
        )}
        {isEditing && (
          <div style={{ margin: "0.5rem" }}>
            <input
              name="label"
              className={addPageStyle.inputs}
              placeholder="Outfit's label"
              value={outfitData.label}
              onChange={(event) =>
                setOutfitData({ ...outfitData, label: event.target.value })
              }
            />
          </div>
        )}

        <div>
          <p>
            <b>Last worn:</b>{" "}
            {new Date(outfitData.last_worn).toLocaleDateString()}
          </p>
          {isEditing && (
            <div style={{ margin: "0.5rem" }}>
              <DatePicker
                selected={new Date(outfitData.last_worn)}
                onChange={(date: Date) =>
                  setOutfitData({
                    ...outfitData,
                    last_worn: date.toUTCString(),
                  })
                }
              />
            </div>
          )}

          <div>
            <img
              style={{ width: "50%", margin: "1rem 0", borderRadius: "10px" }}
              src={data.image_url}
              alt={outfitData.label}
            />
          </div>

          <div>
            <p>
              <b>Details:</b>
            </p>

            {!isEditing && (
              <div>
                <ul>
                  {outfitData.details.split(",").map((detail, index) => (
                    <li style={{ listStyle: "none" }} key={index}>
                      - {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {isEditing && (
              <div style={{ margin: "0.5rem" }}>
                <input
                  required
                  name="details"
                  className={addPageStyle.inputs}
                  placeholder="Details (separated by commas)"
                  value={outfitData.details}
                  onChange={(event) =>
                    setOutfitData({
                      ...outfitData,
                      details: event.target.value,
                    })
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default View;
