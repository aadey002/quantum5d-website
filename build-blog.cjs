// build-blog.cjs — Static blog generator for quantum5d.ai
// Fetches published posts from Supabase at build time, emits static HTML.
// Supabase credentials are read from environment variables and NEVER
// appear in generated output.
//
// Usage: SUPABASE_URL=... SUPABASE_SERVICE_KEY=... node build-blog.cjs
// Vercel sets these via environment variables.

const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY;
const SITE = 'https://quantum5d.ai';
const BLOG_DIR = path.join(__dirname, 'public', 'blog');

// ── Guard: fail loudly if credentials are missing ──────────────────
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('FATAL: SUPABASE_URL and SUPABASE_SERVICE_KEY (or SUPABASE_KEY) must be set.');
  process.exit(1);
}

// ── Fetch all published posts ──────────────────────────────────────
async function fetchPosts() {
  const url = SUPABASE_URL + '/rest/v1/blog_posts?status=eq.published&select=*&order=created_at.desc';
  const res = await fetch(url, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_KEY,
    },
  });

  if (!res.ok) {
    console.error('FATAL: Supabase returned ' + res.status + ' ' + res.statusText);
    const body = await res.text();
    console.error(body);
    process.exit(1);
  }

  const posts = await res.json();

  if (!Array.isArray(posts) || posts.length === 0) {
    console.error('FATAL: Supabase returned zero published posts. Refusing to emit an empty blog.');
    process.exit(1);
  }

  return posts;
}

// ── HTML escaping ──────────────────────────────────────────────────
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Format date ────────────────────────────────────────────────────
function fmtDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function isoDate(iso) {
  if (!iso) return '';
  return new Date(iso).toISOString().split('T')[0];
}

// ── Shared HTML fragments ──────────────────────────────────────────

function headFonts() {
  return '<link rel="preconnect" href="https://fonts.googleapis.com">'
    + '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    + '<link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">';
}

// ── GA4 analytics snippet ─────────────────────────────────────────
function ga4Snippet(pageType, postData) {
  // pageType: 'blog_index' or 'blog_post'
  // postData: {slug, category, sequence} for posts, null for index
  var tag = '<script async src="https://www.googletagmanager.com/gtag/js?id=G-VVH09H9BLM"></script>\n'
    + '<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());'
    + 'gtag("config","G-VVH09H9BLM"';

  if (pageType === 'blog_post' && postData) {
    // Send custom dimensions with the config hit
    tag += ',{'
      + '"post_slug":"' + (postData.slug || '') + '",'
      + '"content_category":"' + (postData.category || 'General') + '",'
      + '"post_sequence":' + (postData.sequence || 0)
      + '}';
  }

  tag += ');</script>';
  return tag;
}

function navHtml() {
  return '<nav class="nav"><div class="wrap nav-in">'
    + '<a class="brand" href="/">'
    + '<img src="/logo.png" alt="" width="34" height="31" style="border-radius:4px">'
    + '<div class="wm">Quantum5D<small>.ai</small></div>'
    + '</a>'
    + '<div class="nav-links">'
    + '<a href="/#applications">Applications</a>'
    + '<a href="/blog" class="nav-active">Blog</a>'
    + '<a href="/#services">Services</a>'
    + '<a href="/#about">About</a>'
    + '<a href="/security-and-trust">Security &amp; Trust</a>'
    + '<a href="/#contact">Contact</a>'
    + '</div>'
    + '<button class="nav-toggle" onclick="document.querySelector(\'.nav-links\').classList.toggle(\'nav-open\')" aria-label="Menu">'
    + '<span></span><span></span><span></span>'
    + '</button>'
    + '</div></nav>';
}

function footerHtml() {
  return '<footer class="blog-footer">'
    + '<div class="wrap">'
    + '<p class="footer-brand">Quantum5D<small>.ai</small></p>'
    + '<p class="footer-text">AI-assisted operational intelligence for Federally Qualified Health Centers.</p>'
    + '<p class="footer-links">'
    + '<a href="/">Home</a> &middot; '
    + '<a href="/blog">Blog</a> &middot; '
    + '<a href="/security-and-trust">Security &amp; Trust</a> &middot; '
    + '<a href="https://quantum5dconsulting.com" rel="noopener">Consulting</a>'
    + '</p>'
    + '</div>'
    + '</footer>';
}

