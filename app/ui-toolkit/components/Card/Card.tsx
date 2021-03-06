/* eslint-disable jsx-a11y/alt-text */
import { Link } from "@remix-run/react";
import React from "react";

let linkWrappers = {
  internal: Link,
  external: "a",
  none: "span",
};
type UrlType = keyof typeof linkWrappers;

export const Card = ({
  title,
  subtitle,
  image,
  url,
  imageSize = "300px",
  children,
  className = "",
  ...rest
}: CardProps) => {
  let urlType: UrlType = !url ? "none" : url.startsWith("http") ? "external" : "internal";

  const LinkWrapper: any = linkWrappers[urlType];
  let urlProps: any = {};
  if (urlType === "internal") {
    urlProps.to = url;
  } else if (urlType === "external") {
    urlProps.href = url;
    urlProps.target = "_blank";
  }

  return (
    <div className={"card " + className} {...rest}>
      {image && (
        <LinkWrapper {...urlProps}>
          <img
            style={{ height: imageSize, width: "100%" }}
            className="card-img-top"
            src={image}
            loading="lazy"
          />
        </LinkWrapper>
      )}
      <div className="card-body">
        <LinkWrapper {...urlProps} className="link-primary text-decoration-none">
          <h5 className="card-title">{title}</h5>
        </LinkWrapper>
        {subtitle && <div className="card-subtitle mb-2 text-muted">{subtitle}</div>}
        {children}
      </div>
    </div>
  );
};

export interface CardProps {
  /** The card title. You can pass a string or JSX */
  title: string | JSX.Element;
  /** The card subtitle title. You can pass a string or JSX */
  subtitle?: string;
  /** If provided the title and the (optional) image will become links pointed at the passed in url. */
  url?: string;
  /** Optional image url */
  image?: string;
  /** Allows you to control the height of the image */
  imageSize?: string;
  /** Whatever JSX you put inside the card component will render under the subtitle. */
  children?: React.ReactNode;
  [key: string]: any;
}

export default React.memo(Card);
