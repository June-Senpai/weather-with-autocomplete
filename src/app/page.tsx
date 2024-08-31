import Image from "next/image";
import Weather from "./components/Weather";

export default function Home() {
  return (
    <main className="flex h-screen justify-start items-center md:justify-center flex-col gap-4 p-8">
      <Image
        src={"./logo-white-text.svg"}
        height={111}
        width={330}
        alt="Logo"
        priority
        className="bg-[#1b1b1d] p-2 rounded-lg "
      />
      <Weather />
    </main>
  );
}
