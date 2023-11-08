import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PaymentListItemContainer from './style';

export default function PaymentListItem({ item: { id, name, pg, amount, createdAt } }) {
  const pathName = usePathname();

  return (
    <PaymentListItemContainer>
      <div>
        <span className="date">{String(createdAt).substring(0, 10)}</span>
        <span className="title">
          <Link href={`${pathName}/${id}`}>{name}</Link>
        </span>
        <span className="orderId">{pg}</span>
        <span className="price_box">
          <span>
            <span className="price">{amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>{' '}
            원
          </span>
          <button type="button">영수증</button>
          <button type="button">견적서</button>
        </span>
      </div>
    </PaymentListItemContainer>
  );
}
