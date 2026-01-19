import { Header } from "@jobis/design-system";
import { createBrowserRouter, redirect } from "react-router-dom";
import { Login } from "./pages/Login";
import {
  companiesKeys,
  recruitmentsKeys,
  reviewsKeys,
  applicationsKeys,
  query,
  noticesKeys,
  bannersKeys
} from "@jobis/api";
import { Recruitment } from "./pages/Recruitment";
export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      path: "/",
      element: <Header type="admin" />,
      children: [
        {
          index: true,
          loader: ({ params }) => {
            query.prefetch(recruitmentsKeys.teacherRecruitmentList(params));
            return null;
          },
          element: <Recruitment />
        },
        {
          path: "/company",
          children: [
            { index: true, element: <div>기업 목록</div> },
            {
              path: "detail/:companyId",
              loader: ({ params }) => {
                const id = Number(params.companyId);
                if (!params.companyId || Number.isNaN(id)) {
                  throw redirect("/company");
                }
                query.prefetch(companiesKeys.companyDetail(id));
                return null;
              },
              element: <div>기업 상세</div>
            },
            {
              path: "detail/edit/:companyId",
              loader: ({ params }) => {
                const id = Number(params.companyId);
                if (!params.companyId || Number.isNaN(id)) {
                  throw redirect("/company");
                }
                query.prefetch(companiesKeys.companyDetail(id));
                return null;
              },
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
          loader: () => {
            query.prefetch(applicationsKeys.teacherApplications());
            return null;
          },
          element: <div>지원서</div>
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
