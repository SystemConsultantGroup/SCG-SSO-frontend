import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { CustomPageProps } from "../../types";
import { HeaderNode } from "../utils/HeaderNode";
import { useState } from "react";
import { PasswordField } from "../utils/PasswordField";

function Register(props: CustomPageProps<"register.ftl">) {
  const { kcContext, i18n, Template } = props;
  const { url, messagesPerField } = kcContext;
  const { msgStr } = i18n;

  const [role, setRole] = useState("");
  const handleChangeRole = (e: SelectChangeEvent) => setRole(e.target.value as string);

  return (
    <Template kcContext={kcContext} i18n={i18n} headerNode={<HeaderNode title={msgStr("doRegister")} />}>
      {/** 회원가입 제출 폼 */}
      <form action={url.registrationAction} method="post">
        <Grid container spacing={2}>
          {/** 사용자 이름 - TODO: 추후 수정 필요 */}
          <Grid container size={12} spacing={1}>
            {/** 사용자 이름 입력란 */}
            <Grid size="grow">
              <TextField type="text" name="username" label={msgStr("username")} autoComplete="username" fullWidth />
            </Grid>
            {/** 사용자 이름 중복 확인 */}
            <Grid>
              <Button sx={{ height: "100%" }} variant="contained">
                {msgStr("doConfirmUsernameUnique")}
              </Button>
            </Grid>
          </Grid>
          {/** 비밀번호 */}
          <Grid size={12}>
            <PasswordField
              id="password"
              name="password"
              label={msgStr("password")}
              autoComplete="password"
              error={messagesPerField.existsError("password", "password-confirm")}
              helperText={messagesPerField.getFirstError("password")}
              fullWidth
            />
          </Grid>
          {/** 비밀번호 확인 */}
          <Grid size={12}>
            <PasswordField
              id="passwordConfirm"
              name="password-confirm"
              label={msgStr("passwordConfirm")}
              autoComplete="password"
              error={messagesPerField.existsError("password", "password-confirm")}
              helperText={messagesPerField.getFirstError("password-confirm")}
              fullWidth
            />
          </Grid>
          {/** 권한 */}
          <Grid size={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>{msgStr("registerRole")}</InputLabel>
              <Select value={role} label={msgStr("registerRole")} onChange={handleChangeRole}>
                <MenuItem value="student">{msgStr("roleStudent")}</MenuItem>
                <MenuItem value="professor">{msgStr("roleProfessor")}</MenuItem>
                <MenuItem value="company">{msgStr("roleEnterprise")}</MenuItem>
                <MenuItem value="manager">{msgStr("roleManager")}</MenuItem>
                <MenuItem value="other">{msgStr("roleStranger")}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/** 만일 권한이 학생인 경우 */}
          {role === "student" && (
            <>
              {/** 이메일 */}
              <Grid container size={12} spacing={1}>
                {/** 이메일 아이디 입력 */}
                <Grid size="grow">
                  <TextField type="text" name="emailId" label={msgStr("email")} autoComplete="email" fullWidth />
                </Grid>
                {/** @ */}
                <Box display="flex" alignItems="center">
                  <Typography fontSize="1.2em">@</Typography>
                </Box>
                {/** 워크스페이스 이메일 도메인 */}
                <Grid size={4}>
                  <TextField disabled value="@g.skku.edu" fullWidth />
                </Grid>
              </Grid>
              {/** 학번 */}
              <Grid size={12}>
                <TextField type="text" name="student-number" label={msgStr("studentNumber")} autoComplete="student-number" fullWidth />
              </Grid>
              {/** 전공 */}
              <Grid size={12}>
                <TextField type="text" name="major" label={msgStr("studentMajor")} autoComplete="major" fullWidth />
              </Grid>
            </>
          )}
          {/** 회원가입 버튼 - TODO: 추후 수정 필요 */}
          <Grid size={12}>
            <Button fullWidth variant="contained" type="submit">
              {msgStr("doRegister")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Template>
  );
}

export { Register };
