import { useFormContext } from 'react-hook-form';
import { useOrderPreivew } from 'store';
import { orderSettingFor } from '../../../../../public/data';
import SideDatailContainer from './style';

export default function SideDetail() {
  const orderPreview = useOrderPreivew();

  // react hooks form
  const { watch } = useFormContext();

  if (watch('price') !== undefined) {
    return (
      <SideDatailContainer>
        <h1>상세보기</h1>
        <div className="side_content">
          {orderPreview.image ? (
            <img src={orderPreview.image} alt="" />
          ) : (
            <>
              <img src="https://placehold.co/150x150" alt="mainImage" />
              <p>준비중입니다</p>
            </>
          )}
          <h1>{orderPreview.title}</h1>
          <p className="description">{orderPreview.description}</p>
          <div className="price_box">
            {orderPreview.add_price && (
              <div className="add_price">
                <h1>{orderPreview.title}</h1>
                <h2>
                  +{orderPreview.add_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </h2>
              </div>
            )}
          </div>
        </div>
        <div className="price_box">
          {orderSettingFor.map((item) => {
            if (watch(item)?.add_price) {
              return (
                <div className="add_price">
                  <h1>{watch(item).content}</h1>
                  <h2>
                    +
                    {watch(item)
                      .add_price.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    원
                  </h2>
                </div>
              );
            }
            return false;
          })}
          <div className="price">
            <h1>총 가격</h1>
            <h2>
              {watch('price')
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              원
            </h2>
          </div>
        </div>
        <div className="purchaseBox">
          <button type="button" className="C_basic_button">
            주문하기
          </button>
        </div>
      </SideDatailContainer>
    );
  }
}
