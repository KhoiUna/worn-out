import outfitStyle from "./outfit.module.css";

type OutfitProps = {
  outfit_name: string;
  image_url: string;
  last_worn: Date;
};

const Outfit = ({ outfit_name, image_url, last_worn }: OutfitProps) => {
  return (
    <div className={outfitStyle.container}>
      <h2 className={outfitStyle.outfit_name}>{outfit_name}</h2>
      <p style={{ padding: "0.3rem 0" }}>
        Last worn: {new Date(last_worn).toLocaleDateString()}
      </p>

      <div className={outfitStyle.image_container}>
        <img loading="lazy" className={outfitStyle.image} src={image_url} />
      </div>
    </div>
  );
};

export default Outfit;
