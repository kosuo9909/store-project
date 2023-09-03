interface iGenerateFormDataReturn {
  [k: string]: string;
}

export const generateFormData = (
  obj: Record<string, string | number | boolean>,
): iGenerateFormDataReturn => {
  const data = Object.fromEntries(Object.keys(obj).map((key) => [key, '']));

  return data;
};
