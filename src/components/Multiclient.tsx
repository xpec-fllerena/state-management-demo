"use client"
import { Suspense } from "react";
import useMulticlient from "@@_hooks/useMulticlient";

const Multiclient = ({
  path_override,
  has_children,
  children,
  client_prop,
  ...props
}: any) => {
  let Component = useMulticlient({ client_prop }).get_component(path_override);

  return (
    <Suspense fallback={null}>
      {has_children ? (
        <Component {...props}>{children}</Component>
      ) : (
        <Component {...props} />
      )}
    </Suspense>
  );
};

export default Multiclient;
