class ModelBase {
    constructor(
      created_at = null,
      updated_at = null,
      deleted_at = null
    ) {
      this.created_at = created_at
      this.updated_at = updated_at
      this.deleted_at = deleted_at;
    }
  }
  
  export default ModelBase;