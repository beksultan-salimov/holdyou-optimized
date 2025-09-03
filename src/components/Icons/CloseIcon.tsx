interface IProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

const CloseIcon = ({
  className,
  width = 20,
  height = 20,
  color = '#00BDC2',
}: IProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.66626 18.3337L18.3335 6.66648"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3333 18.334L6.66599 6.66672"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export { CloseIcon };
