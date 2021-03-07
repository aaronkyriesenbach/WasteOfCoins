import classnames from 'classnames';
import React, { ChangeEvent, ClipboardEvent, KeyboardEvent, MouseEvent } from 'react';

export default class PasteOnlyInput extends React.Component<Props, State> {
    componentDidMount() {
        const { validator, value } = this.props;

        this.setState({ error: validator(value) });
    }

    onPaste = (event: ClipboardEvent<HTMLInputElement>): void => {
        const { validator, onUpdate } = this.props;
        const url = event.clipboardData.getData('text');

        (event.target as HTMLInputElement).blur();

        onUpdate(url);
        this.setState({ error: validator(url) });
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
        const { error } = this.state || {};

        return (
            <div className={`container-fluid d-flex flex-column align-items-center`}>
                <input type='text'
                    className={classnames(className, { 'text-danger': error })}
                    placeholder={placeholder}
                    value={value}
                    spellCheck={false}
                    onClick={(event: MouseEvent<HTMLInputElement>) => (event.target as HTMLInputElement).select()}
                    onKeyPress={(event: KeyboardEvent<HTMLInputElement>) => event.preventDefault()}
                    onKeyDown={onKeyDown}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => event.preventDefault()}
                    onPaste={onPaste}
                />
                {error && value !== '' && <p className='text-danger mt-2'>{error}</p>}
            </div>
        );
    }
}

type Props = {
    className?: string,
    value: string,
    placeholder?: string,
    validator: (value: string) => string | undefined,
    onUpdate: (value: string) => void;
};

type State = {
    error?: string;
};