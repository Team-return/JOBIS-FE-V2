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
  NoticeDetail,
  noticeDetailLoader,
  NoticeEdit,
  noticeEditLoader,
  noticeLoader,
  NoticeWrite,
  PreparingPage,
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh"
          }}
        >
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
              element: <PreparingPage />
            },
            {
              path: "detail/:reviewId",
              element: <PreparingPage />
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
            { path: "write", element: <NoticeWrite /> },
            {
              path: "detail/:noticeId",
              loader: noticeDetailLoader,
              element: <NoticeDetail />
            },
            {
              path: "detail/edit/:noticeId",
              loader: noticeEditLoader,
              element: <NoticeEdit />
            }
          ]
        },
        {
          path: "/banner",
          children: [
            {
              index: true,
              element: <PreparingPage />
            },
            { path: "write", element: <PreparingPage /> },
            { path: "detail/edit/:bannerId", element: <PreparingPage /> }
          ]
        }
      ]
    },
    {
      path: "/login",
      element: <Login />
    }
  ]);
