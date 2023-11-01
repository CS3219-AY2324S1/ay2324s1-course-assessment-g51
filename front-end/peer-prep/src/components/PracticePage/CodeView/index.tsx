import * as Styles from './styles';

import Editor from '@monaco-editor/react';

const CodeView = () => {
    return (
        <div style={Styles.CodeViewContainerStyle}>
            <Editor defaultLanguage="javascript" defaultValue="//@Kang Quan all yours bro :)" />
        </div>
    )
}

export default CodeView;