function sharedCss() {
  return [
    '*{box-sizing:border-box;margin:0;padding:0}',
    'a{text-decoration:none;color:inherit}',
    ':root{',
    '  --ink:#14112E;--muted:#5E5A78;--line:#E4E1EF;',
    '  --purple:#5347A4;--purple-deep:#403592;--purple-soft:#938ABD;',
    '  --paper:#F6F5FB;--card:#FFFFFF;',
    '}',
    'body{font-family:"Inter",system-ui,sans-serif;color:var(--ink);background:#fff;',
    '  line-height:1.6;font-size:15px;-webkit-font-smoothing:antialiased}',
    '',
    '/* Nav */',
    '.wrap{max-width:1100px;margin:0 auto;padding:0 24px}',
    '.nav{position:sticky;top:0;z-index:50;background:rgba(252,251,254,.92);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}',
    '.nav-in{display:flex;align-items:center;justify-content:space-between;height:66px}',
    '.brand{display:flex;align-items:center;gap:10px;color:var(--ink)}',
    '.brand .wm{font-family:"Newsreader",Georgia,serif;font-weight:600;font-size:20px;letter-spacing:-.01em;color:var(--purple-deep)}',
    '.brand .wm small{display:block;font-family:"IBM Plex Mono",monospace;font-size:8.5px;letter-spacing:.2em;color:var(--muted);text-transform:uppercase;margin-top:3px;font-weight:400}',
    '.nav-links{display:flex;align-items:center;gap:24px}',
    '.nav-links a{color:var(--muted);font-size:14px;font-weight:500;border-bottom:1.5px solid transparent;transition:.15s}',
    '.nav-links a:hover,.nav-links a.nav-active{color:var(--ink);border-bottom-color:var(--purple)}',
    '.nav-toggle{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:8px}',
    '.nav-toggle span{display:block;width:22px;height:2px;background:var(--ink);border-radius:2px}',
    '@media(max-width:768px){',
    '  .nav-links{display:none;position:absolute;top:100%;left:0;right:0;background:rgba(252,251,254,.98);padding:16px 24px;flex-direction:column;gap:8px;border-top:1px solid var(--line)}',
    '  .nav-links.nav-open{display:flex}',
    '  .nav-links a{display:block;padding:10px 0;font-size:15px}',
    '  .nav-toggle{display:flex}',
    '}',
    '',
    '/* Footer */',
    '.blog-footer{margin-top:64px;padding:32px 0;border-top:1px solid var(--line);text-align:center}',
    '.footer-brand{font-family:"Newsreader",Georgia,serif;font-weight:600;font-size:18px;color:var(--purple-deep);margin-bottom:4px}',
    '.footer-brand small{font-family:"IBM Plex Mono",monospace;font-size:9px;letter-spacing:.2em;color:var(--muted);text-transform:uppercase}',
    '.footer-text{font-size:13px;color:var(--muted);margin-bottom:12px}',
    '.footer-links{font-size:13px}',
    '.footer-links a{color:var(--purple);font-weight:500}',
    '.footer-links a:hover{text-decoration:underline}',
  ].join('\n');
}

