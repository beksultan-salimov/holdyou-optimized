'use client';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import grapesjs from 'grapesjs';
import 'grapesjs-preset-webpage';
import 'grapesjs/dist/css/grapes.min.css';
import GjsCKEditor from 'grapesjs-plugin-ckeditor';
import { useTranslationClient } from '@/config/i18n/client';
import { LangType } from '@/config/i18n/settings';
import { refreshCache, uploadImages } from '@/utils/services';
import { clientFetch } from '@/utils/service';
import { generatePagePreviewLink, omit } from '@/utils/helpers';
import { IUploadImage } from '@/types/BaseTypes';
import BaseReactComponent from './BaseReactComponent';
import ReactComponents from './ReactComponents';
import { styles } from './pbcomponents';
import uk from './locale/uk';
import ru from './locale/ru';
import './styles/builderEditor.scss'


const ComponentImage = `<div><div class="pb-image"><img src="/img/image-placeholder.png" alt="img" /></div></div>`;
const ComponentImageWithoutShadow = `<div><div class="pb-image pb-image-without-shadow"><img src="/img/image-placeholder.png" alt="img" /></div></div>`;
const ComponentH1 = `<h1 class="pb-h1">Заголовок H1</h1>`;
const ComponentH2 = `<h2 class="pb-h2">Заголовок H2</h2>`;
const ComponentH3 = `<h3 class="pb-h3">Заголовок H3</h3>`;
const ComponentH4 = `<h4 class="pb-h4">Заголовок H4</h4>`;
const ComponentH5 = `<h5 class="pb-h5">Заголовок H5</h5>`;
const ComponentH6 = `<h6 class="pb-h6">Заголовок H6</h6>`;
const ComponentText = `<div class="pb-text" data-gjs-type="text">Insert your text here.</div>`;
const ComponentInfoLeft = `
<div class="pb-info pb-info-left">
  <div class="pb-info__col-media">${ComponentImage}</div>
  <div class="pb-info__col-content">
    ${ComponentH2}
    ${ComponentText}
  </div>
</div>`;
const ComponentInfoRight = `
<div class="pb-info pb-info-right">
  <div class="pb-info__col-content">
    ${ComponentH2}
    ${ComponentText}
  </div>
  <div class="p-info__col-media">${ComponentImage}</div>
</div>`;

const titlesGroup = [
  { id: 'h1', content: ComponentH1 },
  { id: 'h2', content: ComponentH2 },
  { id: 'h3', content: ComponentH3 },
  { id: 'h4', content: ComponentH4 },
  { id: 'h5', content: ComponentH5 },
  { id: 'h6', content: ComponentH6 },
];

