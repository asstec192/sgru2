import "@tanstack/react-table";
import { RowData } from "@tanstack/react-table";

//Não modifique esse arquivo se não souber o que esta fazendo
//Adiciona a propriedade "className" às colunas do react-table
declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string;
  }
}
