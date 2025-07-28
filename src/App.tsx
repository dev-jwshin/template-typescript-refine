import {
  Refine,
  Authenticated,
} from "@refinedev/core";
import {
  useNotificationProvider,
  ThemedLayoutV2,
  ErrorComponent,
  RefineThemes,
  Sider,
} from "@refinedev/antd";
import {
  UserOutlined,
} from "@ant-design/icons";

import { authProviderClient } from "./providers/auth-provider";
import { dataProvider } from "./providers/data-provider";
import routerProvider, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { App as AntdApp, ConfigProvider } from "antd";
import koKR from "antd/locale/ko_KR";

import "@refinedev/antd/dist/reset.css";
import "./App.css";

import { UserList, UserEdit, UserShow } from "../src/pages/users";
import { LoginPage } from "../src/pages/login";
import { Header } from "./components/header";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue} locale={koKR}>
        <AntdApp>
          <Refine
            authProvider={authProviderClient}
            dataProvider={dataProvider}
            routerProvider={routerProvider}
            resources={[
              {
                name: "users",
                list: "/users",
                show: "/users/show/:id",
                edit: "/users/edit/:id",
                meta: {
                  label: "사용자 관리",
                },
              },
            ]}
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
                    <ThemedLayoutV2 Header={() => <div></div>} Sider={() => <Sider Title={() => <div className="text-white text-3xl text-center p-4">관리자</div>} />} >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route index element={<UserList />} />

                <Route path="/users">
                  <Route index element={<UserList />} />
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
                <Route
                  path="/login"
                  element={<LoginPage />}
                />
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
