import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
  );

  // Supabase se data fetch karein
  const { data: blogs } = await supabase.from('blogs').select('slug');
  const { data: products } = await supabase.from('products').select('slug');

  const staticUrls = [
    'https://durablefastener.com/',
    'https://durablefastener.com/products',
    'https://durablefastener.com/about',
    'https://durablefastener.com/blog',
    'https://durablefastener.com/contact'
  ];

  // XML Content taiyar karein
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticUrls.map(url => `<url><loc>${url}</loc><priority>1.0</priority></url>`).join('')}
      ${blogs?.map(blog => `<url><loc>https://durablefastener.com/blog/${blog.slug}</loc><priority>0.7</priority></url>`).join('') || ''}
      ${products?.map(prod => `<url><loc>https://durablefastener.com/product/${prod.slug}</loc><priority>0.8</priority></url>`).join('') || ''}
    </urlset>`;

  // Response ko XML format mein bhejein
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
}