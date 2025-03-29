import kakaoLogoWebpPath from "../assets/images/kakaotalk.webp";
import naverLogoWebpPath from "../assets/images/naver.webp";
import { Box, Button, Checkbox, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material";
import { CustomPageProps } from "../../types";
import { useState } from "react";
import { HeaderNode } from "../utils/HeaderNode";

function Login(props: CustomPageProps<"login.ftl">) {
  const { kcContext, i18n, Template } = props;
  const { social, realm, url, login, registrationDisabled, messagesPerField } = kcContext;
  const { msgStr } = i18n;
  const { loginWithEmailAllowed } = realm;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  return (
    <Template kcContext={kcContext} i18n={i18n} headerNode={<HeaderNode title={msgStr("doLogIn")} />}>
      {/** 로그인 제출 폼 */}
      <form
        onSubmit={() => {
          setIsLoginButtonDisabled(true);
          return true;
        }}
        action={url.loginAction}
        method="post"
      >
        <Grid container spacing={2}>
          {/** 이메일 */}
          <Grid size={12}>
            <TextField
              type="text"
              name="username"
              defaultValue={login.username ?? ""}
              label={loginWithEmailAllowed ? msgStr("email") : msgStr("username")}
              autoFocus
              autoComplete="username"
              error={messagesPerField.existsError("username")}
              fullWidth
            />
          </Grid>
          {/** 비밀번호 */}
          <Grid size={12}>
            <TextField
              fullWidth
              name="password"
              type="password"
              label={msgStr("password")}
              autoComplete="current-password"
              error={messagesPerField.existsError("password")}
              helperText={messagesPerField.getFirstError("username", "password")}
            />
          </Grid>
          {/** 로그인 상태 유지 && 비밀번호 변경 */}
          <Grid size={12}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              {realm.rememberMe && (
                <FormControlLabel control={<Checkbox name="rememberMe" defaultChecked={!!login.rememberMe} />} label={msgStr("rememberMe")} />
              )}
              {realm.resetPasswordAllowed && (
                <Typography href={kcContext.properties.RECOVER_PW_PAGE} component={Link}>
                  {msgStr("doForgotPassword")}
                </Typography>
              )}
            </Box>
          </Grid>
          {/** 로그인 버튼 */}
          <Grid size={12}>
            <Button fullWidth variant="contained" type="submit" disabled={isLoginButtonDisabled}>
              {msgStr("doLogIn")}
            </Button>
          </Grid>
          {/** 소셜 로그인 - 미사용 예정이어서 static으로 표시 */}
          <Grid container size={12} gap={1}>
            {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
              <>
                {/** 카카오톡 로그인 */}
                <Box
                  padding="3px 0"
                  borderRadius={1}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  gap="10px"
                  sx={{ backgroundColor: "var(--color-kakaotalk)" }}
                >
                  <Box
                    component="img"
                    alt="KakaoTalk"
                    src={kakaoLogoWebpPath}
                    sx={{
                      width: "36px"
                    }}
                  />
                  <Typography color="var(--color-black)">{msgStr("doLogInKakao")}</Typography>
                </Box>
                {/** 네이버로 로그인 */}
                <Box
                  padding="3px 0"
                  borderRadius={1}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  gap="10px"
                  sx={{ backgroundColor: "var(--color-naver)" }}
                >
                  <Box
                    component="img"
                    alt="Naver"
                    src={naverLogoWebpPath}
                    sx={{
                      width: "36px"
                    }}
                  />
                  <Typography color="var(--color-white)">{msgStr("doLogInNaver")}</Typography>
                </Box>
              </>
            )}
          </Grid>
          {/** 회원가입 링크 */}
          {realm.password && realm.registrationAllowed && !registrationDisabled && (
            <Grid container gap={0.5}>
              <Typography>{msgStr("noAccount")}</Typography>
              <Typography href={kcContext.properties.SIGNUP_PAGE} component={Link}>
                {msgStr("doRegister")}
              </Typography>
            </Grid>
          )}
        </Grid>
      </form>
    </Template>
  );
}

export { Login };
