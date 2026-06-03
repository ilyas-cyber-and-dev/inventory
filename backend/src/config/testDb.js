require("dotenv").config();

const db = require("./db");

async function test() {
    try {
        const connection = await db.getConnection();

        console.log("Database Connected!");

        connection.release();
    } catch (error) {
        console.error(error);
    }
}

test();