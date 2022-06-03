import makeStyles from '@material-ui/styles/makeStyles';
import outlineSelectStyles from './outlineSelect.styles';
import "./select.css"

const useOutlineSelectStyles = makeStyles(outlineSelectStyles, {
  name: 'OutlineSelect',
});

export { outlineSelectStyles, useOutlineSelectStyles };

export { default } from './outlineSelect.styles';
