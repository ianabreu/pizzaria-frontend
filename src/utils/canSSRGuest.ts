import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";

export function canSSRGuest<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>
) {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context);
    if (cookies[process.env.NEXT_PUBLIC_TOKEN_COOKIE]) {
      return {
        redirect: {
          destination: "/painel",
          permanent: false,
        },
      };
    }
    return await fn(context);
  };
}
