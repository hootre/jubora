import BoardCardContainer from './style';

export default function BoardCard({ item: { id, state, title, name, createdAt } }) {
  return (
    <BoardCardContainer>
      <div>
        <span className="id">{id}</span>
        <span className="state">[{state}]</span>
        <span className="title">{title}</span>
        <span className="name">{name}</span>
        <span className="date">{String(createdAt).substring(5, 10)}</span>
      </div>
      {/* <button onClick={() => deleteItem({ id, images })} className="C_basic_button">
        삭제
      </button> */}
    </BoardCardContainer>
  );
}
