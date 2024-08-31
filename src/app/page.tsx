import Image from "next/image";
import Weather from "./components/Weather";

export default function Home() {
  return (
    <main className="flex h-screen justify-center items-center flex-col gap-4">
      <Image
        src={"./logo-white-text.svg"}
        height={111}
        width={330}
        alt="Logo"
        priority
        className="bg-[#1b1b1d] p-2 rounded-lg"
      />
      <Weather />
    </main>
  );
}
