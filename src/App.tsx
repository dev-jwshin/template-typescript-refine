import {
  ErrorComponent,
  RefineThemes,
  Sider,
  ThemedLayoutV2,
  useNotificationProvider,
} from "@refinedev/antd";
import { Authenticated, Refine } from "@refinedev/core";

import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp, ConfigProvider } from "antd";
import koKR from "antd/locale/ko_KR";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { authProviderClient } from "./providers/auth-provider";
import { dataProvider } from "./providers/data-provider";
import { i18nProvider } from "./providers/i18n-provider";

// koKR를 상속받아서 일부만 커스터마이징
const customLocale: Locale = {
  ...koKR,
  // Pagination 커스터마이징
  Pagination: {
    ...koKR.Pagination,
    items_per_page: "개씩 보기",
  },
  // Table 커스터마이징
  Table: {
    ...koKR.Table,
    emptyText: "데이터가 없습니다",
  },
}; // TypeScript 타입 체크 우회

import "@refinedev/antd/dist/reset.css";
import "./App.css";

import { Locale } from "antd/es/locale";
import { LoginPage } from "../src/pages/login";
import { UserCreate, UserEdit, UserList, UserShow } from "../src/pages/users";
import { Header } from "./components/header";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue} locale={customLocale}>
        <AntdApp>
          <Refine
            authProvider={authProviderClient}
            dataProvider={dataProvider}
            routerProvider={routerProvider}
            i18nProvider={i18nProvider}
            resources={
              [
                // {
                //   name: "users",
                //   list: "/users",
                //   show: "/users/show/:id",
                //   edit: "/users/edit/:id",
                //   create: "/users/create",
                //   meta: {
                //     label: "사용자",
                //   },
                // },
              ]
            }
            notificationProvider={useNotificationProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    fallback={<CatchAllNavigate to="/login" />}
                  >
                    <ThemedLayoutV2
                      Header={() => <div></div>}
                      Sider={() => (
                        <Sider
                          Title={() => (
                            <div className="text-white text-2xl text-center p-4">
                              관리자
                            </div>
                          )}
                        />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route index element={<UserList />} />

                <Route path="/users">
                  <Route index element={<UserList />} />
                  <Route path="create" element={<UserCreate />} />
                  <Route path="edit/:id" element={<UserEdit />} />
                  <Route path="show/:id" element={<UserShow />} />
                </Route>
              </Route>

              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="users" />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<LoginPage />} />
              </Route>

              <Route
                element={
                  <Authenticated key="catch-all">
                    <ThemedLayoutV2 Header={() => <Header />}>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
