import outfitStyle from "./outfit.module.css";

type OutfitProps = {
  outfit_name: string;
  image_url: string;
};

const Outfit = ({ outfit_name, image_url }: OutfitProps) => {
  return (
    <div className={outfitStyle.container}>
      <h2 className={outfitStyle.outfit_name}>{outfit_name}</h2>

      <div className={outfitStyle.image_container}>
        <img className={outfitStyle.image} src={image_url} />
      </div>
    </div>
  );
};

export default Outfit;
