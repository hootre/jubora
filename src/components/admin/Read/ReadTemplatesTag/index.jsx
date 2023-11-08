import useTemplatesTag from 'hooks/supabase/templatesTag/useTemplatesTag';
import MainLoading from 'components/Loading/MainLoading';
import ReadTemplatesTagContainer from './styles';
import BoardItem from './BoardItem';

export default function ReadTemplatesTag() {
  // 태그 관리
  const { useGetTemplatesTag, useUpdateTemplatesTag, useDeleteTemplatesTag } = useTemplatesTag();
  const { data: templatesTagData, isLoading } = useGetTemplatesTag();
  const { mutate: updateTemplatesTag } = useUpdateTemplatesTag();
  const { mutate: deleteTemplatesTag } = useDeleteTemplatesTag();
  if (isLoading) {
    return <MainLoading />;
  }
  return (
    <ReadTemplatesTagContainer>
      {templatesTagData.map((item) => (
        <BoardItem
          key={item.id}
          item={item}
          updateTemplatesTag={updateTemplatesTag}
          deleteTemplatesTag={deleteTemplatesTag}
        />
      ))}
    </ReadTemplatesTagContainer>
  );
}
