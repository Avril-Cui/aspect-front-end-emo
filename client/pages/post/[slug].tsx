import Header from "../../components/Header/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import { GetStaticProps } from "next";
import PortableText from "react-portable-text";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import styles from "../../styles/post/article.module.css";
import Cookies from "universal-cookie";
import rocket from "../../image/logo/rocket_black.png";
import message from "../../image/logo/message_black.png";
import Image from "next/image";

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const cookies = new Cookies();
  const user_uid = cookies.get("user_uid");
  const user_data = cookies.get("userData");

  const colors = [
    "#3f8dd6",
    "#3f41d6",
    "#b39431",
    "#b65353",
    "#3fd671"
  ];

  const random = Math.floor(Math.random() * colors.length);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    data["name"] = user_data.user_name
    data["email"] = user_data.user_email
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };

  return (
    <div className={styles.container}>
      <Header />
      <div>
        <div className={styles.test} />
        <div style={{ fontSize: 18 }}>
          <article className={styles.article}>
            <div className={styles.intro_div}>
              <img
                className={styles.author_pic}
                src={urlFor(post.author.image).url()!}
                alt=""
              />
              <div>
                <p className={styles.post_detail}>{post.author.name}</p>
                <p className={styles.post_date}>
                  {new Date(post._createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <h1 className={styles.title}>{post.title}</h1>

            <div className="mt-5">
              <PortableText
                dataset={
                  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID! || "production"
                }
                projectId={
                  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID! || "n6repj5a"
                }
                content={post.body}
                className={styles.paragraphs}
                serializers={{
                  normal_block: (props: any) => (
                    <div className={styles.paragraphs_normal} {...props} />
                  ),
                  h1: (props: any) => <h1 className={styles.h1} {...props} />,
                  h2: (props: any) => <h2 className={styles.h2} {...props} />,
                  h3: (props: any) => <h3 className={styles.h3} {...props} />,
                  li: ({ children }: any) => (
                    <li className={styles.list}>{children}</li>
                  ),
                  link: ({ href, children }: any) => (
                    <a href={href} className={styles.link}>
                      {children}
                    </a>
                  ),
                }}
              />
            </div>
          </article>
        </div>

        <hr className="max-w-lg my-5 mx-auto border border-green-500" />

        {submitted ? (
          <div className={styles.success_comment}>
            <h3 className="text-3xl font-bold">
              Thank you for submitting your comment!
            </h3>
            <p>Once it has been approved, it will appear below!</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
          >
            <h3 className={styles.form_question}>
              Is this article helpful for you?
            </h3>
            <h4 className="text-3xl font-bold">Leave a comment below!</h4>
            <hr className="py-3 mt-2" />

            {user_uid == undefined && (
              <div>
                <p className={styles.login_sign}>Log in to leave a comment.</p>
              </div>
            )}

            {user_uid != undefined && (
              <div>
                <input
                  {...register("_id")}
                  type="hidden"
                  name="_id"
                  value={post._id}
                ></input>
                <label className="block mb-5">
                  <span className="text-gray-700">Comment</span>
                  <textarea
                    {...register("comment", { required: true })}
                    className={styles.input_name}
                    placeholder="Try typing some comments here!"
                    rows={8}
                  />
                </label>

                <div className="flex flex-col p-5">
                  {errors.comment && (
                    <span className="text-red-500">
                      - The Comment Field Is Required
                    </span>
                  )}
                </div>

                <input type="submit" className={styles.submit_button}></input>
              </div>
            )}
          </form>
        )}
        <div className={styles.center}>
          <p className={styles.comment_header}>Comments</p>
          {post.comments.map((comment) => (
            <div key={comment._id} className={styles.user_comment}>
              <div className={styles.inline}>
                <div
                  className={styles.comment_profile_pic}
                  style={{ background: `${colors[random]}` }}
                >
                  {comment.name.charAt(0)}
                </div>
                <p className={styles.user_name}>{comment.name}</p>
              </div>
              <div className={styles.comment_text_section}>
                <p className={styles.comment_text}>{comment.comment}</p>
              </div>
              <div className={styles.inline}>
                <button
                  className={styles.like_button}
                  style={{ paddingTop: "0.25em" }}
                >
                  <div className={styles.inline}>
                    <Image src={rocket} width="22px" height="22px" />
                    <p className={styles.like_num}>10</p>
                  </div>
                </button>
                <button
                  className={styles.message_button}
                  style={{ paddingTop: "0.25em" }}
                >
                  <div className={styles.inline}>
                    <Image src={message} width="22px" height="22px" />
                    <p className={styles.like_num}>10</p>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
        _id,
        slug {
          current
        },
      }`;

  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: Post) => {
    return {
      params: {
        slug: post.slug.current,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      author-> {
        name,
        image
      },
      'comments': *[
        _type == "comment" &&
        post._ref == ^._id &&
        approved == true],
      description,
      mainImage,
      slug,
      body,
    }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
