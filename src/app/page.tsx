import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full grid place-items-center p-6 lg:p-24">
      <div className="w-full h-full flex flex-col items-center justify-start gap-6">
        <h3 className="text-4xl">Testing Plugins</h3>
        <div className="flex flex-row gap-4">
          <Link className="btn bg-blue-600" href="/states">
            States
          </Link>
          <Link className="btn bg-blue-600" href="/flowbite">
            Flowbite
          </Link>
          <Link className="btn bg-blue-600" href="/override">
            Override
          </Link>
        </div>
      </div>
    </div>
  );
}
