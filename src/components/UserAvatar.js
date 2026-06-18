import { memo } from "react";
import { getCustomerAvatarUrl, getUserAvatarUrl } from "../utils/avatars";

const UserAvatar = memo(
  ({ name, seed, size = 40, variant = "user", className = "", alt = "" }) => {
    const src =
      variant === "customer"
        ? getCustomerAvatarUrl(seed || name, size)
        : getUserAvatarUrl(name, size);

    return (
      <img
        src={src}
        alt={alt || name || "User avatar"}
        width={size}
        height={size}
        className={className}
        loading="lazy"
      />
    );
  }
);

UserAvatar.displayName = "UserAvatar";

export default UserAvatar;