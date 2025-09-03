import { createField } from "@/components/BaseForm/BaseForm";
import { Icon } from "@/components/Icon";
import { Spinner } from "@/components/Spinner";
import Dragger from "antd/es/upload/Dragger";

export const DropzoneFiles = ({
  uploadProps,
  drozoneLabel = '',
  ...props
}: any) => {
  const iconRender = (val: any) => {
    const status = val?.status;
    const url = val?.response?.src || val?.url;
    if (status === 'uploading')
      return (
        <div className="dropzone-item-preview">
          <Spinner />
        </div>
      );
    // if (src && status === "done")
    //   return (
    //     <div className="dropzone-item-preview">
    //       <a href={src} target="_blank">
    //         <img src={src} alt="" />
    //       </a>
    //     </div>
    //   )
    return (
      <a href={url} target="_blank">
        {/* TODO: show icons by file type */}
        <Icon name="Picture" />
      </a>
    );
  };

  return (
    <Dragger
      iconRender={iconRender}
      {...uploadProps}
      {...props}
      className="dropzone-images"
    >
      <Icon name="PictureShadow" className="dropzone-icon" />
      <div
        className="dropzone-label"
        dangerouslySetInnerHTML={{ __html: drozoneLabel }}
      />
    </Dragger>
  );
};
export const FormDropzone = createField(DropzoneFiles, 'dropzone');
