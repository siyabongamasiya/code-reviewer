import { query } from "../config/database";


export const getNotifications = async () => {
    const { rows } = await query(`SELECT * FROM notifications`);
    return rows;
}