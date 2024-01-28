import { useNavigate } from "react-router-dom";
import Button from "./button";

function BackButton() {
  let naviate = useNavigate();
  return (
    <Button
      type={"back"}
      onClick={(e) => {
        e.preventDefault();
        naviate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
