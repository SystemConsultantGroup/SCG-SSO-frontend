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
      doLogInNaver: "네이버로 로그인",
      doConfirmUsernameUnique: "중복확인",
      registerRole: "구분",
      roleStudent: "학생",
      roleProfessor: "교수",
      roleEnterprise: "기업관계자",
      roleManager: "교직원",
      roleStranger: "외부인",
      studentNumber: "학번",
      studentMajor: "전공"
    },
    en: {
      doLogInKakao: "Sign up with Kakao",
      doLogInNaver: "Sign up with Naver",
      doConfirmUsernameUnique: "Check Unique",
      registerRole: "role",
      roleStudent: "Student",
      roleProfessor: "Professor",
      roleEnterprise: "Company Member",
      roleManager: "Manager",
      roleStranger: "Other",
      studentNumber: "Student Number",
      studentMajor: "Major"
    }
  })
  .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
