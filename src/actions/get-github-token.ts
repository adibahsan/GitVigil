"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis";

const TOKEN_EXPIRATION = 3600; // 1 hour in seconds

export async function getGitHubToken(): Promise<string> {
    try {
        const session = await auth();

        if (!session || !session.user || !session.user.id) {
            return "NO_TOKEN";
        }

        const cacheKey = `git-token:${session.user.id}`;

        const cachedToken = await redis.get<string>(cacheKey);

        if (cachedToken) {
            return cachedToken;
        }

        // console.time("DB Query Time");
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { accessToken: true },
        });
        // console.timeEnd("DB Query Time");

        if (!user) {
            return "NO_TOKEN";
        }
        if (!user.accessToken) {
            return "NO_TOKEN";
        }

        await redis.set(cacheKey, user.accessToken, {
            ex: TOKEN_EXPIRATION,
        });

        return user.accessToken;
    } catch (error) {
        console.error("Error fetching GitHub token:", error);
        throw error;
    }
}
