interface TextSkeletonInterface {
  text: string | undefined | null,
  style?: string,
  skeletonHeight?: string,
  skeletonWidth?: string,
  setting?: any
}

export default function TextSkeleton(props: TextSkeletonInterface) {
  const { text, style, skeletonHeight, skeletonWidth, setting } = props;

  return (
    text === undefined || text === null
    ? <div role="status" className="max-w-sm animate-pulse">
        <div className={ `${ skeletonHeight ?? 'h-3' } ${ skeletonWidth ?? 'w-30' } bg-gray-500 rounded-full dark:bg-gray-700` }></div>
        <span className="sr-only">Loading...</span>
      </div>
    : <p className={ style } style={{
      fontFamily: setting?.family,
      color: setting?.color,
      fontSize: `${setting?.size}px`,
      fontWeight: setting?.weight
    }}>
        { text }
      </p>
  );
}