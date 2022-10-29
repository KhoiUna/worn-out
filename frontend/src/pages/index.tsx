import { Calendar } from "react-calendar";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <>
      <h1>Worn Out</h1>

      <Calendar />

      <Link to={"/view"}>View</Link>
    </>
  );
};

export default Index;
