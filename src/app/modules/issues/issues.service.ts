import { pool } from "../../config/db";


// CREATE ISSUE
export const createIssueIntoDB = async (
  payload: any,
  reporterId: number
) => {
  const { title, description, type } = payload;

  const query = `
    INSERT INTO issues
    (title, description, type, reporter_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
  `;

  const result = await pool.query(query, [
    title,
    description,
    type,
    reporterId,
  ]);

  return result.rows[0];
};



// GET ALL ISSUES
export const getAllIssuesFromDB = async (
  queryData: any
) => {
   console.log("queryData =", queryData);

  let query = `SELECT * FROM issues WHERE 1=1`;

  const values = [];

  // filter by type
  if (queryData.type) {
    values.push(queryData.type);

    query += ` AND type = $${values.length}`;
  }

  // filter by status
  if (queryData.status) {
    values.push(queryData.status);

    query += ` AND status = $${values.length}`;
  }

  // sorting
  if (queryData.sort === "oldest") {
    query += ` ORDER BY created_at ASC`;
  } else {
    query += ` ORDER BY created_at DESC`;
  }

  const result = await pool.query(query, values);

  return result.rows;
};



// GET SINGLE ISSUE
export const getSingleIssueFromDB = async (
  id: string
) => {
  const result = await pool.query(
    "SELECT * FROM issues WHERE id = $1",
    [id]
  );

  return result.rows[0];
};



// UPDATE ISSUE
export const updateIssueIntoDB = async (
  id: string,
  payload: any
) => {
  const { title, description, type } = payload;

  const query = `
    UPDATE issues
    SET
      title = $1,
      description = $2,
      type = $3,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *
  `;

  const result = await pool.query(query, [
    title,
    description,
    type,
    id,
  ]);

  return result.rows[0];
};



// DELETE ISSUE
export const deleteIssueFromDB = async (
  id: string
) => {
  await pool.query(
    "DELETE FROM issues WHERE id = $1",
    [id]
  );
};