// ── Blog listing page ──────────────────────────────────────────────
function buildListingPage(posts) {
  const featured = posts.filter(function(p) { return p.is_featured; });
  const rest = posts.filter(function(p) { return !p.is_featured; });
  const ordered = featured.concat(rest);

  var cards = '';
  for (var i = 0; i < ordered.length; i++) {
    var p = ordered[i];
    var tagHtml = '';
    var tags = p.tags || [];
    for (var t = 0; t < Math.min(tags.length, 3); t++) {
      tagHtml += '<span class="tag">' + esc(tags[t]) + '</span>';
    }
    cards += '<a href="/blog/' + esc(p.slug) + '" class="post-card' + (p.is_featured ? ' featured' : '') + '">'
      + '<div class="card-category">' + esc(p.category || 'General') + '</div>'
      + '<h2 class="card-title">' + esc(p.title) + '</h2>'
      + '<p class="card-excerpt">' + esc(p.excerpt || '') + '</p>'
      + '<div class="card-meta">'
      + '<span>' + fmtDate(p.published_date || p.created_at) + '</span>'
      + '</div>'
      + (tagHtml ? '<div class="card-tags">' + tagHtml + '</div>' : '')
      + '</a>';
  }

  var jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'FQHC Operations Intelligence',
    'description': 'Analysis and insight on 340B programs, pharmacy operations, Medicaid coverage, and FQHC transformation.',
    'url': SITE + '/blog',
    'publisher': {
      '@type': 'Organization',
      'name': 'Quantum 5D Consulting',
      'logo': { '@type': 'ImageObject', 'url': SITE + '/logo.png' }
    },
    'blogPost': ordered.map(function(p) {
      return {
        '@type': 'BlogPosting',
        'headline': p.title,
        'url': SITE + '/blog/' + p.slug,
        'datePublished': isoDate(p.published_date || p.created_at),
        'author': { '@type': 'Person', 'name': p.author || 'Dr. Adetoro Oriaifo' }
      };
    })
  });

  return '<!DOCTYPE html>\n<html lang="en">\n<head>\n'
    + '<meta charset="UTF-8">\n'
    + '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
    + '<title>FQHC Operations Intelligence — Blog | Quantum5D.ai</title>\n'
    + '<meta name="description" content="Analysis and insight on 340B programs, pharmacy operations, Medicaid coverage, and FQHC transformation.">\n'
    + '<link rel="canonical" href="' + SITE + '/blog">\n'
    + '<meta property="og:type" content="website">\n'
    + '<meta property="og:title" content="FQHC Operations Intelligence — Blog">\n'
    + '<meta property="og:description" content="Analysis and insight on 340B programs, pharmacy operations, Medicaid coverage, and FQHC transformation.">\n'
    + '<meta property="og:url" content="' + SITE + '/blog">\n'
    + '<meta property="og:site_name" content="Quantum5D.ai">\n'
    + '<meta property="og:image" content="' + SITE + '/logo.png">\n'
    + '<meta name="twitter:card" content="summary">\n'
    + headFonts() + '\n'
    + ga4Snippet('blog_index', null) + '\n'
    + '<script type="application/ld+json">' + jsonLd + '</script>\n'
    + '<style>\n' + sharedCss() + '\n'
    + listingCss()
    + '\n</style>\n'
    + '</head>\n<body>\n'
    + navHtml() + '\n'
    + '<main class="wrap blog-list">\n'
    + '<header class="blog-header">\n'
    + '<h1>FQHC Operations Intelligence</h1>\n'
    + '<p>Analysis and insight on 340B programs, pharmacy operations, Medicaid coverage, and FQHC transformation.</p>\n'
    + '</header>\n'
    + '<a href="https://quantum5dconsulting.com/blog/fqhc-pharmacy-series" class="series-banner" target="_blank" rel="noopener noreferrer">'
    + '<div class="series-label">4-Part Series &middot; quantum5dconsulting.com</div>'
    + '<div class="series-title">FQHC Pharmacy Leadership Series</div>'
    + '<div class="series-desc">From gap analysis to strategic goals &mdash; a practical framework for new pharmacy leaders. Includes companion toolkit.</div>'
    + '</a>\n'
    + '<div class="post-grid">\n' + cards + '\n</div>\n'
    + '</main>\n'
    + footerHtml() + '\n'
    + '</body>\n</html>';
}

function listingCss() {
  return [
    '',
    '/* Listing */',
    '.blog-list{padding-top:48px;padding-bottom:48px}',
    '.blog-header{margin-bottom:40px}',
    '.blog-header h1{font-family:"Newsreader",Georgia,serif;font-size:36px;font-weight:600;color:var(--ink);margin-bottom:8px}',
    '.blog-header p{font-size:16px;color:var(--muted);max-width:60ch}',
    '.series-banner{display:block;background:linear-gradient(135deg,#403592,#5347A4);color:#fff;padding:24px;border-radius:12px;margin-bottom:28px;text-decoration:none;transition:.15s}',
    '.series-banner:hover{box-shadow:0 4px 20px rgba(83,71,164,.25)}',
    '.series-label{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:#C8B8F0;margin-bottom:6px}',
    '.series-title{font-family:"Newsreader",Georgia,serif;font-size:22px;font-weight:600;margin-bottom:6px}',
    '.series-desc{font-size:14px;color:#E0D8F4;line-height:1.5}',
    '.post-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}',
    '@media(max-width:700px){.post-grid{grid-template-columns:1fr}}',
    '.post-card{display:block;padding:24px;border:1px solid var(--line);border-radius:12px;background:var(--card);transition:.15s}',
    '.post-card:hover{border-color:var(--purple);box-shadow:0 2px 12px rgba(83,71,164,.08)}',
    '.post-card.featured{border-left:3px solid var(--purple);background:var(--paper)}',
    '.card-category{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--purple);margin-bottom:8px}',
    '.card-title{font-family:"Newsreader",Georgia,serif;font-size:19px;font-weight:600;line-height:1.3;color:var(--ink);margin-bottom:8px}',
    '.card-excerpt{font-size:14px;color:var(--muted);line-height:1.55;margin-bottom:12px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}',
    '.card-meta{font-size:12px;color:var(--muted);font-family:"IBM Plex Mono",monospace}',
    '.card-tags{margin-top:10px;display:flex;gap:6px;flex-wrap:wrap}',
    '.tag{font-size:11px;padding:3px 9px;border-radius:20px;background:var(--paper);color:var(--muted);border:1px solid var(--line)}',
  ].join('\n');
}

