import styles from './roundInputBase.styles';

export const roundInputBaseStyles = theme => {
  return {
    ...styles(theme),
    formControl: {
      'label + &': {
        marginTop: 24,
      },
    },
  };
};
export const roundInputLabelStyles = ({ palette }) => ({
  root: {
    color: '#E52C32',
    marginLeft: '0.75rem',
  },
  error: {},
  focused: {
  },
  shrink: {
    transform: 'translate(0, 1.5px) scale(1)',
  },
});
export const roundHelperTextStyles = () => ({
  root: {
    marginLeft: '0.75rem',
  },
});

