import { Header, Footer } from "@jobis/design-system";
import { createBrowserRouter, Outlet } from "react-router-dom";
import {
  Application,
  applicationLoader,
  Company,
  CompanyDetail,
  companyDetailLoader,
  CompanyEdit,
  companyEditLoader,
  companyLoader,
  Login,
  Notice,
  noticeLoader,
  Recruitment,
  recruitmentLoader,
  Student,
  studentLoader
} from "./pages";

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      path: "/",
      element: (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Header type="admin" />
          <main style={{ flex: 1 }}>
            <Outlet />
          </main>
          <Footer />
        </div>
      ),
      children: [
        {
          index: true,
          loader: recruitmentLoader,
          element: <Recruitment />
        },
        {
          path: "/company",
          children: [
            {
              index: true,
              loader: companyLoader,
              element: <Company />
            },
            {
              path: "detail/:companyId",
              loader: companyDetailLoader,
              element: <CompanyDetail />
            },
            {
              path: "detail/edit/:companyId",
              loader: companyEditLoader,
              element: <CompanyEdit />
            }
          ]
        },
        {
          path: "/student",
          loader: studentLoader,
          element: <Student />
        },
        {
          path: "/review",
          children: [
            {
              index: true,
              element: <div>학생 후기 목록</div>
            },
            {
              path: "detail/:reviewId",
              element: <div>학생 후기 상세</div>
            }
          ]
        },
        {
          path: "application",
          loader: applicationLoader,
          element: <Application />
        },
        {
          path: "/notice",
          children: [
            {
              index: true,
              loader: noticeLoader,
              element: <Notice />
            },
            { path: "write", element: <div>공지사항 등록</div> },
            {
              path: "detail/:noticeId",
              element: <div>공지사항 상세</div>
            },
            {
              path: "detail/edit/:noticeId",
              element: <div>공지사항 수정</div>
            }
          ]
        },
        {
          path: "/banner",
          children: [
            {
              index: true,
              element: <div>배너 목록</div>
            },
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
