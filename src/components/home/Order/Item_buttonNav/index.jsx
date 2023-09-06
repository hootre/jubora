import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Public_order_container } from '../style';
import { memo } from 'react';
import { usePathname } from 'next/navigation';

export const Item_buttonNav = memo(({ item, order_setting }) => {
  // url
  const pathname = usePathname();
  // react hooks form
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const checkKeyDown = (e) => {
    if (e.key === 'Enter') e.preventDefault();
  };
  return (
    <Public_order_container className="name_box">
      <h2>{order_setting[item].title}</h2>
      {/* {item === 'item_1' && <Link href={`${pathname}?bannerType=${item}`}></Link>} */}
      <div className="type_btn_box">
        {order_setting[item].list.map((text, index) => (
          <button
            key={index}
            className={watch(item)?.content === text ? 'from_item_btn active' : `from_item_btn`}
            type="button"
            value={text}
            onClick={(e) =>
              setValue(item, { title: order_setting[item].title, content: e.target.value })
            }
          >
            {text}
          </button>
        ))}
      </div>
    </Public_order_container>
  );
});
