"use client";

import type { AuthProvider } from "@refinedev/core";
import Cookies from "js-cookie";

// 환경변수나 설정에서 API URL을 가져올 수 있습니다
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const authProviderClient: AuthProvider = {
  login: async ({ email, password, remember }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/admin/auth/sign/in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: {
            name: "LoginError",
            message: Array.isArray(errorData.message)
              ? errorData.message.join(", ")
              : errorData.message || "로그인에 실패했습니다",
          },
        };
      }

      const data = await response.json();

      // JWT 토큰들을 쿠키에 저장
      const cookieOptions = {
        expires: remember ? 30 : 1, // remember가 true면 30일, 아니면 1일
        path: "/",
      };

      Cookies.set("accessToken", data.accessToken, cookieOptions);
      Cookies.set("refreshToken", data.refreshToken, {
        expires: 7, // 리프레시 토큰은 7일
        path: "/",
      });

      return {
        success: true,
        redirectTo: "/users",
      };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: "네트워크 오류가 발생했습니다",
        },
      };
    }
  },

  logout: async () => {
    try {
      const accessToken = Cookies.get("accessToken");

      if (accessToken) {
        // 백엔드에 로그아웃 요청
        await fetch(`${API_BASE_URL}/api/v1/admin/auth/sign/out`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
      }
    } catch (error) {
      console.error("로그아웃 요청 중 오류:", error);
    }

    // 쿠키에서 토큰 제거
    Cookies.remove("accessToken", { path: "/" });
    Cookies.remove("refreshToken", { path: "/" });

    return {
      success: true,
      redirectTo: "/login",
    };
  },

  check: async () => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      return {
        authenticated: false,
        logout: true,
        redirectTo: "/login",
      };
    }

    try {
      // 현재 사용자 정보로 토큰 유효성 검증
      const response = await fetch(`${API_BASE_URL}/api/v1/admin/users/me`, {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        return {
          authenticated: true,
        };
      }

      // 토큰이 만료된 경우 리프레시 시도
      if (response.status === 401) {
        const refreshSuccess = await refreshToken();

        if (refreshSuccess) {
          return {
            authenticated: true,
          };
        }
      }
    } catch (error) {
      console.error("인증 확인 중 오류:", error);
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },

  getPermissions: async () => {
    try {
      const user = await getCurrentUser();
      return user?.role ? [user.role] : null;
    } catch (error) {
      console.error("권한 조회 중 오류:", error);
      return null;
    }
  },

  getIdentity: async () => {
    try {
      return await getCurrentUser();
    } catch (error) {
      console.error("사용자 정보 조회 중 오류:", error);
      return null;
    }
  },

  onError: async (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 시 리프레시 시도
      const refreshSuccess = await refreshToken();

      if (!refreshSuccess) {
        return {
          logout: true,
        };
      }
    }

    return { error };
  },
};

// 토큰 갱신 함수
async function refreshToken(): Promise<boolean> {
  try {
    const refreshTokenValue = Cookies.get("refreshToken");

    if (!refreshTokenValue) {
      return false;
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/admin/auth/sign/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: refreshTokenValue }),
    });

    if (response.ok) {
      const data = await response.json();

      // 새로운 액세스 토큰 저장
      Cookies.set("accessToken", data.accessToken, {
        expires: 1, // 1일
        path: "/",
      });

      return true;
    }
  } catch (error) {
    console.error("토큰 갱신 중 오류:", error);
  }

  // 갱신 실패 시 모든 토큰 제거
  Cookies.remove("accessToken", { path: "/" });
  Cookies.remove("refreshToken", { path: "/" });

  return false;
}

// 현재 사용자 정보 조회 함수
async function getCurrentUser() {
  const accessToken = Cookies.get("accessToken");

  if (!accessToken) {
    throw new Error("토큰이 없습니다");
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/admin/users/me`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      // 토큰 갱신 시도
      const refreshSuccess = await refreshToken();

      if (refreshSuccess) {
        // 갱신된 토큰으로 다시 시도
        const newAccessToken = Cookies.get("accessToken");
        const retryResponse = await fetch(`${API_BASE_URL}/api/v1/admin/users/me`, {
          headers: {
            "Authorization": `Bearer ${newAccessToken}`,
          },
        });

        if (retryResponse.ok) {
          return await retryResponse.json();
        }
      }

      throw new Error("인증이 필요합니다");
    }

    throw new Error("사용자 정보를 불러올 수 없습니다");
  }

  return await response.json();
}
