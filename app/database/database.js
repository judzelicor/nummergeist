import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({path: "../.env.local"});

class DatabaseClient {
    constructor() {
        this.database = null;
    }

    connect() {
        this.database = createClient(
            process.env.SUPABASE_DATABASE_URL,
            process.env.SUPABASE_DATABASE_KEY
        )
    }
}

export const supabaseDatabaseClient = new DatabaseClient();