// ── Individual post page ───────────────────────────────────────────
function buildPostPage(post, sequence) {
  var title = post.seo_title || post.title;
  var desc = post.seo_description || post.excerpt || '';
  var pubDate = isoDate(post.published_date || post.created_at);
  var author = post.author || 'Dr. Adetoro Oriaifo, PharmD, MBA, CHCEF, FACHE';

  var jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': title,
    'description': desc,
    'author': { '@type': 'Person', 'name': author },
    'publisher': {
      '@type': 'Organization',
      'name': 'Quantum 5D Consulting',
      'logo': { '@type': 'ImageObject', 'url': SITE + '/logo.png' }
    },
    'datePublished': pubDate,
    'dateModified': isoDate(post.updated_at || post.published_date || post.created_at),
    'mainEntityOfPage': { '@type': 'WebPage', '@id': SITE + '/blog/' + post.slug },
    'image': post.featured_image_url || SITE + '/logo.png'
  });

  var tagHtml = '';
  var tags = post.tags || [];
  for (var i = 0; i < tags.length; i++) {
    tagHtml += '<span class="tag">' + esc(tags[i]) + '</span>';
  }

  return '<!DOCTYPE html>\n<html lang="en">\n<head>\n'
    + '<meta charset="UTF-8">\n'
    + '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
    + '<title>' + esc(title) + ' — Quantum5D.ai</title>\n'
    + '<meta name="description" content="' + esc(desc) + '">\n'
    + '<link rel="canonical" href="' + SITE + '/blog/' + esc(post.slug) + '">\n'
    + '<meta property="og:type" content="article">\n'
    + '<meta property="og:title" content="' + esc(title) + '">\n'
    + '<meta property="og:description" content="' + esc(desc) + '">\n'
    + '<meta property="og:url" content="' + SITE + '/blog/' + esc(post.slug) + '">\n'
    + '<meta property="og:site_name" content="Quantum5D.ai">\n'
    + '<meta property="og:image" content="' + esc(post.featured_image_url || SITE + '/logo.png') + '">\n'
    + '<meta name="twitter:card" content="summary_large_image">\n'
    + '<meta name="twitter:title" content="' + esc(title) + '">\n'
    + '<meta name="twitter:description" content="' + esc(desc) + '">\n'
    + '<meta name="article:published_time" content="' + pubDate + '">\n'
    + '<meta name="article:author" content="' + esc(author) + '">\n'
    + headFonts() + '\n'
    + ga4Snippet('blog_post', {slug: post.slug, category: post.category || 'General', sequence: sequence || 0}) + '\n'
    + '<script type="application/ld+json">' + jsonLd + '</script>\n'
    + '<style>\n' + sharedCss() + '\n' + postCss() + '\n</style>\n'
    + '</head>\n<body>\n'
    + navHtml() + '\n'
    + '<main class="wrap post-wrap">\n'
    + '<a href="/blog" class="back-link">&larr; All posts</a>\n'
    + '<article class="post-article">\n'
    + '<header class="post-header">\n'
    + '<div class="post-category">' + esc(post.category || 'General') + '</div>\n'
    + '<h1 class="post-title">' + esc(post.title) + '</h1>\n'
    + '<div class="post-meta">'
    + '<span>' + esc(author) + '</span>'
    + '<span>' + fmtDate(post.published_date || post.created_at) + '</span>'
    + '</div>\n'
    + '</header>\n'
    + '<div class="post-body">\n'
    + (post.content || '')
    + '\n</div>\n'
    + (tagHtml ? '<div class="post-tags">' + tagHtml + '</div>' : '')
    + '</article>\n'
    + '</main>\n'
    + footerHtml() + '\n'
    + '</body>\n</html>';
}

