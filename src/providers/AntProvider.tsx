"use client";
import React, { PropsWithChildren, useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { StyleProvider, createCache, extractStyle } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";


// suppress useLayoutEffect warnings when running outside a browser
if (!process.browser) React.useLayoutEffect = React.useEffect;

export function AntdStyleProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale?: any;
}) {
  const [cache] = useState(() => createCache());
  const render = <>{children}</>;
  const regex = /:where\((.*?)\)/gi;
  useServerInsertedHTML(() => {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `</script>${extractStyle(cache)
            .replaceAll(regex, '')
            .replaceAll(':where', '')}<script>`,
        }}
      />
    );
  });

  // if (typeof window !== "undefined") {
  //   return render;
  // }

  return (
    // <StyleProvider hashPriority="high" cache={cache}>
    <StyleProvider cache={cache}>{render}</StyleProvider>
  );
}


export function AntdProvider({ children }: PropsWithChildren) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00bdc2",
        },
      }}
    >
      <AntdStyleProvider>{children}</AntdStyleProvider>
    </ConfigProvider>
  );
}
