import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";

export default function BlogEditor() {
  const params = useParams<{ slug?: string }>();
  const isEdit = !!params.slug;
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const isOwner = (user as { isOwner?: boolean } | null)?.isOwner === true;
  const utils = trpc.useUtils();

  const [form, setForm] = useState({
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    published: false,
  });

  const { data: existingPost } = trpc.blog.getBySlug.useQuery(
    { slug: params.slug ?? "" },
    { enabled: isEdit && !!params.slug }
  );

  useEffect(() => {
    if (existingPost) {
      setForm({
        slug: existingPost.slug,
        title: existingPost.title,
        excerpt: existingPost.excerpt,
        content: existingPost.content,
        published: existingPost.published,
      });
    }
  }, [existingPost]);

  const createMutation = trpc.blog.create.useMutation({
    onSuccess: (post) => {
      toast.success("Post created!");
      utils.blog.list.invalidate();
      navigate(`/blog/${post?.slug ?? ""}`);
    },
    onError: (err: { message?: string }) => toast.error(err.message || "Failed to create post."),
  });

  const updateMutation = trpc.blog.update.useMutation({
    onSuccess: () => {
      toast.success("Post updated!");
      utils.blog.list.invalidate();
      utils.blog.getBySlug.invalidate({ slug: params.slug });
      navigate(`/blog/${form.slug}`);
    },
    onError: (err: { message?: string }) => toast.error(err.message || "Failed to update post."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.slug || !form.title || !form.excerpt || !form.content) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (isEdit && existingPost) {
      updateMutation.mutate({ id: existingPost.id, ...form });
    } else {
      createMutation.mutate(form);
    }
  };

  if (!isOwner && user !== undefined) {
    return (
      <div className="page-section pt-32">
        <div className="container text-center">
          <p className="text-muted-foreground">You do not have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="page-section pt-28">
      <div className="container max-w-3xl mx-auto">
        <Link href="/blog">
          <span className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground tracking-widest uppercase transition-colors mb-10 cursor-pointer">
            <ArrowLeft size={13} />
            All Posts
          </span>
        </Link>

        <h1
          className="font-serif text-foreground mb-10"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {isEdit ? "Edit Post" : "New Post"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-xs tracking-widest uppercase text-muted-foreground">
                Title
              </Label>
              <Input
                placeholder="Post title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="bg-card h-11"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs tracking-widest uppercase text-muted-foreground">
                Slug
              </Label>
              <Input
                placeholder="url-friendly-slug"
                value={form.slug}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                  }))
                }
                className="bg-card h-11"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs tracking-widest uppercase text-muted-foreground">
              Excerpt
            </Label>
            <Textarea
              placeholder="A brief summary of the post…"
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              className="bg-card resize-none min-h-[80px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs tracking-widest uppercase text-muted-foreground">
              Content (Markdown)
            </Label>
            <Textarea
              placeholder="Write your post in Markdown…"
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              className="bg-card resize-none min-h-[400px] font-mono text-sm"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="published"
              checked={form.published}
              onCheckedChange={(v) => setForm((f) => ({ ...f, published: v }))}
            />
            <Label htmlFor="published" className="text-sm text-muted-foreground cursor-pointer">
              Publish immediately
            </Label>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <Button
              type="submit"
              className="px-8 text-sm tracking-widest uppercase font-medium"
              style={{ letterSpacing: "0.1em" }}
              disabled={isPending}
            >
              {isPending ? "Saving…" : isEdit ? "Update Post" : "Create Post"}
            </Button>
            <Link href="/blog">
              <Button variant="ghost" type="button" className="text-sm">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
