import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

/**
 * Server component: renders a heading with each word wrapped for the
 * word-by-word reveal. The text stays real, crawlable HTML; the client
 * controller (RevealObserver) only toggles [data-shown]. Inline elements such
 * as <em> are kept and their words split too.
 */
export default function SplitText({
  as: Tag = "h2",
  className = "",
  children,
  ...rest
}: {
  as?: "h2" | "h3" | "p";
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  let i = 0;

  const split = (node: ReactNode): ReactNode =>
    Children.map(node, (child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child)
          .split(/(\s+)/)
          .map((part, k) =>
            /^\s+$/.test(part) || part === "" ? (
              part
            ) : (
              <span key={k} className="split-w">
                <span className="w" style={{ ["--i" as string]: i++ }}>
                  {part}
                </span>
              </span>
            ),
          );
      }
      if (isValidElement(child)) {
        const el = child as ReactElement<{ children?: ReactNode }>;
        if (el.type === "br") return el;
        return cloneElement(el, undefined, split(el.props.children));
      }
      return child;
    });

  return (
    <Tag className={className} data-split {...rest}>
      {split(children)}
    </Tag>
  );
}
