'use client';
import { useState } from 'react';

import { useServerInsertedHTML } from 'next/navigation';

import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

function StyleProviderLayout({ children }: { children: React.ReactNode }) {
  const [cache] = useState(() => createCache());

  const render = <>{children}</>;

  useServerInsertedHTML(() => {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `</script>${extractStyle(cache)}<script>`,
        }}
      />
    );
  });

  if (typeof window !== 'undefined') {
    return render;
  }

  return <StyleProvider cache={cache}>{render}</StyleProvider>;
}

export default StyleProviderLayout;
