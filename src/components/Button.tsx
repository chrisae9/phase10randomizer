import { JSX } from "react";

export function Button(props: JSX.IntrinsicElements['button']) {
  return (
    <button
      {...props}
    />
  );
}
