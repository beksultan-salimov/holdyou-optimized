import TextareaAutosize from 'react-textarea-autosize';
import { Field } from './Field';

const Textarea = (props: any) => {
  const tag = !!props.autosize ? TextareaAutosize : 'textarea';

  return <Field {...props} component={tag} tag="textarea" />;
};

export { Textarea };
