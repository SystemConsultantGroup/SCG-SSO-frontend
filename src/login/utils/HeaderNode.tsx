import logoWebpPath from "../assets/images/scg_logo_only_image.webp";
import { Box, Typography } from "@mui/material";

function HeaderNode(props: { title: string }) {
  const { title } = props;

  return (
    <>
      {/** SCG 로고 이미지 */}
      <Box
        component="img"
        alt="System Consultant Group"
        src={logoWebpPath}
        sx={{
          width: "3.6em"
        }}
      />
      {/** 제목 */}
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        sx={{ marginBottom: "20px" }}
      >
        {title}
      </Typography>
    </>
  );
}

export { HeaderNode };
