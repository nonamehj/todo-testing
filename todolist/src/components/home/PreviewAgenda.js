import useHomeData from "./useHomeData";

const PreviewAgenda = () => {
  const { filterAgendaItems } = useHomeData();

  return (
    <div className="preview-center">
      <ul className="preview-agenda">
        {filterAgendaItems.slice(0, 6).map((item) => {
          const { id, date, title } = item;
          return (
            <li key={id}>
              <p className="agenda-mini-date">{`${date.getFullYear()}년 ${
                date.getMonth() + 1
              }월 ${date.getDate()}일`}</p>
              {/* <span>-</span> */}
              <p className="agenda-mini-contents">
                {title.length > 70 ? `${title.slice(0, 70)} ...` : title}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PreviewAgenda;
