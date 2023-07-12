//const { post } = require('backend/routes/variantRoutes');
const db = require('../config/db');


//get all variants
exports.getAllVariants = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM tbl_variants_master';
        const [rows, fields] = await db.query(query);
        res.status(200).json({ count: rows.length, variants: rows });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

//get variant by id
exports.getVariantById = async (req, res, next) => {
    try {
        const requestId = req.params.id;
        const query = `SELECT * FROM tbl_variants_master WHERE tfv_variant_id = ${requestId}`;
        const [rows, fields] = await db.query(query);
        res.status(200).json({ variant: rows[0] });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

//create new variant
exports.createVariant = async (req, res, next) => {
    try {
      const {
        tfv_variant_name,
        tfv_variant_image_link,
        tfv_is_active,
        tfv_status_id,
        tfv_created_by,
        tfv_updated_by
      } = req.body;
  
      const currentDate = new Date();
      const query = `
        INSERT INTO tbl_variants_master 
        (tfv_variant_name, tfv_variant_image_link, tfv_is_active, tfv_status_id, tfv_created_by, tfv_created_date_time, tfv_updated_by, tfv_updated_date_time)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        tfv_variant_name,
        tfv_variant_image_link,
        tfv_is_active,
        tfv_status_id,
        tfv_created_by,
        currentDate,
        tfv_updated_by,
        currentDate
      ];
  
      await db.query(query, values);
      res.status(200).json({ message: 'Variant created successfully'});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  
  
  //update request
  
exports.updateVariantById = async (req, res, next) => {
    try {
      const variantId = req.params.id;
      const {
        tfv_variant_name,
        tfv_variant_image_link,
        tfv_is_active,
        tfv_status_id,
        tfv_updated_by
      } = req.body;
  
      const currentDate = new Date();
      const query = `
        UPDATE tbl_variants_master
        SET tfv_variant_name = ?,
            tfv_variant_image_link = ?,
            tfv_is_active = ?,
            tfv_status_id = ?,
            tfv_updated_by = ?,
            tfv_updated_date_time = ?
        WHERE tfv_variant_id = ?
      `;
      const values = [
        tfv_variant_name,
        tfv_variant_image_link,
        tfv_is_active,
        tfv_status_id,
        tfv_updated_by,
        currentDate,
        variantId
      ];
  
      await db.query(query, values);
      res.status(200).json({ message: 'Variant updated successfully' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  
//delete variant
exports.deleteVariantById = async (req, res, next) => {
    try {
        const variantId = req.params.id;
        const query = `DELETE FROM tbl_variants_master WHERE tfv_variant_id = ${variantId}`;
        const [result] = await db.query(query);
        res.status(200).json({
            message: 'Variant deleted successfully',
            result
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
