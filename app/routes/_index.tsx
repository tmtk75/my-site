import {
  Link,
  type MetaFunction,
  NavLink,
  useLoaderData,
} from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "tmtk.net" },
    {
      name: "description",
      content: "TBD",
    },
  ];
};

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
  return (
    <div className="flex flex-row justify-center">
      <div>
        <div>
          <LeftNav />
        </div>
        <div>&copy; 2025 Tomotaka Sakuma</div>
      </div>
    </div>
  );
}

function DraftIndex() {
  return (
    <div className="flex flex-row">
      <div className="border max-h-full sm:w-1/5">
        <LeftNavHeader />
        <LeftNav />
      </div>
      <div className="sm:w-3/5">
        <div>Under construction.</div>
        <MainHeader />
        <Main />
      </div>
      <div className="sm:w-1/5 border max-h-full right-0">
        <RightNavHeader />
        <RightNav />
      </div>
    </div>
  );
}

function LeftNavHeader() {
  return <header className="prose h-[48px]"></header>;
}

function MainHeader() {
  return (
    <header className="prose h-[48px]">
      <NavLink to={"/"} className={navLinkClass}>
        home
      </NavLink>
      <NavLink to={"/post"} className={navLinkClass}>
        post
      </NavLink>
      <NavLink to={"/about"} className={navLinkClass}>
        about
      </NavLink>
      <NavLink to={"/profile"} className={navLinkClass}>
        profile
      </NavLink>
    </header>
  );
}

function RightNavHeader() {
  return <header className="prose h-[48px]"></header>;
}

function Main() {
  const posts = useLoaderData<typeof clientLoader>();
  return (
    <main className="container prose">
      <div className="flex flex-col">
        {posts.map(({ slug, frontmatter }) => {
          return <Article {...{ slug, frontmatter }} key={slug} />;
        })}
      </div>
    </main>
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

function LeftNav() {
  return (
    <nav className="prose container">
      <div className="">
        <img
          src="/avatar.jpg"
          alt="avatar"
          className="rounded-full w-[88px] ml-[2rem]"
        />
      </div>
      <ul>
        {[
          {
            href: "https://github.com/tmtk75",
            text: "github.com",
          },
          {
            href: "https://note.com/tmtk75/",
            text: "note.com",
          },
          { href: "https://blog.tmtk.net/", text: "old blog" },
          { href: "https://zenn.dev/tmtk75", text: "zenn articles" },
          {
            href: "https://zenn.dev/tmtk75?tab=scraps",
            text: "zenn scraps",
          },
          { href: "https://memodify.com", text: "memodify.com" },
          { href: "https://memodify.com/blog", text: "memodify blog" },
          {
            href: "https://x.com/tmtk75",
            text: "x.com",
          },
        ].map(({ href, text }) => (
          <li key={href}>
            <a target={href} href={href}>
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function RightNav() {
  return <nav className="prose container">right nav</nav>;
}
