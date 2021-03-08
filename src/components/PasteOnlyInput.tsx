import React, { ChangeEvent, ClipboardEvent, KeyboardEvent, MouseEvent } from 'react';

export default class PasteOnlyInput extends React.Component<Props, {}> {
    onPaste = (event: ClipboardEvent<HTMLInputElement>): void => {
        const { onUpdate } = this.props;
        const url = event.clipboardData.getData('text');

        (event.target as HTMLInputElement).blur();

        onUpdate(url);
    };

    onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        const { onUpdate } = this.props;

        if (event.key === 'Backspace' || event.key === 'Delete' || event.key === 'Clear') {
            onUpdate('');
            (event.target as HTMLInputElement).blur();
        }
    };

    render() {
        const { onPaste, onKeyDown } = this;
        const { className, value, placeholder } = this.props;

        return (
            <div className={`container-fluid d-flex flex-column align-items-center`}>
                <input type='text'
                    className={className}
                    placeholder={placeholder}
                    value={value}
                    spellCheck={false}
                    onClick={(event: MouseEvent<HTMLInputElement>) => (event.target as HTMLInputElement).select()}
                    onKeyPress={(event: KeyboardEvent<HTMLInputElement>) => event.preventDefault()}
                    onKeyDown={onKeyDown}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => event.preventDefault()}
                    onPaste={onPaste}
                />
            </div>
        );
    }
}

type Props = {
    className?: string,
    value: string,
    placeholder?: string,
    onUpdate: (value: string) => void;
};