import Image from 'next/image';
import { useRouter } from 'next/router';
import InternalLink from '@components/internal-link';

function Header() {
  const router = useRouter();

  const path = router.asPath;

  if (path === '/') return null;

  const breadcrumbs = path.split('/').slice(1);

  return (
    <header className="print:hidden flex justify-center font-mono text-sm items-center flex-auto mt-4 mb-9 space-x-4">
      <div>
        <InternalLink href="/">
          <Image
            className="object-cover w-40 h-40 rounded-full"
            src="/me.jpg"
            alt="@tdeekens avatar"
            width="40"
            height="40"
          />
        </InternalLink>
      </div>

      <span className="text-gray-500">
        <InternalLink href="/" underline={false}>
          tdeekens
        </InternalLink>
        {breadcrumbs.map((breadcrumb, index) => (
          <InternalLink
            underline={false}
            key={index}
            href={`/${breadcrumb}`}
          >{` / ${breadcrumb}`}</InternalLink>
        ))}
      </span>
    </header>
  );
}

export default Header;
