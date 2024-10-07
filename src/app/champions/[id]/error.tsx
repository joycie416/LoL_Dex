// ~/error.tsx
'use client'; // ✅Error component 는 꼭 클라이언트 컴포넌트여야한다는 점 !!

import { useEffect } from 'react';

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2 className='title'>{error.message}</h2>
    </div>
  );
}