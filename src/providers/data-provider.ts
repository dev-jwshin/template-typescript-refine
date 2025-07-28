"use client";

import type { DataProvider } from "@refinedev/core";
import Cookies from "js-cookie";

// 환경변수나 설정에서 API URL을 가져올 수 있습니다
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// API 경로 생성 함수 - 모든 리소스를 admin API로 처리
const getApiPath = (resource: string): string => {
  // admin/ 접두사가 있다면 제거
  const cleanResource = resource.startsWith('admin/') ? resource.replace('admin/', '') : resource;

  // 모든 리소스를 admin API 경로로 처리
  return `/api/v1/admin/${cleanResource}`;
};

// 공통 헤더 생성 함수
const getHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return headers;
};

// 토큰 갱신 함수
const refreshToken = async (): Promise<boolean> => {
  try {
    const refreshTokenValue = Cookies.get("refreshToken");

    if (!refreshTokenValue) {
      return false;
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/admin/auth/sign/refresh`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${refreshTokenValue}`,
        "Content-Type": "application/json",
      },
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
};

// API 요청 래퍼 (토큰 갱신 로직 포함)
const apiRequest = async (url: string, options: RequestInit = {}): Promise<Response> => {
  let response = await fetch(url, {
    ...options,
    headers: {
      ...getHeaders(),
      ...options.headers,
    },
  });

  // 401 에러 시 토큰 갱신 시도
  if (response.status === 401) {
    const refreshSuccess = await refreshToken();

    if (refreshSuccess) {
      // 갱신된 토큰으로 다시 요청
      response = await fetch(url, {
        ...options,
        headers: {
          ...getHeaders(),
          ...options.headers,
        },
      });
    }
  }

  return response;
};

export const dataProvider: DataProvider = {
  getApiUrl: () => API_BASE_URL,

  // 목록 조회 (index)
  getList: async ({ resource, pagination, sorters, filters, meta }) => {
    const apiPath = getApiPath(resource);
    const url = new URL(`${API_BASE_URL}${apiPath}`);

    // 페이지네이션 처리 (커서 기반)
    if (pagination) {
      if (pagination.current && pagination.current > 1 && meta?.nextCursor) {
        url.searchParams.append("cursor", meta.nextCursor);
      }
      if (pagination.pageSize) {
        url.searchParams.append("limit", pagination.pageSize.toString());
      }
    }

    // 정렬 처리
    if (sorters && sorters.length > 0) {
      const sortParams = sorters.map(sorter =>
        sorter.order === "desc" ? `-${sorter.field}` : sorter.field
      ).join(",");
      url.searchParams.append("sort", sortParams);
    }

    // 필터 처리
    if (filters && filters.length > 0) {
      filters.forEach(filter => {
        if (filter.operator === "eq") {
          url.searchParams.append(`filter[${filter.field}_eq]`, String(filter.value));
        } else if (filter.operator === "ne") {
          url.searchParams.append(`filter[${filter.field}_ne]`, String(filter.value));
        } else if (filter.operator === "contains") {
          url.searchParams.append(`filter[${filter.field}_like]`, `%${filter.value}%`);
        } else if (filter.operator === "gte") {
          url.searchParams.append(`filter[${filter.field}_gte]`, String(filter.value));
        } else if (filter.operator === "lte") {
          url.searchParams.append(`filter[${filter.field}_lte]`, String(filter.value));
        } else if (filter.operator === "gt") {
          url.searchParams.append(`filter[${filter.field}_gt]`, String(filter.value));
        } else if (filter.operator === "lt") {
          url.searchParams.append(`filter[${filter.field}_lt]`, String(filter.value));
        } else if (filter.operator === "in") {
          url.searchParams.append(`filter[${filter.field}_in]`, Array.isArray(filter.value) ? filter.value.join(",") : String(filter.value));
        }
      });
    }

    const response = await apiRequest(url.toString());

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(Array.isArray(errorData.message) ? errorData.message.join(", ") : errorData.message || "데이터를 불러올 수 없습니다");
    }

    const responseData = await response.json();

    return {
      data: responseData.data,
      total: responseData.metadata?.pagination?.total || responseData.data.length,
      meta: {
        nextCursor: responseData.metadata?.pagination?.nextCursor,
        totalPages: responseData.metadata?.pagination?.totalPages,
      },
    };
  },

  // 단일 조회 (show)
  getOne: async ({ resource, id, meta }) => {
    const apiPath = getApiPath(resource);
    const response = await apiRequest(`${API_BASE_URL}${apiPath}/${id}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(Array.isArray(errorData.message) ? errorData.message.join(", ") : errorData.message || "데이터를 불러올 수 없습니다");
    }

    const responseData = await response.json();

    return {
      data: responseData.data,
    };
  },

  // 생성 (create)
  create: async ({ resource, variables, meta }) => {
    const apiPath = getApiPath(resource);
    const response = await apiRequest(`${API_BASE_URL}${apiPath}`, {
      method: "POST",
      body: JSON.stringify(variables),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(Array.isArray(errorData.message) ? errorData.message.join(", ") : errorData.message || "데이터를 생성할 수 없습니다");
    }

    const responseData = await response.json();

    return {
      data: responseData.data,
    };
  },

  // 수정 (update)
  update: async ({ resource, id, variables, meta }) => {
    const apiPath = getApiPath(resource);
    const response = await apiRequest(`${API_BASE_URL}${apiPath}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(variables),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(Array.isArray(errorData.message) ? errorData.message.join(", ") : errorData.message || "데이터를 수정할 수 없습니다");
    }

    const responseData = await response.json();

    return {
      data: responseData.data,
    };
  },

  // 삭제 (destroy)
  deleteOne: async ({ resource, id, meta }) => {
    const apiPath = getApiPath(resource);
    const response = await apiRequest(`${API_BASE_URL}${apiPath}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(Array.isArray(errorData.message) ? errorData.message.join(", ") : errorData.message || "데이터를 삭제할 수 없습니다");
    }

    // 삭제 성공 시 응답이 없을 수도 있으므로 체크
    let responseData;
    try {
      responseData = await response.json();
    } catch {
      // 응답 본문이 없는 경우 (204 No Content 등)
      responseData = { data: { id } };
    }

    return {
      data: responseData.data || { id },
    };
  },

  // 다중 조회 (getMany) - 선택적 구현
  getMany: async ({ resource, ids, meta }) => {
    const apiPath = getApiPath(resource);
    const promises = ids.map(id =>
      apiRequest(`${API_BASE_URL}${apiPath}/${id}`)
        .then(async response => {
          if (response.ok) {
            const data = await response.json();
            return data.data;
          }
          return null;
        })
        .catch(() => null)
    );

    const results = await Promise.all(promises);
    const validResults = results.filter(result => result !== null);

    return {
      data: validResults,
    };
  },

  // 커스텀 메서드 (선택적)
  custom: async ({ url, method = "GET", payload, query, headers, meta }) => {
    let customUrl: URL;

    if (url.startsWith("http")) {
      // 절대 URL인 경우
      customUrl = new URL(url);
    } else if (url.startsWith("/")) {
      // 상대 URL이지만 /로 시작하는 경우
      customUrl = new URL(`${API_BASE_URL}${url}`);
    } else {
      // 리소스 이름만 있는 경우 admin API 경로 처리
      const apiPath = getApiPath(url);
      customUrl = new URL(`${API_BASE_URL}${apiPath}`);
    }

    // 쿼리 파라미터 추가
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          customUrl.searchParams.append(key, String(value));
        }
      });
    }

    const requestOptions: RequestInit = {
      method,
      headers: {
        ...headers,
      },
    };

    if (payload && (method === "POST" || method === "PUT" || method === "PATCH")) {
      requestOptions.body = JSON.stringify(payload);
    }

    const response = await apiRequest(customUrl.toString(), requestOptions);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(Array.isArray(errorData.message) ? errorData.message.join(", ") : errorData.message || "요청을 처리할 수 없습니다");
    }

    const responseData = await response.json();

    return {
      data: responseData.data || responseData,
    };
  },
};
