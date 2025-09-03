import { IconWrapper } from "./IconWrapper";

interface IProps {
  className?: string;
  color?: string;
}

const HeadPhoneIcon: React.FC = ({
  className,
  color = 'currentColor',
}: IProps) => {
  return (
    <IconWrapper className={className}>
      <svg viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 24.1968V16.1968C4 13.0142 5.26428 9.96193 7.51472 7.7115C9.76516 5.46106 12.8174 4.19678 16 4.19678C19.1826 4.19678 22.2348 5.46106 24.4853 7.7115C26.7357 9.96193 28 13.0142 28 16.1968V24.1968"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28 25.5299C28 26.2372 27.719 26.9155 27.219 27.4156C26.7189 27.9157 26.0406 28.1966 25.3333 28.1966H24C23.2928 28.1966 22.6145 27.9157 22.1144 27.4156C21.6143 26.9155 21.3333 26.2372 21.3333 25.5299V21.5299C21.3333 20.8227 21.6143 20.1444 22.1144 19.6443C22.6145 19.1442 23.2928 18.8633 24 18.8633H28V25.5299ZM4 25.5299C4 26.2372 4.28095 26.9155 4.78105 27.4156C5.28115 27.9157 5.95942 28.1966 6.66667 28.1966H8C8.70724 28.1966 9.38552 27.9157 9.88562 27.4156C10.3857 26.9155 10.6667 26.2372 10.6667 25.5299V21.5299C10.6667 20.8227 10.3857 20.1444 9.88562 19.6443C9.38552 19.1442 8.70724 18.8633 8 18.8633H4V25.5299Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconWrapper>
  );
};


export { HeadPhoneIcon };
