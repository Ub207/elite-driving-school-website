import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DrivingSchoolHomepage from "../driving-school-homepage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DrivingSchoolHomepage />
  </StrictMode>
);
