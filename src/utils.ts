export const arrayToMap = (keyArr: string[], valueArr: any[]) =>
  keyArr.reduce((acc, key, index) => ({ ...acc, [key]: valueArr[index] }), {})