export const COINS_PER_DOLLAR = 250;
export const ERROR_MESSAGE = "Oops, that doesn't look like a valid reddit post!";
const BASE_URL_REGEX = '(https?://)(www\\.|old\\.|new\\.|m\\.)?(reddit\\.com/r/[A-Za-z0-9_]*/comments/[a-z0-9]{6}';
export const POST_URL_REGEX = new RegExp(BASE_URL_REGEX + ')');
export const COMMENT_URL_REGEX = new RegExp(BASE_URL_REGEX + '/[a-z0-9_]*/[a-z0-9]{7})');