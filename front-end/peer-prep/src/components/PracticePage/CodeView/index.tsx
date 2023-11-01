import * as Styles from './styles';

import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';

const CodeView = () => {
    return (
        <div style={Styles.CodeViewContainerStyle}>
            <Editor defaultLanguage="javascript" defaultValue="// some comment" />
        </div>
    )
}

export default CodeView;
