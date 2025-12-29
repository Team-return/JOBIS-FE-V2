import { createBrowserRouter } from "react-router-dom";
import { Header } from "@jobis/design-system";
import { applicationsKeys, companiesKeys, query } from "@jobis/api";

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      path: "/",
      element: <Header type="company" />,
      children: [
        {
          path: "/",
          children: [
            {
              index: true,
              element: <div>동계 체험 or 현장 실습 선택 페이지</div>
            },
            { path: "write", element: <div>모집의뢰서 작성</div> },
            {
              path: "write/winter",
              element: <div>동계 체험 모집의뢰서 작성</div>
            }
          ]
        },
        {
          path: "/company",
          children: [
            { index: true, element: <div>기업정보 등록</div> },
            {
              path: "detail",
              loader: () => {
                query.prefetch(companiesKeys.companyMy());
                return null;
              },
              element: <div>내 기업정보</div>
            },
            {
              path: "detail/edit",
              loader: () => {
                query.prefetch(companiesKeys.companyMy());
                return null;
              },
              element: <div>기업 정보 수정</div>
            }
          ]
        },

        {
          path: "/application",
          loader: () => {
            query.prefetch(applicationsKeys.companyApplications());
            return null;
          },
          element: <div>지원자</div>
        }
      ]
    },
    {
      path: "/login",
      element: <div>login</div>
    }
  ]);
