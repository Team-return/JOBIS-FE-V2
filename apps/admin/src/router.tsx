import { Header } from "@jobis/design-system";
import { createBrowserRouter, useNavigate } from "react-router-dom";
import { Login } from "./pages/Login";

const AdminHeader = () => {
  const navigate = useNavigate();
  return <Header types="admin" onClickLogo={() => navigate("/")} />;
};

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      path: "/",
      element: <AdminHeader />,
      children: [
        {
          path: "/recruitment",
          element: <div>모집의뢰서</div>
        },
        {
          path: "/company",
          children: [
            { index: true, element: <div>기업 목록</div> },
            { path: "detail/:companyId", element: <div>기업 상세</div> },
            {
              path: "detail/edit/:companyId",
              element: <div>기업 상세 수정</div>
            }
          ]
        },
        {
          path: "/student",
          element: <div>학생</div>
        },
        {
          path: "/review",
          children: [
            { index: true, element: <div>학생 후기 목록</div> },
            { path: "detail/:reviewId", element: <div>학생 후기 상세</div> }
          ]
        },
        {
          path: "/application",
          element: <div>지원서</div>
        },
        {
          path: "/notice",
          children: [
            { index: true, element: <div>공지사항 목록</div> },
            { path: "write", element: <div>공지사항 등록</div> },
            { path: "detail/:noticeId", element: <div>공지사항 상세</div> },
            { path: "detail/edit/:noticeId", element: <div>공지사항 수정</div> }
          ]
        },
        {
          path: "/banner",
          children: [
            { index: true, element: <div>배너 목록</div> },
            { path: "write", element: <div>배너 등록</div> },
            { path: "detail/edit/:bannerId", element: <div>배너 수정</div> }
          ]
        }
      ]
    },
    {
      path: "/login",
      element: <Login />
    }
  ]);
