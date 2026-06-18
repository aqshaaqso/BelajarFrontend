const BRAND_COLOR = "6246ea";

export const getUserAvatarUrl = (name, size = 128) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name || "User"
  )}&background=${BRAND_COLOR}&color=ffffff&size=${size}&bold=true`;

export const getCustomerAvatarUrl = (seed, size = 40) =>
  `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(
    seed || "customer"
  )}&size=${size}`;