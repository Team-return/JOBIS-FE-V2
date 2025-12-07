import { Button, Icon, useToast } from "@jobis/design-system";
import { useLogin, type PlatformType } from "@jobis/api";
import { Route, Routes, Link } from "react-router-dom";
import { useState } from "react";

export function App() {
  const { success, error } = useToast();
  const [data] = useState<{
    account_id: string;
    password: string;
    platform_type: PlatformType;
  }>({ account_id: "", password: "", platform_type: "WEB" });
  const { mutate } = useLogin({
    onSuccess: () => success("로그인 성공"),
    onError: err => error(`오류: ${err}`)
  });

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
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the root route.{" "}
              <Link to="/login">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div>
              <Button onClick={() => mutate(data)}>Login</Button>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
