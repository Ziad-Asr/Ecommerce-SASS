import { createRoot } from "react-dom/client";
import { MainLayout } from "@layouts/index";

import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")!).render(
  <div>
    <MainLayout />
  </div>
);
