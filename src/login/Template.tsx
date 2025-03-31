import { Alert, Box, Card, CardContent, FormControl, MenuItem, Select, Stack } from "@mui/material";
import { CustomTemplateProps } from "../types";

function Template(props: CustomTemplateProps) {
  const { displayMessage = true, kcContext, i18n, headerNode, children } = props;
  const { message, isAppInitiatedAction } = kcContext;
  const { msgStr, currentLanguage, enabledLanguages } = i18n;

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
      <Box width="460px">
        <Card sx={{ padding: "20px", borderRadius: "12px" }}>
          <CardContent>
            <Box display="flex" justifyContent="end">
              <FormControl variant="standard" sx={{ m: 0.2, minWidth: 120 }}>
                <Select label={msgStr("languages")} defaultValue={currentLanguage.languageTag}>
                  {enabledLanguages.map(({ languageTag, label, href }) =>
                    languageTag === currentLanguage.languageTag ? (
                      <MenuItem key={languageTag} value={languageTag}>
                        {label}
                      </MenuItem>
                    ) : (
                      <MenuItem key={languageTag} component="a" href={href}>
                        {label}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              {headerNode}
            </Box>
            {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
              <Stack width="100%" spacing={2}>
                {["success", "warning", "error", "info"].includes(message.type) && (
                  <Alert severity={message.type}>
                    <span dangerouslySetInnerHTML={{ __html: message.summary }}></span>
                  </Alert>
                )}
              </Stack>
            )}
            <Box height="20px" />
            {children}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export { Template };
