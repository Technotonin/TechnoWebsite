// Spam trap: a field hidden from real users (off-screen, not tab-reachable,
// aria-hidden) that bots tend to autofill. The API route silently drops any
// submission where it's non-empty.
export default function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
    >
      <label>
        Company website
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}
