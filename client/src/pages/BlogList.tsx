import { Link } from "wouter";
import SectionHeader from "@/components/SectionHeader";
import { trpc } from "@/lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, PenLine } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function formatDate(date: Date | null | undefined) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogList() {
  const { data: posts, isLoading } = trpc.blog.list.useQuery();
  const { user } = useAuth();
  const isOwner = (user as { isOwner?: boolean } | null)?.isOwner === true;

  return (
    <div className="page-section pt-32">
      <div className="container">
        <div className="flex items-end justify-between mb-14">
          <SectionHeader
            label="Writing"
            title="Blog"
            subtitle="Thoughts on engineering, design, and the things that interest me."
            className="mb-0"
          />
          {isOwner && (
            <Link href="/blog/new">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent shrink-0 mb-1">
                <PenLine size={14} />
                New Post
              </Button>
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b border-border pb-8">
                <Skeleton className="h-4 w-32 mb-4" />
                <Skeleton className="h-7 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : !posts || posts.length === 0 ? (
          <div className="text-center py-24">
            <div
              className="font-serif text-5xl text-muted-foreground/20 mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              ✦
            </div>
            <p className="text-muted-foreground text-sm tracking-widest uppercase">
              No posts yet — check back soon
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {posts.map((post, i) => (
              <article
                key={post.id}
                className="py-10 group animate-fade-in-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="grid md:grid-cols-[8rem_1fr] gap-4 md:gap-10 items-start">
                  {/* Date */}
                  <div className="md:pt-1 shrink-0">
                    <time className="text-xs text-muted-foreground/60 tracking-widest uppercase">
                      {formatDate(post.publishedAt)}
                    </time>
                    {!post.published && (
                      <Badge variant="secondary" className="mt-2 text-xs block w-fit">
                        Draft
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div>
                    <Link href={`/blog/${post.slug}`}>
                      <h2
                        className="font-serif text-2xl text-foreground mb-3 group-hover:text-accent transition-colors duration-200 cursor-pointer"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5 max-w-2xl">
                      {post.excerpt}
                    </p>
                    <Link href={`/blog/${post.slug}`}>
                      <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-accent hover:gap-3 transition-all duration-200 cursor-pointer">
                        Read More
                        <ArrowRight size={13} />
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
