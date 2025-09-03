'use client';
import { useTranslationClient } from '@/config/i18n/client';
import { ROUTES } from '@/config/routes';
import { useLang } from '@/hooks/useLang';
import { AppMap } from '@/components/Map';
import { Button } from '@/components/Button';
import { ListItem } from '@/components/ListItem';
import './main-offline-centers.scss'

interface IProps {
  textItems: string[];
  map: {
    centerCoordinates: [string, string];
    items: {
      address: string;
      coordinates: [string, string];
    }[];
  };
}

const MainOfflineCenters = ({ textItems, map }: IProps) => {
  const { lang } = useLang()
  const { t } = useTranslationClient(lang, ['site'])
  return (
    <div className="main-offine-centers">
      <div className="row">
        <div className="col col-1">
          <ul className="main-offine-centers__items">
            {textItems?.map((str: any, idx: number) => (
              <ListItem key={idx}>{str}</ListItem>
            ))}
          </ul>
          <Button href={ROUTES.offlineCenters} type="primary-old" weight="bold">
            {t('site.more_detail')}
          </Button>
        </div>
        <div className="col col-2">
          <div className="main-offine-centers__map">
            <AppMap center={map?.centerCoordinates} zoom={12}>
              {({ TileLayer, Marker, Popup }: any) => (
                <>
                  <TileLayer
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maxNativeZoom={19}
                  />
                  {map?.items?.map(({ address, coordinates }) => (
                    <Marker key={address} position={coordinates}>
                      <Popup>
                        <p style={{ textAlign: 'center' }}>{address}</p>
                      </Popup>
                    </Marker>
                  ))}
                </>
              )}
            </AppMap>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MainOfflineCenters };