const BuilderEditor = ({
  lang,
  pageId,
  cbUrl,
  pageData = {}
}: {
  lang: LangType;
  pageId: string;
  cbUrl?: string;
  pageData: any
}) => {
  const { slug, template = '', locale, title } = pageData;
  const { t } = useTranslationClient(lang, ['pb']);
  const handleClickSave = async (editor: any) => {
    !!editor && (await editor?.store());
  };
  const handleClickClear = (editor: any) => {
    if (!!editor) {
      editor?.Components?.clear();
    }
  };
  const handleClickExit = () => {
    document.location.href =
      !!cbUrl && !!decodeURIComponent(cbUrl)
        ? decodeURIComponent(cbUrl)
        : generatePagePreviewLink({ slug, template, locale });
  };
  const handleClickPreview = () => {
    const pageUrl = !!cbUrl && !!decodeURIComponent(cbUrl)
        ? decodeURIComponent(cbUrl)
        : generatePagePreviewLink({ slug, template, locale });
    window.open(pageUrl, '_blank');
  };

  useEffect(() => {
    if (!pageId) return;
    const _editor = grapesjs.init({
      container: '#gjs',
      height: '100vh',
      width: '100%',
      canvasCss: `body {height: auto;}${styles}`,
      blockManager: {
        blocks: [
          {
            id: 'info-left',
            label: t('pb.block_info_left'),
            category: t('pb.categories.basic'),
            attributes: { class: 'gjs-block-section' },
            content: ComponentInfoLeft,
            media: '<i class="fa fa-id-card"></i>',
          },
          {
            id: 'info-right',
            label: t('pb.block_info_right'),
            category: t('pb.categories.basic'),
            attributes: { class: 'gjs-block-section' },
            content: ComponentInfoRight,
            media: '<i class="fa fa-id-card img-reverse"></i>',
          },
          {
            id: 'image',
            label: t('pb.block_image'),
            category: t('pb.categories.basic'),
            attributes: { class: 'gjs-block-section' },
            content: ComponentImage,
            select: true,
            activate: true,
            media: '<i class="fa fa-image"></i>',
          },
          {
            id: 'image-without-shadow',
            label: t('pb.block_image_without_shadow'),
            category: t('pb.categories.basic'),
            attributes: { class: 'gjs-block-section' },
            content: ComponentImageWithoutShadow,
            select: true,
            activate: true,
            media: '<i class="fa fa-image"></i>',
          },
          {
            id: 'text',
            label: t('pb.block_text'),
            category: t('pb.categories.basic'),
            attributes: { class: 'gjs-block-section' },
            content: ComponentText,
            media: '<i class="icon-custom icon-custom-t"></i>',
          },
        ],
      },
      selectorManager: {
        custom: true,
        componentFirst: true,
      },
      storageManager: {
        type: 'remote',
        autosave: false,
      },
      assetManager: {
        uploadFile: async (ev: any) => {
          const files = ev.dataTransfer
            ? ev.dataTransfer.files
            : ev.target?.files;
          await uploadImages({
            files: files[0],
            onSuccess: (res: IUploadImage) => {
              const normalizedImage = { src: res?.file, alt: res?.alt };
              _editor.AssetManager.add(normalizedImage);
            },
          });
        },
        uploadName: 'file',
        multiUpload: false,
        assets: [],
      },
      plugins: [GjsCKEditor, BaseReactComponent, ReactComponents],
      pluginsOpts: {
        // @ts-ignore
        [GjsCKEditor]: {
          options: {
            language: lang,
            extraPlugins: 'justify,colorbutton',
            removeButtons: '',
            toolbar: [
              [
                'Format',
                'Bold',
                'Italic',
                'Underline',
                'Strike',
                'RemoveFormat',
                '-',
                'TextColor',
                'BGColor',
              ],
              [
                'JustifyLeft',
                'JustifyCenter',
                'JustifyRight',
                'JustifyBlock',
                '-',
                'Link',
                'Unlink',
                '-',
                'NumberedList',
                'BulletedList',
              ],
            ],
          },
        },
      },
      i18n: {
        locale: lang,
        detectLocale: false,
        messages: { uk, ru },
      },
    });

    _editor.DomComponents.addType('image', {
      model: {
        defaults: {
          traits: ['alt', 'title'],
        },
      },
    });

    titlesGroup.map((item) => {
      _editor.BlockManager.add(item.id, {
        label: `Заголовок ${item.id}`,
        category: t('pb.categories.titles'),
        media: `<i class="icon-header icon-header-${item.id}"></i>`,
        ...omit(item, 'id'),
      });
    });
    _editor.BlockManager.add('OrderButton', {
      label: "<div class='gjs-fonts gjs-f-b1'>Кнопка Запис</div>",
      category: t('pb.categories.basic'),
      content: '<PBOrderButton>Order Button</PBOrderButton>',
      media: '<i class="fa fa-square"></i>',
    });
    _editor.BlockManager.add('Link', {
      label: 'Посилання (текст)',
      category: t('pb.categories.basic'),
      content: '<PBLink view="link">Link</PBLink>',
      attributes: { class: 'gjs-block-section' },
      media: '<i class="fa fa-link"></i>',
    });
    _editor.BlockManager.add('LinkButton', {
      label: 'Посилання (кнопка)',
      category: t('pb.categories.basic'),
      content: '<PBLink view="button">Link</PBLink>',
      attributes: { class: 'gjs-block-section' },
      media: '<i class="fa fa-external-link"></i>',
    });
    _editor.BlockManager.add('Anketa', {
      label: 'Анкета',
      category: t('pb.categories.basic'),
      content: `<PBAnketa>Анкета</PBAnketa>`,
      attributes: { class: 'gjs-block-section' },
      media: '<i class="icon-custom icon-custom-a"></i>',
    });

    _editor.Storage.add('remote', {
      async load() {
        // return await clientFetch(`/admin/page/${pageId}`).then((res: any) => {
        //   return JSON.parse(res?.html_content)?.data;
        // });
        return new Promise((resolve) => {
          const payload = JSON.parse(pageData?.html_content)?.data;
          resolve(payload);
        });
      },

      async store(data) {
        const pagesHtml = _editor.Pages.getAll().map((page: any) => {
          const component = page.getMainComponent();
          return {
            html: _editor.getHtml({ component }),
            css: _editor.getCss({ component }),
          };
        });
        const payload = JSON.stringify({
          data,
          css: pagesHtml[0]?.css,
        });
        return await clientFetch(`/admin/page/${pageId}`, {
          method: 'PATCH',
          body: JSON.stringify({ html_content: payload }),
        }).then((res) => {
          // console.log('res', res);
          toast.success(t('pb.save_success'));
          setTimeout(() => {
            refreshCache();
          }, 2000);
          return res;
        });
      },
    });

    const panelManager = _editor.Panels;
    panelManager.removeButton('options', 'sw-visibility');
    panelManager.removeButton('options', 'preview');
    panelManager.removeButton('options', 'fullscreen');
    panelManager.removeButton('options', 'export-template');

    panelManager.addPanel({
      id: 'pb-header',
      visible: true,
      content: pageData?.title,
    });
    panelManager.addPanel({
      id: 'pb-actions',
      visible: true,
      buttons: [
        {
          id: 'btn-save',
          className: 'pb-btn-options',
          label: '<i class="fa fa-save" />',
          command: handleClickSave,
          attributes: { title: t('pb.btn_save') },
          active: false,
        },
        {
          id: 'btn-undo',
          className: 'pb-btn-options',
          label: '<i class="fa fa-undo" />',
          command: 'core:undo',
          attributes: { title: t('pb.btn_undo') },
          active: false,
        },
        {
          id: 'btn-redo',
          className: 'pb-btn-options',
          label: '<i class="fa fa-repeat" />',
          command: 'core:redo',
          attributes: { title: t('pb.btn_redo') },
          active: false,
        },
        {
          id: 'btn-clear',
          className: 'pb-btn-options',
          label: '<i class="fa fa-trash" />',
          command: handleClickClear,
          attributes: { title: t('pb.btn_clear') },
          active: false,
        },
        {
          id: 'btn-previe',
          className: 'pb-btn-options',
          label: '<i class="fa fa-eye" />',
          command: handleClickPreview,
          attributes: { title: t('pb.btn_preview') },
          active: false,
        },
        {
          id: 'btn-exit',
          className: 'pb-btn-options',
          label: '<i class="fa fa-sign-out" />',
          command: handleClickExit,
          attributes: { title: t('pb.btn_exit') },
          active: false,
        },
      ],
    });

    panelManager.addButton('options', {
      id: 'visibility',
      className: 'pb-btn-options pb-btn-visibility',
      label: '<i class="fa fa-square-o" />',
      command: 'sw-visibility',
      active: true,
    });

    setTimeout(() => {
      let canvasBody = _editor.Canvas.getBody();
      canvasBody?.classList.add(
        'pb-container',
        'pb-container-frame',
        `pb-template-${template.toLowerCase()}`
      );
    }, 150);
  }, [pageId, lang, t, pageData?.html_content, template, title, pageData?.title, handleClickPreview, handleClickExit]);

  return (
    <div className="builder-editor">
      <div id="gjs" />
    </div>
  );
};

export { BuilderEditor };