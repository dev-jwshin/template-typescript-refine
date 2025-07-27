// 이 파일은 Next.js 서버 사이드 렌더링을 위한 인증 프로바이더입니다.
// 현재 Vite + React 환경에서는 사용되지 않습니다.
// Next.js로 마이그레이션할 때 활성화할 수 있습니다.

/*
import type { AuthProvider } from "@refinedev/core";
import { cookies } from "next/headers";

// 환경변수나 설정에서 API URL을 가져올 수 있습니다
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const authProviderServer: Pick<AuthProvider, "check"> = {
  check: async () => {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken");

    if (!accessToken?.value) {
      return {
        authenticated: false,
        logout: true,
        redirectTo: "/login",
      };
    }

    try {
      // 서버에서 토큰 유효성 검증
      const response = await fetch(`${API_BASE_URL}/api/v1/admin/users/me`, {
        headers: {
          "Authorization": `Bearer ${accessToken.value}`,
        },
      });

      if (response.ok) {
        return {
          authenticated: true,
        };
      }

      // 토큰이 유효하지 않은 경우
      if (response.status === 401) {
        return {
          authenticated: false,
          logout: true,
          redirectTo: "/login",
        };
      }
    } catch (error) {
      console.error("서버 사이드 인증 확인 중 오류:", error);
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },
};
*/

// Vite 환경에서는 빈 객체를 export
export const authProviderServer = {};
