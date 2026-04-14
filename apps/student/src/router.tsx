import { Header, Footer } from "@jobis/design-system";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { companyLoader } from "./pages/company-list/loader";
import { CompanyList } from "./pages/company-list/page";
import { RecruitmentList } from "./pages/recruitment-list";
import { Home } from "./pages/home";
import { CompanyDetail } from "./pages/company-detail";
import { homeLoader } from "./pages/home";
import { companyDetailLoader } from "./pages/company-detail/loader";

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      path: "/",
      element: (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Header type="student" userName="홍길동" />
          <main style={{ flex: 1 }}>
            <Outlet />
          </main>
          <Footer />
        </div>
      ),
      children: [
        {
          index: true,
          loader: homeLoader,
          element: <Home />
        },
        {
          path: "/company",
          children: [
            {
              index: true,
              loader: companyLoader,
              element: <CompanyList />
            },
            {
              path: "detail/:companyId",
              loader: companyDetailLoader,
              element: <CompanyDetail />
            }
          ]
        },
        {
          path: "/recruitment",
          children: [
            {
              index: true,
              element: <RecruitmentList />
            },
            {
              path: "detail/:recruitmentId",
              element: <div>모집의뢰서 상세</div>
            }
          ]
        },
        {
          path: "/notice",
          children: [
            {
              index: true,
              element: <div>공지사항 목록</div>
            },
            {
              path: "detail/:noticeId",
              element: <div>공지사항 상세</div>
            }
          ]
        },
        {
          path: "/review",
          children: [
            {
              index: true,
              element: <div>후기 목록</div>
            },
            { path: "write", element: <div>후기 작성</div> },
            {
              path: "detail/:reviewId",
              element: <div>후기 상세</div>
            },
            { path: "expectations", element: <div>예상 면접 질문 작성</div> }
          ]
        },
        {
          path: "/mypage",
          element: <div>마이페이지</div>
        },
        {
          path: "/jobrate",
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
