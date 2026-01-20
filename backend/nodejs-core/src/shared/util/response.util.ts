import { Response } from "express";
import { ResponseControllerI } from "../../shared/interface/general";

/**
 * Respuesta central de los controladores
 * @param response objeto de respuesta
 * @returns Response al cliente
 */
export default function ResponseController(response: ResponseControllerI) {
  try {
    if (response?.error) {
      ErrorPath(response.error, response.res);
      return;
    }

    const responseFormat = {
      data: response?.data,
      message: response?.message ?? "Proceso exitoso",
    };

    response.res.send(responseFormat);
  } catch (error: any) {
    ErrorPath(error, response.res);
  }
}

function ErrorPath(error: any, res: Response): void {
  let customError = "";
  if (error instanceof Error) {
    customError = error.message;
  } else if (typeof error?.message === "string") {
    customError = error?.message;
  }

  const responseFormat = {
    data: null,
    message: customError,
  };

  res.status(500).send(responseFormat);
}
