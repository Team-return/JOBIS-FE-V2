import { Button, Icon, useToast } from "@jobis/design-system";
import { Route, Routes, Link } from "react-router-dom";

export function App() {
  const { success } = useToast();

  return (
    <>
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <Icon icon="Bug" />
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{" "}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Button onClick={() => success("test message")}>test</Button>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
