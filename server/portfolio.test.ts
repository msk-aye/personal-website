import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
import type { TrpcContext } from "./_core/context";

// ── Helpers ────────────────────────────────────────────────────────────────

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function createOwnerContext(openId = "owner-open-id"): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId,
    email: "owner@example.com",
    name: "Owner",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

// ── Mock DB helpers ────────────────────────────────────────────────────────

vi.mock("./db", () => ({
  listPublishedPosts: vi.fn().mockResolvedValue([
    {
      id: 1,
      slug: "hello-world",
      title: "Hello World",
      excerpt: "First post",
      content: "# Hello",
      published: true,
      publishedAt: new Date("2024-01-01"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  listAllPosts: vi.fn().mockResolvedValue([]),
  getPostBySlug: vi.fn().mockImplementation(async (slug: string) => {
    if (slug === "hello-world") {
      return {
        id: 1,
        slug: "hello-world",
        title: "Hello World",
        excerpt: "First post",
        content: "# Hello",
        published: true,
        publishedAt: new Date("2024-01-01"),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
    return undefined;
  }),
  createPost: vi.fn().mockResolvedValue({ id: 2, slug: "new-post" }),
  updatePost: vi.fn().mockResolvedValue(undefined),
  deletePost: vi.fn().mockResolvedValue(undefined),
  getCommentsByPostId: vi.fn().mockResolvedValue([
    {
      id: 1,
      postId: 1,
      authorName: "Alice",
      authorEmail: "alice@example.com",
      body: "Great post!",
      approved: true,
      createdAt: new Date(),
    },
  ]),
  createComment: vi.fn().mockResolvedValue(undefined),
  createContactMessage: vi.fn().mockResolvedValue(undefined),
  upsertUser: vi.fn().mockResolvedValue(undefined),
  getUserByOpenId: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

vi.mock("./_core/env", () => ({
  ENV: {
    ownerOpenId: "owner-open-id",
    jwtSecret: "test-secret",
    oauthServerUrl: "https://oauth.example.com",
    appId: "test-app",
  },
}));

// ── Auth tests ─────────────────────────────────────────────────────────────

describe("auth.logout", () => {
  it("clears session cookie and returns success", async () => {
    const ctx = createOwnerContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result).toEqual({ success: true });
    expect(ctx.res.clearCookie).toHaveBeenCalledWith(
      COOKIE_NAME,
      expect.objectContaining({ maxAge: -1 })
    );
  });

  it("returns current user for authenticated request", async () => {
    const ctx = createOwnerContext();
    const caller = appRouter.createCaller(ctx);
    const user = await caller.auth.me();
    expect(user?.name).toBe("Owner");
  });

  it("returns null for unauthenticated request", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const user = await caller.auth.me();
    expect(user).toBeNull();
  });
});

// ── Blog tests ─────────────────────────────────────────────────────────────

describe("blog.list", () => {
  it("returns published posts for public users", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const posts = await caller.blog.list();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts[0]?.slug).toBe("hello-world");
  });
});

describe("blog.getBySlug", () => {
  it("returns a published post by slug", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const post = await caller.blog.getBySlug({ slug: "hello-world" });
    expect(post.title).toBe("Hello World");
  });

  it("throws NOT_FOUND for unknown slug", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.blog.getBySlug({ slug: "nonexistent" })).rejects.toMatchObject({
      code: "NOT_FOUND",
    });
  });
});

describe("blog.create", () => {
  it("throws UNAUTHORIZED for unauthenticated users", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.blog.create({
        slug: "test",
        title: "Test",
        excerpt: "Test excerpt",
        content: "Content",
        published: false,
      })
    ).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("allows owner to create a post", async () => {
    const ctx = createOwnerContext("owner-open-id");
    const caller = appRouter.createCaller(ctx);
    const result = await caller.blog.create({
      slug: "new-post",
      title: "New Post",
      excerpt: "An excerpt",
      content: "# New Post",
      published: false,
    });
    expect(result).toBeDefined();
  });
});

// ── Comments tests ─────────────────────────────────────────────────────────

describe("comments.list", () => {
  it("returns comments for a post", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.comments.list({ postId: 1 });
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]?.authorName).toBe("Alice");
  });
});

describe("comments.create", () => {
  it("creates a comment successfully", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.comments.create({
      postId: 1,
      authorName: "Bob",
      authorEmail: "bob@example.com",
      body: "Nice article!",
    });
    expect(result).toEqual({ success: true });
  });

  it("rejects empty body", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.comments.create({
        postId: 1,
        authorName: "Bob",
        authorEmail: "bob@example.com",
        body: "",
      })
    ).rejects.toBeDefined();
  });
});

// ── Contact tests ──────────────────────────────────────────────────────────

describe("contact.submit", () => {
  it("stores a contact message and returns success", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.contact.submit({
      name: "Jane Doe",
      email: "jane@example.com",
      message: "Hello, I'd like to work together.",
    });
    expect(result).toEqual({ success: true });
  });

  it("rejects invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.contact.submit({
        name: "Jane",
        email: "not-an-email",
        message: "Hello",
      })
    ).rejects.toBeDefined();
  });
});
