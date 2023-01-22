import { BrowserRouter, Routes, Route } from "react-router-dom";
import { router } from "./routes";

export const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        {router.map((l) => (
          <Route key={l.key} exact path={l.route} element={l.component} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
