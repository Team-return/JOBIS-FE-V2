import { Header, Footer } from "@jobis/design-system";
import { createBrowserRouter, redirect, Outlet } from "react-router-dom";
import { reviewsKeys, query, noticesKeys, bannersKeys } from "@jobis/api";
import {
  Application,
  applicationLoader,
  Company,
  CompanyDetail,
  companyDetailLoader,
  CompanyEdit,
  companyLoader,
  Login,
  Recruitment,
  recruitmentLoader
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
              loader: companyDetailLoader,
              element: <CompanyEdit />
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
            {
              index: true,
              loader: ({ params }) => {
                query.prefetch(reviewsKeys.reviewList(params));
                return null;
              },
              element: <div>학생 후기 목록</div>
            },
            {
              path: "detail/:reviewId",
              loader: ({ params }) => {
                const id = String(params.reviewId);
                if (!params.reviewId) {
                  throw redirect("/review");
                }
                query.prefetch(reviewsKeys.reviewDetail(id));
                return null;
              },
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
              loader: () => {
                query.prefetch(noticesKeys.noticeList());
                return null;
              },
              element: <div>공지사항 목록</div>
            },
            { path: "write", element: <div>공지사항 등록</div> },
            {
              path: "detail/:noticeId",
              loader: ({ params }) => {
                const id = Number(params.noticeId);
                if (!params.noticeId || Number.isNaN(id)) {
                  throw redirect("/notice");
                }
                query.prefetch(noticesKeys.noticeDetail(id));
                return null;
              },
              element: <div>공지사항 상세</div>
            },
            {
              path: "detail/edit/:noticeId",
              loader: ({ params }) => {
                const id = Number(params.noticeId);
                if (!params.noticeId || Number.isNaN(id)) {
                  throw redirect("/notice");
                }
                query.prefetch(noticesKeys.noticeDetail(id));
                return null;
              },
              element: <div>공지사항 수정</div>
            }
          ]
        },
        {
          path: "/banner",
          children: [
            {
              index: true,
              loader: ({ request }) => {
                const url = new URL(request.url);
                const isOpenedParam = url.searchParams.get("isOpened");
                const isOpened =
                  isOpenedParam === null ? undefined : isOpenedParam === "true";
                query.prefetch(bannersKeys.teacherBannerList(isOpened));
                return null;
              },
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
