// Builds srcSet from the WebP variants written by scripts/optimize-images.py.
const files = import.meta.glob('../../assets/img/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});

const variants = {};
Object.entries(files).forEach(([path, url]) => {
  const m = path.match(/\/([^/]+)-(\d+)\.webp$/);
  if (!m) return;
  if (!variants[m[1]]) variants[m[1]] = [];
  variants[m[1]].push({ width: Number(m[2]), url });
});
Object.values(variants).forEach((list) => list.sort((a, b) => a.width - b.width));

const ResponsiveImage = ({ name, alt, sizes = '100vw', className = '', ...rest }) => {
  const list = variants[name];
  if (!list) {
    if (import.meta.env.DEV) console.warn(`ResponsiveImage: no variants for "${name}"`);
    return null;
  }
  return (
    <img
      src={list[list.length - 1].url}
      srcSet={list.map((v) => `${v.url} ${v.width}w`).join(', ')}
      sizes={sizes}
      alt={alt}
      loading='lazy'
      decoding='async'
      className={className}
      {...rest}
    />
  );
};
export default ResponsiveImage;
