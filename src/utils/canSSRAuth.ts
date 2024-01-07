import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies, destroyCookie } from "nookies";

import { AuthTokenError } from "../services/errors/AuthTokenError";

export function canSSRAuth<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>
) {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context);
    const token = cookies[process.env.NEXT_PUBLIC_TOKEN_COOKIE];

    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    try {
      return await fn(context);
    } catch (error) {
      if (error instanceof AuthTokenError) {
        destroyCookie(context, process.env.NEXT_PUBLIC_TOKEN_COOKIE);
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  };
}
