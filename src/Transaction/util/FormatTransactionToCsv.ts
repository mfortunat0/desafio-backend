import { TransactionDTO } from "../dtos/TransactionDTO";

export function formatToCsv(stream: TransactionDTO[]) {
  let csv = "id,userId,value,type,created_at\n";
  stream.forEach((obj, index) => {
    csv += `${obj.id},${obj.userId},${obj.value},${
      obj.type
    },${obj.created_at.toISOString()}\n`;
  });
  return csv;
}
