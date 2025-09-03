import { getI18n } from "react-i18next"

export const validateRequired = (value: any) => (value ? undefined : getI18n().t("site.validate.required"))
export const validateEmail = (value: any) => {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (value && !value.match(validRegex)) {
    return getI18n().t('site.validate.email');
  }
  return undefined
}
// export const validatePhone = (value: any) => (value && value?.length === 12 ? undefined : getI18n().t("site.validate.phone"))
export const validatePhone = (value: any) => undefined
export const validateBeNumber = (value: any) => (isNaN(value) ? getI18n().t("site.validate.number") : undefined)
export const validateMinValue = (min: any) => (value: any) =>
  isNaN(value) || value >= min
    ? undefined
    : getI18n().t("site.validate.min_value", { counter: min })
export const composeValidators =
  (...validators: any) =>
  (value: any) =>
    validators.reduce(
      (error: any, validator: any) => error || validator(value),
      undefined,
    )
