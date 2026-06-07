/**
 * ============================================================
 *  BLOG POSTS DATA — edit this file to add / update posts
 * ============================================================
 *
 *  HOW TO ADD A NEW POST
 *  ─────────────────────
 *  1. Copy the HTML template from blog/posts/_template.html
 *     and save it as blog/posts/your-slug.html
 *  2. Fill in the content of the new file.
 *  3. Add a new entry to the POSTS array below.
 *
 *  FIELDS
 *  ──────
 *  slug      — filename without .html (e.g. "vllm-kv-cache")
 *  title     — post title shown on card and in the post
 *  date      — ISO date string "YYYY-MM-DD"
 *  category  — must match one of the keys in CATEGORIES below
 *  excerpt   — 1-2 sentence summary shown on the card
 *  readTime  — estimated read time (string, e.g. "6 min")
 *  draft     — set to true to hide from the listing
 *
 * ============================================================
 */

const CATEGORIES = [
  { key: "inference",     label: "Inference & Serving",      icon: "⚡" },
  { key: "training",      label: "Distributed Training",     icon: "🌐" },
  { key: "quantization",  label: "Quantization & Pruning",   icon: "🗜️" },
  { key: "paper-notes",   label: "Paper Notes",              icon: "📄" },
  { key: "math",          label: "Math & Theory",            icon: "📐" },
  { key: "misc",          label: "Misc",                     icon: "💡" },
];

const POSTS = [
  {
    slug: "attention-is-all-you-need",
    title: "Attention Is All You Need — Notes & Intuitions",
    date: "2024-01-15",
    category: "paper-notes",
    excerpt: "Walking through the Transformer architecture: why attention works, what multi-head attention computes, and the positional encoding trick.",
    readTime: "8 min",
    draft: false,
  },

  // ── Inference & Serving ──────────────────────────────────
  {
    slug: "paged-attention",
    title: "How PagedAttention Solves KV Cache Fragmentation",
    date: "2024-02-10",
    category: "inference",
    excerpt: "vLLM's core insight: treat GPU memory like an OS page table. Breaking down how virtual/physical KV blocks eliminate fragmentation and enable sharing.",
    readTime: "10 min",
    draft: true,   // ← change to false when the post file is ready
  },
  {
    slug: "speculative-decoding",
    title: "Speculative Decoding: Free Tokens from a Draft Model",
    date: "2024-03-05",
    category: "inference",
    excerpt: "The drafter-verifier trick that gets 2-3× speedup on autoregressive generation without changing output distribution.",
    readTime: "7 min",
    draft: true,
  },
  {
    slug: "continuous-batching",
    title: "Continuous Batching vs. Static Batching in LLM Serving",
    date: "2024-03-20",
    category: "inference",
    excerpt: "Why iteration-level scheduling outperforms request-level batching, and how Orca implements it.",
    readTime: "6 min",
    draft: true,
  },

  // ── Distributed Training ─────────────────────────────────
  {
    slug: "tensor-parallelism",
    title: "Tensor Parallelism: Splitting Attention and FFN Across GPUs",
    date: "2024-04-01",
    category: "training",
    excerpt: "How Megatron-LM shards weight matrices column- and row-wise to scale a single transformer layer across multiple GPUs.",
    readTime: "9 min",
    draft: true,
  },
  {
    slug: "zero-optimizer",
    title: "ZeRO: Eliminating Redundancy in Data-Parallel Training",
    date: "2024-04-22",
    category: "training",
    excerpt: "The three stages of ZeRO and how they reduce per-GPU memory from 16× to near-linear in the number of GPUs.",
    readTime: "8 min",
    draft: true,
  },

  // ── Quantization ─────────────────────────────────────────
  {
    slug: "gptq",
    title: "GPTQ: Post-Training Quantization for GPT Models",
    date: "2024-05-10",
    category: "quantization",
    excerpt: "One-shot weight quantization using second-order information. How GPTQ achieves INT4 with minimal perplexity loss.",
    readTime: "8 min",
    draft: true,
  },

  // ── Math & Theory ─────────────────────────────────────────
  {
    slug: "flash-attention-math",
    title: "FlashAttention: Tiling Attention for IO Efficiency",
    date: "2024-06-01",
    category: "math",
    excerpt: "Why standard attention is memory-bound, and how tiling + recomputation lets FlashAttention run in O(N) HBM reads instead of O(N²).",
    readTime: "12 min",
    draft: true,
  },
];
