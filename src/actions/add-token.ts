"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { encryptToken } from "@/lib/token-encryption";
import { revalidatePath } from "next/cache";

type ActionResult = {
    success: boolean;
    message: string;
};

const TOKEN_EXPIRATION = 3600; // 1 hour in seconds

export async function upsertGithubToken(token: string): Promise<ActionResult> {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        throw new Error("Unauthorized");
    }
    try {
        // Encrypt the token before storing
        const encryptedToken = await encryptToken(token);
        await prisma.user.upsert({
            where: { id: session.user.id },
            update: { accessToken: encryptedToken },
            create: {
                id: session.user.id,
                accessToken: encryptedToken,
            },
        });

        const cacheKey = `git-token:${session.user.id}`;
        await redis.set(cacheKey, encryptedToken, {
            ex: TOKEN_EXPIRATION,
        });
        revalidatePath("/dashboard");
        return { success: true, message: "GitHub token updated successfully" };
    } catch (error) {
        console.error("Error updating GitHub token:", error);
        return { success: false, message: "Failed to update GitHub token" };
    } finally {
        await prisma.$disconnect();
    }
}
