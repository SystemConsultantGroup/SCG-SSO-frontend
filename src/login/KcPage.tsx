import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import { Login } from "./pages/Login";
import { Template } from "./Template";
import "./app.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { Register } from "./pages/Register";
import { Error } from "./pages/Error";

const UserProfileFormFields = lazy(
  () => import("keycloakify/login/UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;

const theme_dark = createTheme({
  palette: {
    mode: "dark"
  },
  typography: {
    fontFamily: [
      '"Pretendard Variable"',
      "Pretendard",
      "-apple-system",
      "BlinkMacSystemFont",
      "system-ui",
      "Roboto",
      '"Helvetica Neue"',
      '"Segoe UI"',
      '"Apple SD Gothic Neo"',
      '"Noto Sans KR"',
      '"Malgun Gothic"',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      "sans-serif"
    ].join(",")
  }
});

export default function KcPage(props: { kcContext: KcContext }) {
  const { kcContext } = props;
  const { i18n } = useI18n({ kcContext });

  return (
    <ThemeProvider theme={theme_dark}>
      <Suspense>
        {(() => {
          switch (kcContext.pageId) {
            case "login.ftl":
              return <Login Template={Template} kcContext={kcContext} i18n={i18n} />;
            case "register.ftl":
              return <Register Template={Template} kcContext={kcContext} i18n={i18n} />;
            case "error.ftl":
              return <Error Template={Template} kcContext={kcContext} i18n={i18n} />;
            default:
              return (
                <DefaultPage
                  kcContext={kcContext}
                  i18n={i18n}
                  classes={classes}
                  Template={Template}
                  doUseDefaultCss={true}
                  UserProfileFormFields={UserProfileFormFields}
                  doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
              );
          }
        })()}
      </Suspense>
    </ThemeProvider>
  );
}

const classes = {} satisfies { [key in ClassKey]?: string };
