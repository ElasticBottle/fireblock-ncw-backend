import { NextFunction, Response } from "express";
import { Clients } from "../interfaces/Clients";
import { RequestEx } from "../interfaces/requestEx";

export class AccountContoller {
  constructor(private readonly clients: Clients) {}

  async findAll(req: RequestEx, res: Response, next: NextFunction) {
    const { device } = req;
    try {
      const { walletId } = device!;
      const accounts = await this.clients.admin.NCW.getWalletAccounts(walletId);
      return res.json(accounts.data);
    } catch (err) {
      return next(err);
    }
  }
}
