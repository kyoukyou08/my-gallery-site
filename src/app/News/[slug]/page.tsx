import type { Metadata } from "next";
import { getNewsDetail } from "@/app/libs/microcms";
import Article from "@/app/_components/Article/page";
import { notFound } from "next/navigation";
// import ButtonLink from "@/app/_components/ButtonLink/page";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    dk?: string;
  };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const data = await getNewsDetail(params.slug, {
    draftKey: searchParams.dk,
  });

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [data?.thumbnail?.url ?? ""],
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const data = await getNewsDetail(params.slug, {
    draftKey: searchParams.dk,
  }).catch(notFound);

  return (
    <>
      <Article data={data} />
      <div className="flex justify-end border-t-2 mt-20 pt-10"></div>
    </>
  );
}
