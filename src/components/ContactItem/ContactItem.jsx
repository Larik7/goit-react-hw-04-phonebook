import PropTypes from 'prop-types';
import { DeleteBtn } from './ContactItem.styled';

export const ContactItem = ({ contact: { id, name, number }, onDelete }) => {
    return (
        <>
            <span>{name}: </span>
            <span>{number}</span>
            <DeleteBtn type='button' onClick={() => onDelete(id)}>
                <span>Delete</span>
            </DeleteBtn>
        </>
    )
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  onDelete: PropTypes.func.isRequired,
};