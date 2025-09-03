import { FAQ } from '@/components/FAQ';
import { IPsychologist } from '@/types/PsychologistTypes';
import { get, splitIntoRows } from '@/utils/helpers';

interface IProps {
  psychologist: IPsychologist;
  t: any;
}

const PsychologistInfo = ({ psychologist, t }: IProps) => {
  const fields = [
    'life_credo',
    'help_with',
    'work_principles',
    'values',
  ];

  const items = fields.reduce((a: any, field) => {
    const value = get(psychologist, [field], '');
    if (!value) return a;
    const item = {
      key: field,
      title: t(`psychologist.${field}`),
      text: `<p>${splitIntoRows(value)}</p>`,
    };
    return [...a, item];
  }, []);

  return (
    <div className="psychologist-info">
      <FAQ items={items} type="simple" defaultActiveKeys={[0]} />
    </div>
  );
};

export { PsychologistInfo };
