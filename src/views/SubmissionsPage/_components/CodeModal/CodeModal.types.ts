import { RowData } from "../../SubmissionsPage.types";

export type CodeModalProps = {
  opened: boolean;
  selectedRow: RowData;
  close: () => void;
};