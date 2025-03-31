import "./app.css";
import { Suspense, lazy, useEffect, useState } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import { Template } from "./Template";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Error } from "./pages/Error";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { LoginUpdatePasssword } from "./pages/LoginUpdatePassword";

const UserProfileFormFields = lazy(
  () => import("keycloakify/login/UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
  const { kcContext } = props;
  const { i18n } = useI18n({ kcContext });

  const [paletteMode, setPaletteMode] = useState<"light" | "dark">(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      setPaletteMode(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const theme = createTheme({
    palette: {
      mode: paletteMode,
      background: {
        default: paletteMode === "dark" ? "#101012" : "#ffffff"
      }
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense>
        {(() => {
          switch (kcContext.pageId) {
            case "login.ftl":
              return <Login Template={Template} kcContext={kcContext} i18n={i18n} />;
            case "register.ftl":
              return <Register Template={Template} kcContext={kcContext} i18n={i18n} />;
            case "error.ftl":
              return <Error Template={Template} kcContext={kcContext} i18n={i18n} />;
            case "login-update-password.ftl":
              return (
                <LoginUpdatePasssword
                  Template={Template}
                  kcContext={kcContext}
                  i18n={i18n}
                />
              );
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
