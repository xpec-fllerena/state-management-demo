import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <div className="flex flex-col gap-4">
        <Link className="underline text-blue-600" href="/states">States</Link>
        <Link className="underline text-blue-600" href="/flowbite">Flowbite</Link>
      </div>
    </div>
  );
}
