import { Link, Typography } from "@mui/material";
import { CustomPageProps } from "../../types";
import { HeaderNode } from "../utils/HeaderNode";

function Error(props: CustomPageProps<"error.ftl">) {
  const { kcContext, i18n, Template } = props;
  const { client, skipLink } = kcContext;
  const { msgStr } = i18n;

  return (
    <Template kcContext={kcContext} i18n={i18n} headerNode={<HeaderNode title={msgStr("errorTitle")} />}>
      {!skipLink && client !== undefined && client.baseUrl !== undefined && (
        <Typography component={Link} href={client.baseUrl}>
          <span dangerouslySetInnerHTML={{ __html: msgStr("backToApplication") }} />
        </Typography>
      )}
    </Template>
  );
}

export { Error };
