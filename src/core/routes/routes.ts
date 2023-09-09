export const appRoutes = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  ORDERS: "/orders",
  USERS: "/users",
  SIGN_IN: "/auth/signin",
  SIGN_UP: "/auth/signup",
  RESTAURANT_CHOOSE: "/restaurant/choose",
  RESTAURANT_SETUP: "/restaurant/setup",
};

const pre = "merchant";

export const apiRoutes = {
  SIGN_IN: `${pre}/auth/signin`,
  SIGN_UP: `${pre}/auth/register`,
  PROFILE: `${pre}/profile`,
  RESTAURANT: `${pre}/restaurant`,
  GET_RESIDENT_KEYS: `${pre}/webauthn/resident`,
  ATTESTATE_BEGIN: `${pre}/webauthn/resident/attestate/begin`,
  ATTESTATE_END: `${pre}/webauthn/resident/attestate/end`,
  ASSERT_BEGIN: `${pre}/webauthn/resident/assert/begin`,
  ASSERT_END_REMOVE: `${pre}/webauthn/resident/assert/end-remove`,
  SIGN_IN_WEBAUTHN: `${pre}/auth/signin/webauthn`,
};
