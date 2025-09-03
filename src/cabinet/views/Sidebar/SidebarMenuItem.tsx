import clsx from "clsx"
import Link from "next/link"
import { Icon } from "@/components/Icon"
import { IconNamesType } from "@/utils/iconsSet"
import { usePathname } from "next/navigation"

interface IProps {
  to: string;
  alternativePath?: string[];
  label: React.ReactNode;
  count?: number;
  iconName?: IconNamesType;
  onClick?: any;
}

const SidebarMenuItem = ({ label, count, iconName, to, onClick, alternativePath }: IProps) => {
  const pathname = usePathname();
  const isActive = pathname === to || alternativePath?.includes(pathname);

  return (
    <li
      className={clsx('sidebar-menu-item', {
        active: isActive,
      })}
    >
      <Link
        href={to}
        className={clsx('sidebar-menu-link', { active: isActive })}
        onClick={onClick}
      >
        {!!iconName && (
          <div className="sidebar-menu-link-icon">
            <Icon name={iconName} />
          </div>
        )}
        <div className="sidebar-menu-link-content">
          <span className="sidebar-menu-link-label">{label}</span>
          {!!count && (
            <span
              className={clsx('sidebar-menu-link-badge', {
                'big-value': !!count && +count > 99,
              })}
            >
              {!!count && +count > 99 ? '99+' : count}
            </span>
          )}
        </div>
      </Link>
    </li>
  );
}

export default SidebarMenuItem
