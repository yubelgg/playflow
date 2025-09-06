import { query } from "./_generated/server";

/**
 * Get messages for the currently authenticated user.
 * Returns an empty array if not authenticated.
 */
export const getForCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    
    // When user is not authenticated, return empty array instead of throwing
    if (identity === null) {
      return [];
    }

    // Get user information from the JWT
    const { email, name, id } = identity;

    // Return messages filtered to this user's email
    return await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("author"), email))
      .collect();
  },
});

/**
 * Example of a query that requires authentication.
 * This pattern is useful for data that should only be accessible to signed-in users.
 */
export const getProtectedData = query({
  args: {},
  handler: async (ctx) => {
    // For APIs that require authentication, validate identity first
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    
    // The code only runs after authentication check passes
    return {
      message: "This data is only visible to authenticated users",
      userId: identity.subject
    };
  },
});