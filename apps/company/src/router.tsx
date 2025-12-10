import { createBrowserRouter, useNavigate } from "react-router-dom";
import { Header } from "@jobis/design-system";

const CompanyHeader = () => {
  const navigate = useNavigate();
  return <Header types="company" onClickLogo={() => navigate("/")} />;
};

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      path: "/",
      element: <CompanyHeader />,
      children: [
        {
          path: "/recruitment",
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
            { path: "detail", element: <div>내 기업정보</div> },
            {
              path: "detail/edit",
              element: <div>기업 정보 수정</div>
            }
          ]
        },

        {
          path: "/application",
          element: <div>지원자</div>
        }
      ]
    },
    {
      path: "/login",
      element: <div>login</div>
    }
  ]);
