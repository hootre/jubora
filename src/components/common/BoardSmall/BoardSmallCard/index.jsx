import simpleDate from 'utils/simpleDate';
import BoardSmallCardContainer from './style';

export default function BoardSmallCard({ title, subTitle, createdAt }) {
  return (
    <BoardSmallCardContainer>
      <div className="main_text">
        <h1 className="C_ellipsis">{title}</h1>
        <h2 className="C_ellipsis">{subTitle}</h2>
      </div>
      <span className="date">{simpleDate(createdAt, 'y')}</span>
    </BoardSmallCardContainer>
  );
}
