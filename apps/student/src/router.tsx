import { Header } from "@jobis/design-system";
import { createBrowserRouter } from "react-router-dom";

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      path: "/",
      element: <Header type="student" userName="홍길동" />,
      children: [
        {
          path: "/",
          element: <div>메인페이지</div>
        },
        {
          path: "/company",
          children: [
            { index: true, element: <div>기업 목록</div> },
            { path: "detail/:companyId", element: <div>기업 상세</div> }
          ]
        },
        {
          path: "/recruitment",
          children: [
            { index: true, element: <div>모집의뢰서 목록</div> },
            {
              path: "detail/:recruitmentId",
              element: <div>모집의뢰서 상세</div>
            }
          ]
        },
        {
          path: "/notice",
          children: [
            { index: true, element: <div>공지사항 목록</div> },
            { path: "detail/:noticeId", element: <div>공지사항 상세</div> }
          ]
        },
        {
          path: "/review",
          children: [
            { index: true, element: <div>후기 목록</div> },
            { path: "write", element: <div>후기 작성</div> },
            { path: "detail/:reviewId", element: <div>후기 상세</div> },
            { path: "expectations", element: <div>예상 면접 질문 작성</div> }
          ]
        },
        {
          path: "/mypage",
          children: [{ index: true, element: <div>마이페이지</div> }]
        },
        {
          path: "/jobrate",
          children: [{ index: true, element: <div>취업률 페이지</div> }]
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
