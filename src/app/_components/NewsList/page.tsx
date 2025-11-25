import Image from "next/image";
import Link from "next/link";
import Category from "@/app/_components/Category/page";
import Date from "@/app/_components/ui/Date/page";
import { News } from "@/app/libs/microcms";

type Props = {
  news: News[];
};

//ニュース一覧のコンポーネント

export default function NewsList({ news }: Props) {
  if (news.length === 0) {
    return <p>記事がありません。</p>;
  }
  return (
    <ul className="pt-20 w-full">
      {news.map((article) => (
        <li key={article.id} className=" border-b last:border-none mx-7 mt-1 ">
          <Link
            href={`/News/${article.id}`}
            className="hover:bg-amber-100 hover:[%>dt]:underline block px-4 py-0 mb-1.5"
          >
            {article.thumbnail ? (
              <Image
                src={article.thumbnail.url}
                alt=""
                className="hidden"
                width={article.thumbnail.width}
                height={article.thumbnail.height}
              />
            ) : (
              <Image
                className="hidden"
                src="/no-image.png"
                alt="No Image"
                width={1200}
                height={630}
              />
            )}
            <dl>
              <dd className="flex items-center ">
                <Category category={article.category} />
                <Date date={article.publishedAt ?? article.createdAt} />
              </dd>
              <dt className="text-sm font-bold mt-2 mb-1 ">{article.title}</dt>
            </dl>
          </Link>
        </li>
      ))}
    </ul>
  );
}
