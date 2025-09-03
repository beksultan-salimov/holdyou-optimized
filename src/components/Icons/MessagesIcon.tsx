import { IconWrapper } from "./IconWrapper";

interface IProps {
  className?: string;
  color?: string;
}

const MessagesIcon: React.FC = ({
  className,
  color = 'currentColor',
}: IProps) => {
  return (
    <IconWrapper className={className}>
      <svg
        viewBox="0 0 32 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27 11.5448C28.1787 11.9234 29 13.0488 29 14.3408V20.0554C29 21.5701 27.8707 22.8554 26.36 22.9794C25.9067 23.0154 25.4533 23.0488 25 23.0754V27.1968L21 23.1968C19.1947 23.1968 17.408 23.1234 15.64 22.9794C15.2551 22.9483 14.8807 22.8385 14.54 22.6568M27 11.5448C26.794 11.4785 26.581 11.436 26.3653 11.4181C22.7946 11.1217 19.2054 11.1217 15.6347 11.4181C14.1267 11.5434 13 12.8274 13 14.3408V20.0554C13 21.1714 13.6133 22.1621 14.54 22.6568M27 11.5448V9.04611C27 6.88478 25.464 5.01145 23.32 4.73278C20.5611 4.37517 17.782 4.19613 15 4.19678C12.18 4.19678 9.40267 4.37945 6.68 4.73278C4.536 5.01145 3 6.88478 3 9.04611V17.3474C3 19.5088 4.536 21.3821 6.68 21.6608C7.44933 21.7608 8.22267 21.8474 9 21.9194V28.1968L14.54 22.6568"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconWrapper>
  );
};


export { MessagesIcon };
