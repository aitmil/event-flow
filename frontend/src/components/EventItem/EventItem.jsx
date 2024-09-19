import css from './EventItem.module.css';

export default function EventItem({
  event: { _id, title, image, description, eventDate, organizer, url },
}) {
  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  return (
    <>
      <div className={css.card}>
        <img
          className={css.img}
          src={image ? image : defaultImg}
          width={180}
          alt="poster"
        ></img>
        <div className={css.info}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.description}>{description}</p>
          <p className={css.date}>{new Date(eventDate).toLocaleString()}</p>
          <p className={css.organizer}>Organizer: {organizer}</p>
          <a
            className={css.details}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            See details
          </a>
        </div>{' '}
      </div>
      <div className={css.links}>
        <a href={`/register/${_id}`}>Register</a>
        <a href={`/participants/${_id}`}>View</a>
      </div>
    </>
  );
}
