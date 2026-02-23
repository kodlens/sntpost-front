import ReactPlayer from 'react-player/youtube';

interface CardProps {
  card: {
    link?: string;
    title?: string;
    description?: string;
    button_text?: string;
    button_link?: string;
  };
}

const Card: React.FC<CardProps> = ({ card }: CardProps) => {
  const { link, title } = card;

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#d4e4f2] bg-white p-3 shadow-[0_12px_30px_rgba(20,56,92,0.1)]">
      <div className="overflow-hidden rounded-xl bg-black/5">
        <ReactPlayer className="react-player" width="100%" height={220} url={link} controls />
      </div>

      <div className="px-1 pt-4 pb-2">
        <h3 className="line-clamp-2 text-base leading-tight font-bold text-[#0A3257] group-hover:text-[#0D4E86]">
          {title || 'Featured video'}
        </h3>
      </div>
    </article>
  );
};

export default Card;
