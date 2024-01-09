import { render, screen } from '@testing-library/react';
import { Formik } from 'formik';
import { describe, expect } from 'vitest';
import FieldControl from './field-control';

const Wrapper = ({ validate, ...props }: any) => (
    <Formik
        initialValues={{ [props.name]: '' }}
        onSubmit={() => {}}
        validate={validate}
    >
        <FieldControl {...props} />
    </Formik>
);

describe('FieldControl component (Unit)', () => {
    const fieldName = 'test-field';
    const fieldLabel = 'Test Field Label';
    const errorMessage = 'Test error message';

    it('FieldControl matches snapshot', () => {
        const { container } = render(
            <Wrapper name="test" label="Test Label" />,
        );
        expect(container).toMatchSnapshot();
    });

    it('should render without errors', () => {
        render(<Wrapper name={fieldName} />);
        expect(screen.getByTestId(`input-${fieldName}`)).toBeInTheDocument();
    });

    it('should render label correctly', () => {
        render(<Wrapper name={fieldName} label={fieldLabel} />);
        expect(screen.getByTestId(`label-${fieldName}`)).toHaveTextContent(
            fieldLabel,
        );
    });

    // it('should show error message with correct text when there is a validation error', async () => {
    //     const errorMessage = 'This field is required';
    //     const { rerender } = render(
    //         <Wrapper
    //             name={fieldName}
    //             validate={(value: string) => (value ? undefined : errorMessage)}
    //         />
    //     );
    //     const input = screen.getByTestId(`input-${fieldName}`);
    //     const errMessage = screen.getByTestId(`err-${fieldName}`);

    //     await userEvent.click(input);
    //     await userEvent.hover(input);

    //     expect(errMessage).toHaveTextContent(errorMessage);

    //     rerender(<Wrapper name={fieldName} disabledError={true} />);
    //     expect(errMessage).not.toBeVisible();
    // });
});
