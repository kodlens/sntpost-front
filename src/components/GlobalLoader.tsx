import { useIsFetching } from '@tanstack/react-query';
import { Loader } from 'lucide-react';

function GlobalLoader() {
  const isFetching = useIsFetching();

  if (!isFetching) return null;

  return (
    <Loader />
  );
}

export default GlobalLoader;
