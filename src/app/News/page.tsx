import { getNewsList } from "@/app/libs/microcms";
import NewsList from "@/app/_components/NewsList/page";
import { NEWS_LIST_LIMIT } from "@/app/_constants";

export default async function Page() {
  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
  });

  return (
    <>
      <div>
        <NewsList news={news} />
      </div>
    </>
  );
}
