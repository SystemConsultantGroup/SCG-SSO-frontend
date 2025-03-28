/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
  .withThemeName<ThemeName>()
  .withExtraLanguages({
    ko: {
      // cspell: disable-next-line
      label: "한국어",
      getMessages: () => import("./i18n.ko")
    }
  })
  .withCustomTranslations({
    ko: {
      doLogInKakao: "카카오톡으로 로그인",
      doLogInNaver: "네이버로 로그인"
    },
    en: {
      doLogInKakao: "Sign up with Kakao",
      doLogInNaver: "Sign up with Naver"
    }
  })
  .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
