import React from 'react'
import parse from 'html-react-parser';
import { ROUTES } from '@/config';
import { get } from '@/utils/helpers';
import { Button } from './Button';

const parseText = (inputText: string) => {
  // const handleClick = (e:any) => {
  //   console.log('e', );
  // }
  const handleClickGoto = (blockId: string, offset: number = 0) => {
    const targetId = blockId.replace(/.*\#/, '');
    window.scrollTo({
      top: Number(document.getElementById(targetId)?.offsetTop) + Number(offset),
      behavior: 'smooth',
    });
  };
  return parse(inputText, {
    replace: (domNode: any) => {
      if (domNode.type === 'tag') {
        const { name, attribs, children } = domNode;
        const content = attribs.content || '';
        const weight = attribs.weight;

        if (name === 'link') {
          const href = get(ROUTES, [attribs.to], '');
          const scrollTo = attribs.scrollto;
          const offset = attribs.offset;

          if (scrollTo) {
            return (
              <Button
                type="link"
                weight={weight}
                onClick={() => handleClickGoto(scrollTo, offset)}
              >
                {content}
              </Button>
            );
          }
          return (
            <Button href={href} type="link" weight={weight}>
              {content}
            </Button>
          );
        }

        // if (name === 'goto') {
        //   return (
        //     <button onClick={() => handleClick(attribs.to)}>{content}</button>
        //   );
        // }

      }
    },
  });
};


const ParsedText = ({ text }: { text: string }) => {
  return <>{parseText(text)}</>;
}

export default ParsedText