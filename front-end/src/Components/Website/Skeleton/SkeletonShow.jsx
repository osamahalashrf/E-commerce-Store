import Skeleton from 'react-loading-skeleton';

export default function SkeletonShow(props) {

  const skeletonLength = Array.from({length: props.length}).map((_ , key) => (
    <div key={key} className="mx-1">
        <Skeleton width={props.width} height={props.height} baseColor={props.baseColor} />
    </div>
  ))

  return skeletonLength;
}
