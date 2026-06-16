import { Header, Footer } from "@jobis/design-system";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { companyLoader } from "./pages/company-list/loader";
import { recruitmentLoader } from "./pages/recruitment-list/loader";
import { recruitmentDetailLoader } from "./pages/recruitment-detail/loader";
import { CompanyList } from "./pages/company-list/page";
import { RecruitmentList } from "./pages/recruitment-list";
import { RecruitmentDetail } from "./pages/recruitment-detail";
import { CompanyDetail } from "./pages/company-detail";
import { homeLoader } from "./pages/home";
import { companyDetailLoader } from "./pages/company-detail/loader";
import { PasswordVerify, PasswordEdit } from "./pages/auth/password";
import { SignUp, SignUpProfile } from "./pages/auth/sign-up";
import { Login } from "./pages/auth/login";
import { Home } from "./pages/home";
import { NoticesList } from "./pages/notices-list";
import { noticesListLoader } from "./pages/notices-list/loader";
import { MyPage } from "./pages/mypage";
import {
  ConnectReviewPage,
  connectReviewLoader
} from "./pages/connect-review";

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
              loader: recruitmentLoader,
              element: <RecruitmentList />
            },
            {
              path: "detail/:recruitmentId",
              loader: recruitmentDetailLoader,
              element: <RecruitmentDetail />
            }
          ]
        },
        {
          path: "/notice",
          children: [
            {
              index: true,
              loader: noticesListLoader,
              element: <NoticesList />
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
          path: "/connect-review",
          loader: connectReviewLoader,
          element: <ConnectReviewPage />
        },
        {
          path: "/mypage",
          element: <MyPage />
        },
        {
          path: "/jobrate",
          element: <div>취업률 페이지</div>
        }
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      children: [
        {
          index: true,
          element: <SignUp />
        },
        {
          path: "step2",
          element: <SignUpProfile />
        }
      ]
    },
    {
      path: "/forget-pw",
      children: [
        {
          index: true,
          element: <PasswordVerify />
        },
        {
          path: "edit",
          element: <PasswordEdit />
        }
      ]
    }
  ]);
