import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SyntheticEvent, useState } from "react";
import Layout from "../containers/Layout";
import addPageStyle from "../styles/add.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Prompt = {
  success: boolean | string;
  error: boolean | string;
};

type OutfitInput = {
  image_url: string;
  label: string;
  last_worn: Date;
  details: string;
};

type OutfitData = {
  image_url: string;
  label: string;
  last_worn: string;
  details: string;
};

const outfitInputInitialState: OutfitInput = {
  image_url: "",
  label: "",
  last_worn: new Date(),
  details: "",
};

const saveOutfit = async (outfitData: OutfitData) => {
  const { data } = await axios.post("/api/outfit/save", outfitData);
  return data;
};

const Add = () => {
  const [prompt, setPrompt] = useState<Prompt>({
    success: false,
    error: false,
  });

  const { mutate, isLoading } = useMutation(saveOutfit, {
    onSuccess: (data) => {
      if (data.success) {
        setOutfitInput(outfitInputInitialState);
        setPrompt({
          success: "Successfully saved!",
          error: false,
        });
      }

      if (data.error) {
        setPrompt({
          success: false,
          error: "Error saving outfit",
        });
      }
    },
    onError: () => {
      setPrompt({
        success: false,
        error: "Error saving outfit",
      });
    },
  });

  const [outfitInput, setOutfitInput] = useState(outfitInputInitialState);

  const handleChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setOutfitInput((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    mutate({ ...outfitInput, last_worn: outfitInput.last_worn.toUTCString() });
  };

  return (
    <Layout>
      <form
        style={{ margin: "1rem", textAlign: "center" }}
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <div style={{ margin: "0.5rem" }}>
          <input
            required
            name="label"
            className={addPageStyle.inputs}
            placeholder="Label"
            value={outfitInput.label}
          />
        </div>

        <div style={{ margin: "0.5rem" }}>
          <input
            required
            name="image_url"
            className={addPageStyle.inputs}
            placeholder="Outfit image URL"
            value={outfitInput.image_url}
          />
        </div>

        {outfitInput.image_url && (
          <div
            style={{
              margin: "0.5rem",
              backgroundColor: "white",
              padding: "0.5rem",
            }}
          >
            <img
              style={{ width: "50%", margin: "1rem 0", borderRadius: "10px" }}
              src={outfitInput.image_url}
              alt={outfitInput.label}
            />
          </div>
        )}

        <div style={{ margin: "0.5rem" }}>
          <input
            required
            name="details"
            className={addPageStyle.inputs}
            placeholder="Details (separated by commas)"
            value={outfitInput.details}
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

          <DatePicker
            selected={outfitInput.last_worn}
            onChange={(date: Date) =>
              setOutfitInput({ ...outfitInput, last_worn: date })
            }
          />
        </div>

        <button type="submit" className={addPageStyle.submit_button}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>

        {(prompt.success || prompt.error) && (
          <div style={{ margin: "0.5rem" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "0.5rem",
                borderRadius: "10px",
              }}
            >
              <p
                style={{
                  color: prompt.success ? "green" : "red",
                  fontSize: "large",
                }}
              >
                <b>{prompt.success || prompt.error}</b>
              </p>
            </div>
          </div>
        )}
      </form>
    </Layout>
  );
};

export default Add;
