import { CldImage } from 'next-cloudinary';
import { useFormContext } from 'react-hook-form';
import GetValueImageItemContainer from './style';

export default function GetValueImageItem({ imgSrc, text, bannerType, toaggleModal }) {
  // react hooks form
  const { setValue } = useFormContext();
  const handleImageSelect = () => {
    setValue('image', imgSrc);
    toaggleModal();
  };
  return (
    <GetValueImageItemContainer>
      <CldImage
        width={bannerType === 'banner_row' ? 900 : bannerType === 'banner_col' ? 200 : 300}
        height={bannerType === 'banner_row' ? 100 : bannerType === 'banner_col' ? 620 : 380}
        loading="lazy"
        src={imgSrc}
        alt="제품 이미지"
      />
      <div className="purchase_box">
        <div className="purchase">
          <button type="button" onClick={handleImageSelect}>
            {text}
          </button>
        </div>
      </div>
    </GetValueImageItemContainer>
  );
}
