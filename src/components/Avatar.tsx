export function Avatar() {
  return (
    // SVG placeholder; swap for a photo and `next/image` when you have one.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/avatar.svg"
      alt=""
      width={88}
      height={88}
      className="size-[88px] rounded-full ring-1 ring-hairline"
    />
  );
}
