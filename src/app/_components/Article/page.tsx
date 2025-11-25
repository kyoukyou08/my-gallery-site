import Link from "next/link";
import Image from "next/image";
import type { News } from "@/app/libs/microcms";
import Date from "@/app/_components/ui/Date/page";
import Category from "@/app/_components/Category/page";

type Props = {
  data: News;
};

export default function Article({ data }: Props) {
  return (
    <main className="max-w-3xl py-20 px-4">
      <h1 className="text-2xl mb-5">{data.title}</h1>
      <p className="text-sm m-6">{data.description}</p>
      <div className="flex items-center mb-10 text-sm">
        <Link href={`/news/category/${data.category.id}`} className="flex">
          <Category category={data.category} />
        </Link>
        <Date date={data.publishedAt ?? data.createdAt} />
      </div>
      {data.thumbnail && (
        <Image
          src={data.thumbnail.url}
          alt=""
          className="w-full h-auto mb-10"
          width={data.thumbnail.width}
          height={data.thumbnail.height}
        />
      )}
      <div
        className="w-full [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:border-b [&>h1]:mt-11 [&>h1]:mx-0 [&>h1]:mb-4
        [&>h2]:text-xl [&>h2]:font-bold [&>h2]:border-b [&>h2]:mt-11 [&>h2]:mx-0 [&>h2]:mb-4
        [&>h3]:text-lg [&>h3]:font-bold [&>h3]:border-b [&>h3]:mt-11 [&>h3]:mx-0 [&>h3]:mb-4
        [&>h4]:text-md [&>h4]:font-bold [&>h4]:border-b [&>h4]:mt-11 [&>h4]:mx-0 [&>h4]:mb-4
        [&>h5]:text-sm [&>h5]:font-bold [&>h5]:border-b [&>h5]:mt-11 [&>h5]:mx-0 [&>h5]:mb-4"
        dangerouslySetInnerHTML={{
          __html: data.content,
        }}
      />
    </main>
  );
}
