import { useNavigate } from 'react-router-dom';

function User(user) {
  const {
    user: { id, email, name, lastName, phoneNumber, userNumber },
  } = user;

  const navigate = useNavigate();
  return (
    <li
      className={`list-group-item`}
      onClick={() => navigate('/user/' + id, { state: user })}
    >
      <div className="row" role="button">
        <div className="col border border-1 border-dark border-end-0 bg-warning p-2 text-center">
          <p className="mb-0">{userNumber}</p>
        </div>
        <div className="col border border-1 border-dark border-end-0 bg-warning p-2 text-center">
          <p className="mb-0">{name + ' ' + lastName}</p>
        </div>
        <div className="col border border-1 border-dark border-end-0 bg-warning p-2 text-center">
          <p className="mb-0">{phoneNumber}</p>
        </div>
        <div className="col border border-1 border-dark bg-warning p-2 text-center">
          <p className="mb-0">{email}</p>
        </div>
      </div>
    </li>
  );
}

export default User;
