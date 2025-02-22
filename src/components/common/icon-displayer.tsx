import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import { ClassValue } from "class-variance-authority/types";
import { cn } from "@/lib/utils";

type Props = {
  icon: string;
  iconClassName?: ClassValue;
  divClassName?: ClassValue;
};

export const IconDisplay = ({ icon, iconClassName, divClassName }: Props) => {
  const formattedIconName = `fa${icon.charAt(0).toUpperCase() + icon.slice(1)}`;
  const resolvedIcon = (Icons as any)[formattedIconName];

  return (
    <div className={cn(divClassName)}>
      {resolvedIcon ? (
        <FontAwesomeIcon className={cn(iconClassName)} icon={resolvedIcon} />
      ) : (
        <span>Icon not found</span>
      )}
    </div>
  );
};
