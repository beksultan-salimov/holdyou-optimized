/* eslint-disable */
// @ts-nocheck
import PBOrderButton from './PBOrderButton';
import PBAnketa from './PBAnketa';
import PBLink from './PBLink';

export const reactComponents = ['OrderButton', 'Link', 'Anketa'];

export default (editor) => {
  editor.Components.addType('OrderButton', {
    extend: 'react-component',
    model: {
      defaults: {
        component: PBOrderButton,
        stylable: true,
        resizable: false,
        editable: true,
        draggable: true,
        droppable: false,
        attributes: {
          className: '',
          text: 'Записатись',
        },
        traits: [
          {
            type: 'text',
            label: 'class',
            name: 'className',
          },
          {
            type: 'text',
            label: 'Текст',
            name: 'text',
          },
        ],
      },
    },
    isComponent: (el) => el.tagName === 'PBORDERBUTTON',
  });

  editor.Components.addType('Link', {
    extend: 'react-component',
    model: {
      defaults: {
        component: PBLink,
        stylable: true,
        resizable: false,
        editable: true,
        draggable: true,
        droppable: false,
        attributes: {
          className: '',
          href: '',
          text: 'Link',
          target: '_self',
        },
        traits: [
          {
            label: 'href',
            name: 'href',
          },
          {
            label: 'Текст',
            name: 'text',
          },
          {
            label: 'class',
            name: 'className',
          },
          {
            type: 'select',
            label: 'Відкрити',
            name: 'target',
            options: [
              { id: '_blank', name: 'в новому вікні' },
              { id: '_self', name: 'в поточному вікні' },
            ],
          },
        ],
      },
    },
    isComponent: (el) => el.tagName === 'PBLINK',
  });

  editor.Components.addType('Anketa', {
    extend: 'react-component',
    model: {
      defaults: {
        component: PBAnketa,
        stylable: true,
        resizable: false,
        editable: true,
        draggable: true,
        droppable: false,
        attributes: {
          className: '',
          embed: '',
          widgetId: '',
          buttonId: '',
          buttonText: '',
        },
        traits: [
          {
            label: 'ID Widget',
            name: 'widgetId',
            type: 'text',
          },
          {
            label: 'ID кнопки',
            name: 'buttonId',
            type: 'text',
          },
          {
            label: 'Текст кнопки',
            name: 'buttonText',
            type: 'text',
          },
          {
            label: 'Код',
            name: 'embed',
            type: 'text',
          },
          {
            label: 'class',
            name: 'className',
          },
        ],
      },
    },
    isComponent: (el) => el.tagName === 'PBANKETA',
  });

};
