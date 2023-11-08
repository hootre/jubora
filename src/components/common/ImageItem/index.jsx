import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import ImageItemContainer from './style';

export default function ImageItem({ imgSrc, href, text, bannerType }) {
  return (
    <ImageItemContainer>
      <CldImage
        width={bannerType === 'banner_row' ? 900 : bannerType === 'banner_col' ? 200 : 300}
        height={bannerType === 'banner_row' ? 100 : bannerType === 'banner_col' ? 620 : 380}
        loading="lazy"
        src={imgSrc}
        alt="제품 이미지"
      />
      <div className="purchase_box">
        <div className="purchase">
          <Link href={href}>{text}</Link>
        </div>
      </div>
    </ImageItemContainer>
  );
}
