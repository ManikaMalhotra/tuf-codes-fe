export const validateFormFields = (username: string, codeLanguage: string, stdin: string, sourceCode: string) => {
  if (username === "") {
    return "Username is required";
  }
  if (codeLanguage === "") {
    return "Code language is required";
  }
  if (stdin === "") {
    return "Standard input is required";
  }
  if (sourceCode === "") {
    return "Source code is required";
  }

  return "";
};
