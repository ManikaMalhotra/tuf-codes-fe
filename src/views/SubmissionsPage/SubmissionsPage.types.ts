export type RowData = {
  username: string;
  codeLanguage: string;
  standardInput: string;
  createdAt: string;
  sourceCode: string;
}

export type ThProps = {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort?: () => void;
}