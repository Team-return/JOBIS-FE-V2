export const ID_REGEX = /^[A-Za-z]*$/;
export const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
export const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@dsm.hs.kr$/;
export const VERIFYCODE_REGEX = /^[[0-9]{6}$/;
export const GRADE_REGEX = /^[1-3][1-4](0[1-9]|1[0-9])$/;

export const ADMIN_ID_KEY = "admin_id";
