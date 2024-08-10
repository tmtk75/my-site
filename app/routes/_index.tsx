import {
  Link,
  type MetaFunction,
  NavLink,
  useLoaderData,
} from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "tmtk.net" },
    {
      name: "description",
      content: "Welcome to Remix!",
    },
  ];
};

// export const loader = async () => {
//   const posts = await getPosts();
//   return posts.filter((post) => post);
// };

type Frontmatter = {
  title: string;
  description: string;
  published: string; // YYYY-MM-DD
  draft?: boolean;
};

type PostMeta = {
  slug: string;
  frontmatter: Frontmatter;
};

const getPosts = async (): Promise<PostMeta[]> => {
  const modules = import.meta.glob<{ frontmatter: Frontmatter }>(
    "./post.*.mdx",
    { eager: true }
  );
  // const build = await import("virtual:remix/server-build");
  const posts = Object.entries(modules).map(([file, post]) => {
    const slug = file.replace(/\.\/post\./, "").replace(/\.mdx$/, "");
    return {
      slug,
      frontmatter: post.frontmatter,
    };
  });
  return posts;
};

export const clientLoader = getPosts;

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "border-b-2 border-cyan-700" : "";

export default function Index() {
  const posts = useLoaderData<typeof clientLoader>();
  return (
    <div className="prose">
      <header>
        <NavLink to={"/"} className={navLinkClass}>
          home
        </NavLink>
        <NavLink to={"/post"} className={navLinkClass}>
          post
        </NavLink>
        <NavLink to={"/about"} className={navLinkClass}>
          about
        </NavLink>
      </header>
      <div className="font-sans p-4">
        {posts.map(({ slug, frontmatter }) => {
          return <Article {...{ slug, frontmatter }} key={slug} />;
        })}
      </div>
    </div>
  );
}

function Article({ slug, frontmatter }: PostMeta) {
  // console.log({ slug, frontmatter });
  return (
    <article className="">
      <Link to={`/post/${slug}`}>
        <h3>{frontmatter.title}</h3>
      </Link>
      <p>{frontmatter.description}</p>
      <p>{slug}</p>
      <time dateTime={frontmatter.published}>{frontmatter.published}</time>
    </article>
  );
}
