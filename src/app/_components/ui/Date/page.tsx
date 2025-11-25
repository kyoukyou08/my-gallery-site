import Image from "next/image";
import { formatDate } from "@/app/libs/utils";

type Props = {
  date: string;
};

export default function Date({ date }: Props) {
  return (
    <span className="flex items-center gap-1 text-xs font-bold mx-3.5 my-0">
      <Image src="/clock.svg" alt="" width={16} height={16} loading="eager" />
      {formatDate(date)}
    </span>
  );
}
