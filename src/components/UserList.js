import { useContext } from 'react';
import { TransactionContext } from '../contexts/TransactionContext';
import User from './User';

function UserList() {
  const { users } = useContext(TransactionContext);
  return (
    <ul className="list-group">
      <li className="list-group-item">
        <div className="d-flex">
          <div className="p-2 text-center px-4">
            <p className="mb-0">เลขที่ผู้ใช้</p>
          </div>
          <div className="p-2 text-center ps-5 pe-4">
            <p className="mb-0">ชื่อผู้ใช้</p>
          </div>
          <div className="p-2 text-center ps-5 pe-5">
            <p className="mb-0">เบอร์ติดต่อ</p>
          </div>
          <div className="p-2 text-center ps-5">
            <p className="mb-0">อีเมล</p>
          </div>
        </div>
      </li>
      {users.map((el) => (
        <User key={el.id} user={el} />
      ))}
    </ul>
  );
}

export default UserList;
