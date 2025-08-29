import db from "../../config/mysql/mysql.js";

export class ControllerBase {
  getDbPool() {
    return db.getPool();
  }
  
  handleError(res, statusCode, err, customMessage) {
    console.log(err)
    res.status(statusCode).json({
      error: customMessage,
      message: err.message,
    });
  }
}