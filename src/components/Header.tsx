import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";

const Header = ({session}: {
  session: Session
}) => {
  return (
    <header className="my-10 flex justify-between gap-5 border-b-2 border-b-yellow-800">
      <Link href="/" className="flex items-center gap-2 text-4xl bg-clip-text bg-gradient-to-br from-yellow-500 via-yellow-700 to-yellow-900 text-transparent uppercase font-bold">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />Libria
      </Link>
      {session && (
        <form 
          className="flex flex-row items-center gap-8 mb-10"
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button>Logout</Button>
        </form>
      )}
    </header>
  );
};

export default Header;
