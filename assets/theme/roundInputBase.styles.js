export default () => ({
  root: {
    width: 374,
    height: 50,
    borderRadius: 100,
    backgroundColor: "white",
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    border: '1px solid',
    borderColor: 'transparent',
    overflow: 'hidden',
    '&:hover:not($disabled)': {
      borderColor: 'transparent',
    },
    '& > svg': {
      color: 'blue',
    },
  },
  adornedStart: {
    paddingLeft: '0.5rem',
  },
  adornedEnd: {
    paddingRight: '0.5rem',
  },
  colorSecondary: {},
  focused: {
    borderColor: '#E52C32',
    '&:hover:not($disabled)': {
      borderColor: '#E52C32',
    },
    '&$adornedStart': {
      '& > svg': {
        color: 'white',
      },
    },
    '&$colorSecondary': {
      borderColor: '#4c4c4c',
      '&:hover:not($disabled)': {
        borderColor: '#4c4c4c',
      },
      '&$adornedStart': {
        '& > svg': {
          color: '#4c4c4c',
        },
      },
    }
  },
  error: {
    backgroundColor: '#fff9f9',
    borderColor: '#ff5252',
    '&:hover:not($disabled)': {
      borderColor: '#ff5252',
    },
  },
  disabled: {
    backgroundColor: '#5c5c5c',
  },
  input: {
    padding: '0.625rem 1rem',
    '&:not(:first-child)': {
      paddingLeft: '0.5rem',
    },
    '&:not(:last-child)': {
      paddingRight: '0.5rem',
    },
  },
});
