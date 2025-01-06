import type { NextPage } from "next";
import { getProviders, signIn } from "next-auth/react";
import Btn from "../../components/Btn";
import Title from "../../components/Title";
import PageHead from "../../components/PageHead";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { UserType } from "../../types";
import getUserFromSession from "../../utils/getUserFromSession";

interface Props {
  user: UserType;
  providers: Object;
}

const SignIn: NextPage<Props> = ({ user, providers }) => {
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/vote");
    }
  }, []);

  return (
    <div>
      <PageHead title="sign in" />

      <main>
        <Title text="sign in" />

        <div className="max-w-[400px] mx-auto mb-16">
          {Object.values(providers).map((provider) => (
            <Btn
              key={provider.name}
              text={`sign in with ${provider.name}`}
              onClick={() => signIn(provider.id)}
              color={provider.name === "GitHub" ? "gray" : ""}
            />
          ))}
        </div>

        <p className="text-center text-sm">
          use your Google account to sign in <br />
          <br />
          none of your data will be shared or sold with any third-parties
          <br /> <br /> your Google account is simply being used for a
          convenient authentication method
        </p>
      </main>
    </div>
  );
};

export default SignIn;

export const getServerSideProps = async (context: any) => {
  const user = await getUserFromSession(context.req);
  const providers = await getProviders();

  return {
    props: { user, providers },
  };
};
