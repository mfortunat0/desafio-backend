import { Request, Response } from "express";
import { AppError } from "../../Errors/AppError";
import { ReportMonthYearTransactionByUserIdService } from "./ReportMonthYearTransactionByUserIdService";

export class ReportMonthYearTransactionByUserIdController {
  async handle(request: Request, response: Response) {
    const { id, month } = request.params;
    let { year } = request.params;

    if (Number(year) <= 0 || isNaN(Number(year))) {
      throw new AppError("Year is not valid", 400);
    }

    if (Number(month) <= 0 || isNaN(Number(month))) {
      throw new AppError("Month is not valid", 400);
    }

    if (year.length === 2) {
      if (
        Number(year) > Number(String(new Date().getFullYear()).substring(2, 4))
      ) {
        year = "19" + year;
      } else {
        year = "20" + year;
      }
    }
    const reportMonthYearTransactionByIdService =
      new ReportMonthYearTransactionByUserIdService();
    const { csv, total, user } =
      await reportMonthYearTransactionByIdService.execute({
        id,
        month: Number(month),
        year: Number(year),
      });
    response.set({
      "content-Type": "text/csv",
      "Client-balance": total,
      "Client-id": user.id,
      "Client-name": user.name,
      "Client-email": user.email,
      "Client-birthday": user.birthday.toISOString(),
      "Client-created_at": user.created_at?.toISOString(),
      "Client-openingBalance": user.openingBalance,
    });
    response.attachment("transactions");
    return response.send(csv);
  }
}
