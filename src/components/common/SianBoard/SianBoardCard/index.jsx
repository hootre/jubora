import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SianBoardCardContainer from './style';

export default function SianBoardCard({ item: { id, title, state, price, createdAt } }) {
  const pathName = usePathname();

  return (
    <SianBoardCardContainer>
      <div>
        <span className="date">{String(createdAt).substring(0, 10)}</span>
        <span className="title">
          <Link href={`${pathName}/${id}`}>{title}</Link>
        </span>
        <span className="orderId">{id}</span>
        <span className="state">[{state}]</span>
        <span className="delivery">택배</span>
        <span className="price_box">
          <span>
            <span className="price">{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>{' '}
            원
          </span>
        </span>
      </div>
    </SianBoardCardContainer>
  );
}
