import Image from 'next/image';
// import { ROUTES } from '@/config';
import { TileSteps } from '@/components/TileSteps';
// import googlePlayImg from '@/static/img/googlePlay.png';
// import appStoreImg from '@/static/img/appStore.png';
import howDoesItWork_1 from '@/static/img/how_it_work-1.png';
import howDoesItWork_2 from '@/static/img/how_it_work-2.png';
import howDoesItWork_3 from '@/static/img/how_it_work-3.png';
import howDoesItWork_4 from '@/static/img/how_it_work-4.png';
// import howDoesItWork_5 from '@/static/img/how_it_work-5.png';


const HowConsultation = ({ t }: any) => {
  const data = [
    {
      num: 1,
      title: t(`how_it_work.steps.0.title`),
      text: t(`how_it_work.steps.0.text`),
      image: <Image src={howDoesItWork_1} alt="1" />,
    },
    {
      num: 2,
      title: t(`how_it_work.steps.1.title`),
      text: t(`how_it_work.steps.1.text`),
      image: <Image src={howDoesItWork_2} alt="2" />,
    },
    {
      num: 3,
      title: t(`how_it_work.steps.2.title`),
      text: t(`how_it_work.steps.2.text`),
      image: <Image src={howDoesItWork_3} alt="3" />,
    },
    {
      num: 4,
      title: t(`how_it_work.steps.3.title`),
      text: t(`how_it_work.steps.3.text`),
      image: <Image src={howDoesItWork_4} alt="4" />,
    },
    // {
    //   num: 5,
    //   title: t(`how_it_work.steps.4.title`),
    //   text: t(`how_it_work.steps.4.text`),
    //   image: <Image src={howDoesItWork_5} alt="5" />,
    //   extraText: (
    //     <div className="applications-btns">
    //       <a href={ROUTES.appInGooglePlay} target="_blank">
    //         <Image loading="lazy" src={googlePlayImg} alt="Google Play" rel="nofollow" />
    //       </a>
    //       <a href={ROUTES.appInAppStore} target="_blank">
    //         <Image loading="lazy" src={appStoreImg} alt="App Store" rel="nofollow" />
    //       </a>
    //     </div>
    //   ),
    // },
  ];

  return <TileSteps items={data} />
};

export { HowConsultation };
