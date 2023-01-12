import {
    supabaseDatabaseClient
} from "../database/database.js";

export async function login(request, response) {
    const { subscriptionType } = request.body;

    if (subscriptionType === "freeTier") {
        const { data, error } = await supabaseDatabaseClient.database
            .from("free_tier_users")
            .select()

        if (data) {
            response.status(200).json({
                success: true,
                redirect: "/game-room",
                user: data[0]
            })
        } else {
            response.status(200).json({
                success: false,
                redirect: "/signup",
                user: null
            })
        }

    }

}