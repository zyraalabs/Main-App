import { RedirectingScreen } from "@/components/redirect/redirecting-screen";

interface Props {
  searchParams: Promise<{ name?: string }>;
}

export default async function AuthRedirectPage({ searchParams }: Props) {
  const { name } = await searchParams;
  const decodedName = decodeURIComponent(name ?? "");

  return <RedirectingScreen name={decodedName} />;
}
