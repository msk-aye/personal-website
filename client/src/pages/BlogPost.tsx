import { useState } from "react";
import { useParams, Link } from "wouter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { trpc } from "@/lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, MessageCircle, User } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Badge } from "@/components/ui/badge";

function formatDate(date: Date | null | undefined) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function CommentForm({ postId, onSuccess }: { postId: number; onSuccess: () => void }) {
  const [form, setForm] = useState({ authorName: "", authorEmail: "", body: "" });

  const mutation = trpc.comments.create.useMutation({
    onSuccess: () => {
      setForm({ authorName: "", authorEmail: "", body: "" });
      toast.success("Comment posted!");
      onSuccess();
    },
    onError: (err: { message?: string }) => {
      toast.error(err.message || "Failed to post comment.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.authorName.trim() || !form.authorEmail.trim() || !form.body.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    mutation.mutate({ postId, ...form });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="authorName" className="text-xs tracking-widest uppercase text-muted-foreground">
            Name
          </Label>
          <Input
            id="authorName"
            placeholder="Your name"
            value={form.authorName}
            onChange={(e) => setForm((f) => ({ ...f, authorName: e.target.value }))}
            className="bg-background h-10"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="authorEmail" className="text-xs tracking-widest uppercase text-muted-foreground">
            Email
          </Label>
          <Input
            id="authorEmail"
            type="email"
            placeholder="you@example.com"
            value={form.authorEmail}
            onChange={(e) => setForm((f) => ({ ...f, authorEmail: e.target.value }))}
            className="bg-background h-10"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="body" className="text-xs tracking-widest uppercase text-muted-foreground">
          Comment
        </Label>
        <Textarea
          id="body"
          placeholder="Share your thoughts…"
          value={form.body}
          onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
          className="bg-background resize-none min-h-[100px]"
          required
        />
      </div>
      <Button
        type="submit"
        className="text-sm tracking-widest uppercase font-medium"
        style={{ letterSpacing: "0.1em" }}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Posting…" : "Post Comment"}
      </Button>
    </form>
  );
}

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const { user } = useAuth();
  const isOwner = (user as { isOwner?: boolean } | null)?.isOwner === true;
  const utils = trpc.useUtils();

  const { data: post, isLoading: postLoading, error } = trpc.blog.getBySlug.useQuery(
    { slug: slug ?? "" },
    { enabled: !!slug }
  );

  const { data: commentList, isLoading: commentsLoading, refetch: refetchComments } =
    trpc.comments.list.useQuery(
      { postId: post?.id ?? 0 },
      { enabled: !!post?.id }
    );

  const deleteMutation = trpc.blog.delete.useMutation({
    onSuccess: () => {
      toast.success("Post deleted.");
      utils.blog.list.invalidate();
      window.location.href = "/blog";
    },
    onError: (err: { message?: string }) => toast.error(err.message || "Failed to delete."),
  });

  if (postLoading) {
    return (
      <div className="page-section pt-32">
        <div className="container max-w-3xl mx-auto">
          <Skeleton className="h-4 w-32 mb-8" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-4 w-48 mb-12" />
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-4 w-full" />)}
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="page-section pt-32">
        <div className="container text-center">
          <p className="text-muted-foreground mb-6">Post not found.</p>
          <Link href="/blog">
            <Button variant="outline" className="bg-transparent">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-section pt-28">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link href="/blog">
            <span className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground tracking-widest uppercase transition-colors mb-10 cursor-pointer">
              <ArrowLeft size={13} />
              All Posts
            </span>
          </Link>

          {/* Post header */}
          <header className="mb-12">
            {!post.published && (
              <Badge variant="secondary" className="mb-4">Draft</Badge>
            )}
            <h1
              className="font-serif text-foreground mb-4 leading-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {post.title}
            </h1>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <time className="text-sm text-muted-foreground/60 tracking-widest uppercase">
                {formatDate(post.publishedAt || post.createdAt)}
              </time>
              {isOwner && (
                <div className="flex items-center gap-3">
                  <Link href={`/blog/${post.slug}/edit`}>
                    <Button variant="outline" size="sm" className="bg-transparent text-xs">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      if (confirm("Delete this post?")) deleteMutation.mutate({ id: post.id });
                    }}
                    disabled={deleteMutation.isPending}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
            <div className="mt-6 h-px bg-border" />
          </header>

          {/* Post content */}
          <div className="prose prose-slate max-w-none mb-20">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Comments section */}
          <section>
            <div className="flex items-center gap-3 mb-10">
              <MessageCircle size={18} className="text-accent" strokeWidth={1.5} />
              <h2
                className="font-serif text-xl text-foreground"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Comments
                {commentList && commentList.length > 0 && (
                  <span className="ml-2 text-muted-foreground text-base font-normal">
                    ({commentList.length})
                  </span>
                )}
              </h2>
            </div>

            {/* Existing comments */}
            {commentsLoading ? (
              <div className="space-y-4 mb-10">
                {[1, 2].map((i) => (
                  <div key={i} className="border border-border rounded-xl p-5">
                    <Skeleton className="h-4 w-32 mb-3" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            ) : commentList && commentList.length > 0 ? (
              <div className="space-y-5 mb-12">
                {commentList.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-card border border-border rounded-xl p-6 animate-fade-in"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <User size={14} className="text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {comment.authorName}
                        </p>
                        <time className="text-xs text-muted-foreground/60">
                          {formatDate(comment.createdAt)}
                        </time>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-11">
                      {comment.body}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm mb-10">
                No comments yet — be the first to share your thoughts.
              </p>
            )}

            {/* Comment form */}
            <div className="border border-border rounded-xl p-7">
              <h3
                className="font-serif text-lg text-foreground mb-6"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Leave a comment
              </h3>
              <CommentForm
                postId={post.id}
                onSuccess={() => refetchComments()}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
