const db = require('../config/db');

//GET-->all states 
exports.getAllStates = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM tbl_state_master';
        const [rows, fields] = await db.query(query);
        res.status(200).json({
            count: rows.length,
            states: rows
        });
    } catch (error) {
        console.log(error);
        next(error);
    };
};

//Get-->fetch data by id
exports.getStateById = async (req, res, next) => {
    try {
        const requestId = req.params.id;
        const query = `SELECT * FROM tbl_state_master WHERE tfs_state_id = ${requestId}`;
        const [row, fields] = await db.query(query);
        res.status(200).json({
            state: row[0]
        });
    } catch (error) {
        console.log(error);
        next(error);
    };
};

//create new state
exports.createState = async (req, res, next) => {
    try {
        const {
            tfs_country_name,
            tfs_state_name,
            tfs_created_by,
            tfs_updated_by
        } = req.body;
        const currentDate = new Date();
        const query = `INSERT INTO tbl_state_master
        (tfs_country_name, tfs_state_name, tfs_created_by, tfs_created_date_time, tfs_updated_by, tfs_updated_date_time)
        VALUES (?, ?, ?, ?, ?, ?) `;
        const values = [
            tfs_country_name,
            tfs_state_name,
            tfs_created_by,
            currentDate,
            tfs_updated_by,
            currentDate
        ]
        await db.query(query, values);
        res.status(200).json({
            message: "state created successfully"
        })
    } catch (error) {
        console.log(error);
        next(error);
    };
};

//update State
exports.updateStateById = async (req, res, next) => {
    try {
        const stateId = req.params.id;
        const {
            tfs_country_name,
            tfs_state_name,
            tfs_updated_by
        } = req.body;

        const currentDate = new Date();

        const query = `UPDATE tbl_state_master
          SET tfs_country_name = ?,
          tfs_state_name = ?,
          tfs_updated_by = ?,
          tfs_updated_date_time = ? WHERE tfs_state_id = ?`;

        const values = [
            tfs_country_name,
            tfs_state_name,
            tfs_updated_by,
            currentDate,
            stateId
        ];

        await db.query(query, values);
        res.status(200).json({ message: "State updated successfully" })

    } catch (error) {
        console.log(error);
        next(error);
    };
};

//delete state
exports.deleteState = async (req, res, next) => {
    try {
        requestId = req.params.id;
        const query = `DELETE FROM tbl_state_master WHERE tfs_state_id = ${requestId}`;
        const [result] = await db.query(query);
        res.status(200).json({ message: "State deleted successfully" });
    } catch (error) {
        console.log(error);
        next(error);
    }
}