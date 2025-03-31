import { Button, Checkbox, FormControlLabel, Grid } from "@mui/material";
import { CustomPageProps } from "../../types";
import { HeaderNode } from "../utils/HeaderNode";
import { PasswordField } from "../utils/PasswordField";

function LoginUpdatePasssword(props: CustomPageProps<"login-update-password.ftl">) {
  const { kcContext, i18n, Template } = props;
  const { url, messagesPerField, isAppInitiatedAction } = kcContext;
  const { msgStr } = i18n;

  return (
    <Template kcContext={kcContext} i18n={i18n} headerNode={<HeaderNode title={msgStr("updatePasswordTitle")} />}>
      <form action={url.loginAction} method="post">
        <Grid container spacing={2}>
          <Grid size={12}>
            <PasswordField
              id="passwordNew"
              name="password-new"
              label={msgStr("passwordNew")}
              autoComplete="new-password"
              autoFocus
              error={messagesPerField.existsError("password", "password-confirm")}
              helperText={messagesPerField.getFirstError("password")}
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <PasswordField
              id="passwordConfirm"
              name="password-confirm"
              label={msgStr("passwordConfirm")}
              autoComplete="new-password"
              error={messagesPerField.existsError("password", "password-confirm")}
              helperText={messagesPerField.getFirstError("password-confirm")}
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <FormControlLabel control={<Checkbox name="logout-sessions" value="on" defaultChecked={true} />} label={msgStr("logoutOtherSessions")} />
          </Grid>
          <Grid container size={12} spacing={1}>
            <Button fullWidth variant="contained" type="submit">
              {msgStr("doSubmit")}
            </Button>
            {isAppInitiatedAction && (
              <Button fullWidth type="submit">
                {msgStr("doCancel")}
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </Template>
  );
}

export { LoginUpdatePasssword };
