//ニュースの型枠みたいなもの

type Props = {
  children: React.ReactNode;
};

export default function Sheet({ children }: Props) {
  return <div className="w-full px-2">{children}</div>;
}
