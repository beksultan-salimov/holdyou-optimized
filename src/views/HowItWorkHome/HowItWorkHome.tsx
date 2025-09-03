import Image from 'next/image';
import { TileSteps } from '@/components/TileSteps';
// import googlePlayImg from '@/static/img/googlePlay.png';
// import appStoreImg from '@/static/img/appStore.png';
import howDoesItWork_1 from '@/static/img/howDoesItWork_1.png';
import howDoesItWork_2 from '@/static/img/howDoesItWork_2.png';
import howDoesItWork_3 from '@/static/img/howDoesItWork_3.png';
// import howDoesItWork_4 from '@/static/img/howDoesItWork_4.png';


const HowItWorkHome = ({ t }: any) => {
  const data = [
    {
      num: 1,
      title: t(`home.how_it_works.options.0.title`),
      text: t(`home.how_it_works.options.0.text`),
      image: <Image src={howDoesItWork_1} alt="1" />,
    },
    {
      num: 2,
      title: t(`home.how_it_works.options.1.title`),
      text: t(`home.how_it_works.options.1.text`),
      image: <Image src={howDoesItWork_2} alt="2" />,
    },
    {
      num: 3,
      title: t(`home.how_it_works.options.2.title`),
      text: t(`home.how_it_works.options.2.text`),
      image: <Image src={howDoesItWork_3} alt="3" />,
    },
    // {
    //   num: 4,
    //   title: t(`home.how_it_works.options.3.title`),
    //   text: t(`home.how_it_works.options.3.text`),
    //   image: <Image src={howDoesItWork_4} alt="4" />,
    //   extraText: (
    //     <div className="applications-btns">
    //       <a href="{ CRUDBooster::getSetting('app_google_play') }">
    //         <Image loading="lazy" src={googlePlayImg} alt="Google Play" />
    //       </a>
    //       <a href="{ CRUDBooster::getSetting('app_appstore') }">
    //         <Image loading="lazy" src={appStoreImg} alt="App Store" />
    //       </a>
    //     </div>
    //   ),
    // },
  ];

  return <TileSteps items={data} />
};

export { HowItWorkHome };
