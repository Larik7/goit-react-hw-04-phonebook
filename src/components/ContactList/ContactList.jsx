import PropTypes from 'prop-types';
import { ContactItem } from 'components/ContactItem/ContactItem';
import { List, ListItem } from './ContactList.styled';

export const ContactList = ({ contacts, onDelete }) => {
    return (
        <List>
            {contacts.map(contact => (
                <ListItem key={contact.id}>
                    <ContactItem contact={contact} onDelete={onDelete} />
                </ListItem>
            ))}
        </List>
    )
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};