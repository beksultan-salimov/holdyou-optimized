import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import '@/static/scss/components/leaflet.scss';

const DynamicMap = dynamic(() => import('./DynamicMap'), {
  ssr: false,
});

// TODO remove comments
// const DEFAULT_WIDTH = 600;
// const DEFAULT_HEIGHT = 600;

const AppMap = (props: any) => {
  // const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props;
  return (
    // <div style={{ aspectRatio: width / height }}>
    <div style={{ height: '100%' }}>
      <DynamicMap {...props} />
    </div>
  );
};

export { AppMap };
