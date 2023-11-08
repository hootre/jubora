import { FormControl, MenuItem, Select } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import AdminWritePulbicContainer from '../style';

export default function SelectAdminWrite({ title, itemList, defaultValue, valueName }) {
  // react hooks form
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <AdminWritePulbicContainer className="box">
      <h1>{title}</h1>
      <FormControl sx={{ minWidth: 120 }} size="small">
        <p className="point_text">{errors.type?.message} </p>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          defaultValue={defaultValue}
          {...register(valueName, {
            required: '분류 선택은 필수입니다.',
          })}
        >
          {itemList.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </AdminWritePulbicContainer>
  );
}
