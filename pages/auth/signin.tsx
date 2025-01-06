import type { NextPage } from "next";
import { getProviders, signIn } from "next-auth/react";
import Btn from "../../components/Btn";
import Title from "../../components/Title";
import PageHead from "../../components/PageHead";
import { useEffect } from "react";
import { useRouter } from "next/router";
import getUserFromSession from "../../utils/getUserFromSession";
import { UserType } from "../../types";

interface Props {
  user: UserType;
  providers: Object;
}

const SignIn: NextPage<Props> = ({ user, providers }) => {
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/profile");
    }
  }, []);

  return (
    <div>
      <PageHead title="Sign in" />

      <main>
        <Title text="Sign in" />

        <div className="max-w-[400px] mx-auto mb-16">
          {Object.values(providers).map((provider) => (
            <Btn
              key={provider.name}
              text={`Sign in with ${provider.name}`}
              onClick={() => signIn(provider.id)}
              color={provider.name === "GitHub" ? "gray" : ""}
            />
          ))}
        </div>

        <p className="text-center text-sm">
          Use your Google account to sign in! <br />
          <br />
          None of your data will be shared or sold with any third-parties.
          <br /> <br /> Your Google account is simply being used for a
          convenient authentication method.
        </p>
      </main>
    </div>
  );
};

export default SignIn;

export const getServerSideProps = async (context: any) => {
  const providers = await getProviders();
  const user = await getUserFromSession(context.req);

  return {
    props: { user, providers },
  };
};
