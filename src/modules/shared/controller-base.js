import db from "../../config/mysql/mysql.js";

export class ControllerBase {
  getDbPool() {
    return db.getPool();
  }

  handleError(res, statusCode, err, customMessage, details = null) {
    const response = {
      code: statusCode,
      error: customMessage,
      message: err?.message || String(err),
    };

    if (details) response.details = details;
    
    res.status(statusCode).json(response);
  }

}