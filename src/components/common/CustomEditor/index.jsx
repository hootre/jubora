import { Editor } from '@toast-ui/react-editor';

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

function EditorComponent(props) {
  const { forwardedRef } = props;
  return <Editor {...props} ref={forwardedRef} />;
}

EditorComponent.displayName = 'Editor';
export default EditorComponent;
