import { Handler, NextFunction, Response } from "express";
import { RequestEx } from "../interfaces/requestEx";
import { Device } from "../model/device";
import { stubAuth } from "../util/stubAuth";

export const validateDevice: Handler = async function (
  req: RequestEx,
  res: Response,
  next: NextFunction,
) {
  const auth = stubAuth(req.headers);
  const { params } = req;
  const { deviceId } = params;

  try {
    const { sub } = auth.payload;
    const device = await Device.findOneOrFail({
      where: {
        id: deviceId,
        user: { sub },
      },
      relations: { user: true },
    });

    req.device = device;
  } catch (e) {
    next(e);
    return;
  }

  next();
};