function postCss() {
  return [
    '',
    '/* Post */',
    '.post-wrap{max-width:780px;padding-top:32px;padding-bottom:48px}',
    '.back-link{display:inline-block;font-size:13px;color:var(--purple);font-weight:500;margin-bottom:24px}',
    '.back-link:hover{text-decoration:underline}',
    '.post-header{margin-bottom:32px;padding-bottom:24px;border-bottom:1px solid var(--line)}',
    '.post-category{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--purple);margin-bottom:12px}',
    '.post-title{font-family:"Newsreader",Georgia,serif;font-size:34px;font-weight:600;line-height:1.2;color:var(--ink);margin-bottom:12px}',
    '@media(max-width:600px){.post-title{font-size:26px}}',
    '.post-meta{font-size:13px;color:var(--muted);display:flex;gap:16px;flex-wrap:wrap}',
    '',
    '.post-body{font-size:16px;line-height:1.75;color:var(--ink)}',
    '.post-body h1,.post-body h2,.post-body h3{font-family:"Newsreader",Georgia,serif;font-weight:600;margin:28px 0 12px;color:var(--ink)}',
    '.post-body h1{font-size:28px}.post-body h2{font-size:22px}.post-body h3{font-size:18px}',
    '.post-body p{margin-bottom:16px}',
    '.post-body ul,.post-body ol{margin:0 0 16px 24px}',
    '.post-body li{margin-bottom:6px}',
    '.post-body blockquote{border-left:3px solid var(--purple);padding:12px 20px;margin:20px 0;background:var(--paper);border-radius:0 8px 8px 0;font-style:italic;color:var(--muted)}',
    '.post-body strong{font-weight:600}',
    '.post-body a{color:var(--purple);text-decoration:underline}',
    '.post-body table{width:100%;border-collapse:collapse;margin:20px 0;font-size:14px}',
    '.post-body th,.post-body td{padding:10px 14px;border:1px solid var(--line);text-align:left}',
    '.post-body th{background:var(--paper);font-weight:600;font-size:13px}',
    '.post-body code{font-family:"IBM Plex Mono",monospace;font-size:14px;background:var(--paper);padding:2px 6px;border-radius:4px}',
    '.post-body pre{background:var(--paper);padding:16px;border-radius:8px;overflow-x:auto;margin:16px 0}',
    '.post-body pre code{background:none;padding:0}',
    '',
    '.post-tags{margin-top:32px;padding-top:20px;border-top:1px solid var(--line);display:flex;gap:6px;flex-wrap:wrap}',
    '.tag{font-size:11px;padding:3px 9px;border-radius:20px;background:var(--paper);color:var(--muted);border:1px solid var(--line)}',
  ].join('\n');
}

// ── Main ───────────────────────────────────────────────────────────
async function main() {
  console.log('build-blog: fetching published posts from Supabase...');
  var posts = await fetchPosts();
  console.log('build-blog: ' + posts.length + ' posts fetched.');

  // Ensure output directory exists
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }

  // Write listing page
  var listingHtml = buildListingPage(posts);
  fs.writeFileSync(path.join(BLOG_DIR, 'index.html'), listingHtml);
  console.log('  -> public/blog/index.html');

  // Write individual post pages
  for (var i = 0; i < posts.length; i++) {
    var p = posts[i];
    var postHtml = buildPostPage(p, i + 1);
    var filename = p.slug + '.html';
    fs.writeFileSync(path.join(BLOG_DIR, filename), postHtml);
    console.log('  -> public/blog/' + filename);
  }

  // ── Verify no Supabase credentials leaked into output ──────────
  var files = fs.readdirSync(BLOG_DIR);
  for (var j = 0; j < files.length; j++) {
    var content = fs.readFileSync(path.join(BLOG_DIR, files[j]), 'utf8');
    if (content.includes(SUPABASE_URL) || content.includes(SUPABASE_KEY)) {
      console.error('FATAL: Generated file ' + files[j] + ' contains Supabase credentials. Aborting.');
      process.exit(1);
    }
  }

  console.log('build-blog: done. ' + (posts.length + 1) + ' files written. No credentials in output.');
}

main().catch(function(err) {
  console.error('FATAL: ' + err.message);
  process.exit(1);
});
