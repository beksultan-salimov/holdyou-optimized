import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import '@/static/scss/components/leaflet.scss';

const DynamicMap = dynamic(() => import('./DynamicMap'), {
  ssr: false,
});

const AppMap = (props: any) => {
  return (
    <div style={{ height: '100%' }}>
      <DynamicMap {...props} />
    </div>
  );
};

export { AppMap };
