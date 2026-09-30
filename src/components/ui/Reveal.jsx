import useReveal from '../../hooks/useReveal';

const Reveal = ({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) => {
  const [ref, shown] = useReveal();
  return (
    <Tag
      ref={ref}
      data-shown={shown}
      style={{ '--reveal-delay': `${delay}ms` }}
      className={`reveal ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
};
export default Reveal;
