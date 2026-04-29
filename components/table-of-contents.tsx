import { useEffect, useRef } from 'react';

const SECTIONS = [
  { id: 'profile', label: 'Profile' },
  { id: 'work-experience', label: 'Work experience' },
  { id: 'technology', label: 'Technology experiences' },
  { id: 'side-projects', label: 'Side projects' },
  { id: 'writing-and-talks', label: 'Blog posts, talks and workshops' },
  { id: 'extracurricular-activities', label: 'Extracurricular activities' },
  { id: 'education', label: 'University education' },
] as const;

function TableOfContents() {
  const ref = useRef<HTMLDetailsElement>(null);

  const close = () => {
    if (ref.current) ref.current.open = false;
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && ref.current?.open) {
        close();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <details ref={ref} className="relative print:hidden">
      <summary className="cursor-pointer underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black">
        Jump to section
      </summary>
      <ul className="absolute right-0 z-50 mt-2 w-64 bg-white border border-black shadow-lg py-2">
        {SECTIONS.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={close}
              className="block px-4 py-1 hover:bg-gray-100 focus-visible:outline-none focus-visible:bg-gray-100"
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

export default TableOfContents;
