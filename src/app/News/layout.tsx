import Sheet from "@/app/_components/Sheet/page";

export const metadata = {
  title: "ニュース",
};

type Props = {
  children: React.ReactNode;
};

export const revalidate = 60;

//ニュースのページ
export default function NewsLayout({ children }: Props) {
  return (
    <>
      <div className="w-full h-screen bg-amber-50">
        <Sheet>{children}</Sheet>
      </div>
    </>
  );
}
