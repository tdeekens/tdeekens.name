import Image from 'next/image';
import { useRouter } from 'next/router';
import InternalLink from '@components/internal-link';

function Header() {
  const router = useRouter();

  const path = router.asPath;

  if (path === '/') return null;

  const breadcrumbs = path.split('/').slice(1);

  return (
    <header className="flex items-center justify-center flex-auto m-4 my-4 space-x-4 font-mono text-sm print:hidden">
      <div className="flex-shrink-0">
        <InternalLink href="/">
          <Image
            className="object-cover w-10 h-10 rounded-full"
            src="/me.jpg"
            alt="@tdeekens avatar"
            width="40"
            height="40"
          />
        </InternalLink>
      </div>

      <span className="flex-shrink text-gray-500">
        <InternalLink testId="index-link" href="/" underline={false}>
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
