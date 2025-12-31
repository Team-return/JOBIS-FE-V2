import {
  applicationsKeys,
  companiesKeys,
  noticesKeys,
  query,
  recruitmentsKeys,
  reviewsKeys,
  studentsKeys
} from "@jobis/api";
import { Header } from "@jobis/design-system";
import { createBrowserRouter, redirect } from "react-router-dom";

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      path: "/",
      element: <Header type="student" userName="홍길동" />,
      children: [
        {
          index: true,
          element: <div>메인페이지</div>
        },
        {
          path: "/company",
          children: [
            {
              index: true,
              loader: ({ request }) => {
                const url = new URL(request.url);
                const pageParam = url.searchParams.get("page");
                const nameParam = url.searchParams.get("name");
                const page = pageParam === null ? undefined : Number(pageParam);
                const name = nameParam === null ? undefined : String(nameParam);
                if (Number.isNaN(page)) {
                  redirect("/");
                }
                query.prefetch(companiesKeys.companyStudentList(page, name));
                return null;
              },
              element: <div>기업 목록</div>
            },
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
            }
          ]
        },
        {
          path: "/recruitment",
          children: [
            {
              index: true,
              loader: ({ params }) => {
                query.prefetch(recruitmentsKeys.recruitmentList(params));
                return null;
              },
              element: <div>모집의뢰서 목록</div>
            },
            {
              path: "detail/:recruitmentId",
              loader: ({ params }) => {
                const id = Number(params.recruitmentId);
                if (!params.recruitmentId || Number.isNaN(id)) {
                  throw redirect("/recruitment");
                }
                query.prefetch(recruitmentsKeys.recruitmentDetail(id));
                return null;
              },
              element: <div>모집의뢰서 상세</div>
            }
          ]
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
            }
          ]
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
              element: <div>후기 목록</div>
            },
            { path: "write", element: <div>후기 작성</div> },
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
              element: <div>후기 상세</div>
            },
            { path: "expectations", element: <div>예상 면접 질문 작성</div> }
          ]
        },
        {
          path: "/mypage",
          loader: () => {
            query.prefetch(studentsKeys.studentMy());
            return null;
          },
          element: <div>마이페이지</div>
        },
        {
          path: "/jobrate",
          loader: () => {
            query.prefetch(applicationsKeys.employmentCount());
            return null;
          },
          element: <div>취업률 페이지</div>
        }
      ]
    },
    {
      path: "/login",
      element: <div>login</div>
    },
    {
      path: "/signup",
      element: <div>signup</div>
    }
  ]);
