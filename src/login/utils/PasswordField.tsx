import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";

function PasswordField(
  props: {
    id: string;
  } & Omit<TextFieldProps, "type" | "slotProps">
) {
  const { id } = props;

  const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({
    passwordInputId: id
  });

  return (
    <TextField
      type="password"
      slotProps={{
        input: {
          endAdornment: (
            <Box sx={{ px: "5px" }}>
              <InputAdornment position="end">
                <IconButton onClick={toggleIsPasswordRevealed} edge="end">
                  {isPasswordRevealed ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            </Box>
          )
        }
      }}
      {...props}
    />
  );
}

export { PasswordField };
