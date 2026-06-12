export default function Template({ children }: { children: React.ReactNode }) {
  // Remounts on navigation so the page-enter rise replays per route,
  // mirroring the prototype's 400ms pageIn animation.
  return <div className="page-enter">{children}</div>;
}
