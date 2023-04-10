import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { Editor } from '@toast-ui/react-editor';

const TuiEditor = ({ content = '', editorRef }) => {
  const toolbarItems = [['heading', 'bold', 'italic', 'strike'], ['image']];

  return (
    <>
      {editorRef && (
        <Editor
          ref={editorRef}
          initialValue={content || ' '} // 글 수정 시 사용
          initialEditType="wysiwyg" // wysiwyg & markdownvertical
          hideModeSwitch={true}
          height="100%"
          theme={''} // '' & 'dark'
          usageStatistics={false}
          toolbarItems={toolbarItems}
          useCommandShortcut={true}
          plugins={[colorSyntax]}
        />
      )}
    </>
  );
};

export default TuiEditor;
