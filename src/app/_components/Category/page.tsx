import type { Category } from "@/app/libs/microcms";
type Props = {
  category: Category;
};
export default function Category({ category }: Props) {
  return (
    <span className="bg-amber-500 py-1 px-3 rounded-2xl whitespace-nowrap text-xs font-bold text-white w-18 text-center">
      {category.name}
    </span>
  );
}
