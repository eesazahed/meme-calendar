import type { NextPage } from "next";
import PageHead from "../components/PageHead";
import Title from "../components/Title";
import getUserFromSession from "../utils/getUserFromSession";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Input from "../components/Input";
import Error from "../components/Error";
import Btn from "../components/Btn";
import Success from "../components/Success";
import Textarea from "../components/Textarea";
import ImageUploadForm from "../components/ImageUploadForm";

interface Props {
  user: UserType;
}

const Create: NextPage<Props> = ({ user }) => {
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/api/auth/signin");
    }
  }, []);

  const [message, setMessage] = useState({ message: "", type: "" });
  const [imageLoaded, setImageLoaded] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    description: "",
    image: "",
    imageFailed: false,
  });

  const titleRef = useRef<HTMLDivElement | null>(null);
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const scrollToInput = () => {
    const refObject: { [key: string]: React.RefObject<HTMLDivElement> } = {
      title: titleRef,
      description: descriptionRef,
      image: imageRef,
    };
    const ref = refObject[message.type];
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  useEffect(() => {
    if (["title", "description", "image"].includes(message.type)) {
      scrollToInput();
    }
  }, [message]);

  const submitForm = async () => {
    setMessage({ message: "Submitting...", type: "success" });

    const request = await fetch("/api/vote/createoption", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const data = await request.json();

    setMessage(data);

    if (data.type === "success") {
      router.push("/profile#user-stuff");
    }
  };

  return (
    <div>
      <PageHead title="create" />

      <main>
        <Title text="create" emoji="&#128221;" />

        <p>fill out this form :)</p>

        <div className="max-w-[500px] mx-auto text-left">
          {/* TITLE */}
          <div ref={titleRef}>
            <Input
              label="give a title"
              placeholder="imagine if ninja got a low-taper fade"
              parentData={formData.title}
              updateParent={(e: string) =>
                setFormData({ ...formData, title: e })
              }
            />
            <p
              className={`text-sm text-right mt-1 ${
                50 - formData.title.length >= 0
                  ? "text-gray-400"
                  : "text-red-400"
              }`}
            >
              {50 - formData.title.length} characters left
            </p>
            {message.type === "title" && (
              <p className="my-2 text-sm">
                <Error text={message.message} />
              </p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div ref={descriptionRef}>
            <Textarea
              label="describe it"
              placeholder="the meme is STILL massive in 2025!"
              parentData={formData.description}
              updateParent={(e: string) =>
                setFormData({ ...formData, description: e })
              }
            />
            <p
              className={`text-sm text-right mt-1 ${
                200 - formData.description.length >= 0
                  ? "text-gray-400"
                  : "text-red-400"
              }`}
            >
              {200 - formData.description.length} characters left
            </p>
            {message.type === "description" && (
              <p className="my-2 text-sm">
                <Error text={message.message} />
              </p>
            )}
          </div>

          {/* IMAGE */}
          <div ref={imageRef}>
            <ImageUploadForm
              label="upload a relevant image"
              name="image"
              whenClicked={() => setImageLoaded(false)}
              updateParent={(e: string) => {
                setFormData({ ...formData, image: e });
                setImageLoaded(true);
              }}
            />
            {formData.image.length > 0 && (
              <div>
                {!formData.imageFailed ? (
                  <>
                    {imageLoaded && (
                      <div className="my-6 w-full">
                        <img
                          className="h-full w-full object-cover rounded-3xl"
                          src={formData.image}
                          onError={(e) =>
                            setFormData({ ...formData, imageFailed: true })
                          }
                          alt="preview"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <p className="my-4 text-sm">
                    <Error text="could not load image." />
                  </p>
                )}
              </div>
            )}
            {message.type === "image" && (
              <p className="my-2 text-sm">
                <Error text={message.message} />
              </p>
            )}
          </div>

          {/* SUBMIT */}
          <div className="mt-8">
            <Btn text="let's go!" color="green" onClick={submitForm} />
          </div>

          {/* ERRORS */}
          <div className="py-8">
            {["auth", "server", "success"].includes(message.type) ? (
              message.type === "success" ? (
                <p className="text-center text-sm">
                  <Success text={message.message} />
                </p>
              ) : (
                <p className="text-center text-sm">
                  <Error text={message.message} />
                </p>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Create;

export const getServerSideProps = async (context: any) => {
  const user = await getUserFromSession(context.req);

  return {
    props: {
      user,
    },
  };
};
