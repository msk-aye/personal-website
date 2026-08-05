import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import {
  listPublishedPosts,
  listAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getCommentsByPostId,
  createComment,
  createContactMessage,
} from "./db";
import { notifyOwner } from "./_core/notification";
import { ENV } from "./_core/env";

// ── Blog router ────────────────────────────────────────────────────────────
const blogRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    const isOwner = ctx.user?.openId === ENV.ownerOpenId;
    return isOwner ? listAllPosts() : listPublishedPosts();
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input, ctx }) => {
      const post = await getPostBySlug(input.slug);
      if (!post) throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      const isOwner = ctx.user?.openId === ENV.ownerOpenId;
      if (!post.published && !isOwner) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      }
      return post;
    }),

  create: protectedProcedure
    .input(
      z.object({
        slug: z.string().min(1).max(255),
        title: z.string().min(1).max(512),
        excerpt: z.string().min(1),
        content: z.string().min(1),
        published: z.boolean().default(false),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.openId !== ENV.ownerOpenId) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      return createPost({
        ...input,
        publishedAt: input.published ? new Date() : undefined,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        slug: z.string().min(1).max(255).optional(),
        title: z.string().min(1).max(512).optional(),
        excerpt: z.string().min(1).optional(),
        content: z.string().min(1).optional(),
        published: z.boolean().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.openId !== ENV.ownerOpenId) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      const { id, ...data } = input;
      const updateData: Record<string, unknown> = { ...data };
      if (data.published) updateData.publishedAt = new Date();
      await updatePost(id, updateData as Parameters<typeof updatePost>[1]);
      return { success: true };
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.openId !== ENV.ownerOpenId) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      await deletePost(input.id);
      return { success: true };
    }),
});

// ── Comments router ────────────────────────────────────────────────────────
const commentsRouter = router({
  list: publicProcedure
    .input(z.object({ postId: z.number() }))
    .query(({ input }) => getCommentsByPostId(input.postId)),

  create: publicProcedure
    .input(
      z.object({
        postId: z.number(),
        authorName: z.string().min(1).max(128),
        authorEmail: z.string().email().max(320),
        body: z.string().min(1).max(2000),
      })
    )
    .mutation(async ({ input }) => {
      await createComment(input);
      return { success: true };
    }),
});

// ── Contact router ─────────────────────────────────────────────────────────
const contactRouter = router({
  submit: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(256),
        email: z.string().email().max(320),
        message: z.string().min(1).max(5000),
      })
    )
    .mutation(async ({ input }) => {
      await createContactMessage(input);
      await notifyOwner({
        title: `New contact message from ${input.name}`,
        content: `**From:** ${input.name} <${input.email}>\n\n${input.message}`,
      }).catch(() => {/* non-blocking */});
      return { success: true };
    }),
});

// ── App router ─────────────────────────────────────────────────────────────
export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => {
      const user = opts.ctx.user;
      if (!user) return null;
      return {
        ...user,
        isOwner: user.openId === ENV.ownerOpenId,
      };
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  blog: blogRouter,
  comments: commentsRouter,
  contact: contactRouter,
});

export type AppRouter = typeof appRouter;
