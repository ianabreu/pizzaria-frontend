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
    if (cookies["@pizzaria.token"]) {
      return {
        redirect: {
          destination: "/admin",
          permanent: false,
        },
      };
    }
    return await fn(context);
  };
}
