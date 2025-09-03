interface IProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

const MenuIcon = ({
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
        d="M4.25 7.25H15.75M4.25 12.5H20.75M9.25 17.75H20.75"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export { MenuIcon };
